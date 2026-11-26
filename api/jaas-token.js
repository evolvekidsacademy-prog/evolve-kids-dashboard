import { createSign } from 'node:crypto';
import { Buffer } from 'node:buffer';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

const respond = (res, status, body) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json(body);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return respond(res, 405, { error: 'Method not allowed.' });
  }

  const authorization = req.headers.authorization;
  const match = typeof authorization === 'string' ? authorization.match(/^Bearer\s+(.+)$/i) : null;
  if (!match) return respond(res, 401, { error: 'Sign in to start a JaaS call.' });

  const { JAAS_APP_ID: appId, JAAS_API_KEY_ID: keyId } = process.env;
  const privateKey = process.env.JAAS_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!appId || !keyId || !privateKey || !supabaseUrl || !supabaseAnonKey) {
    console.error('JaaS token configuration is incomplete.');
    return respond(res, 503, { error: 'JaaS is not configured on the server.' });
  }

  const roomName = req.body?.roomName;
  if (typeof roomName !== 'string' || !/^[a-zA-Z0-9_-]{3,64}$/.test(roomName)) {
    return respond(res, 400, { error: 'Room name must contain 3–64 letters, numbers, hyphens, or underscores.' });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { autoRefreshToken: false, persistSession: false }
  });
  const { data: userResult, error: userError } = await supabase.auth.getUser(match[1]);
  if (userError || !userResult.user) return respond(res, 401, { error: 'Your sign-in has expired. Sign in again.' });

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', userResult.user.id)
    .maybeSingle();
  if (profileError) {
    console.error('Unable to verify the JaaS caller profile:', profileError.message);
    return respond(res, 403, { error: 'Your profile could not be verified. Check profile access in Supabase.' });
  }

  const role = typeof profile?.role === 'string' ? profile.role.trim().toLowerCase() : '';
  if (!['admin', 'staff', 'student'].includes(role)) {
    return respond(res, 403, { error: 'Your account is not permitted to join classroom calls.' });
  }

  const directCall = req.body?.directCall === true;
  if (directCall) {
    if (!['admin', 'staff', 'student'].includes(role)) {
      return respond(res, 403, { error: 'Your account is not permitted to join direct calls.' });
    }
  } else {
    const batchId = req.body?.batchId;
    if (typeof batchId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(batchId)) {
      return respond(res, 400, { error: 'A valid assigned batch is required for classroom calls.' });
    }

    const { data: batch, error: batchError } = await supabase
      .from('batches')
      .select('id, room_code, trainer_id')
      .eq('id', batchId)
      .maybeSingle();
    if (batchError) {
      console.error('Unable to verify the JaaS batch assignment:', batchError.message);
      return respond(res, 403, { error: 'The assigned class could not be verified. Check batch access in Supabase.' });
    }
    if (!batch || batch.room_code !== roomName) {
      return respond(res, 403, { error: 'You are not assigned to this classroom room.' });
    }
    if (role === 'staff' && batch.trainer_id !== userResult.user.id) {
      return respond(res, 403, { error: 'You are not assigned to this classroom.' });
    }
    if (role === 'student') {
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('students')
        .select('id')
        .eq('batch_id', batchId)
        .eq('user_id', userResult.user.id)
        .limit(1)
        .maybeSingle();
      if (enrollmentError) {
        console.error('Unable to verify the JaaS student assignment:', enrollmentError.message);
        return respond(res, 403, { error: 'Your student class assignment could not be verified.' });
      }
      if (!enrollment) return respond(res, 403, { error: 'You are not assigned to this classroom.' });
    }
  }

  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT',
    kid: `${appId}/${keyId}`
  };
  const payload = {
    aud: 'jitsi',
    iss: 'chat',
    sub: appId,
    room: roomName,
    iat: now,
    nbf: now - 5,
    exp: now + 60 * 60,
    context: {
      user: {
        id: userResult.user.id,
        name: profile.full_name || userResult.user.email || 'Evolve Kids user',
        email: userResult.user.email || '',
        moderator: role === 'admin' || role === 'staff' ? 'true' : 'false'
      },
      features: {
        livestreaming: false,
        recording: false,
        transcription: false,
        'outbound-call': false
      },
      room: { regex: false }
    }
  };
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const signingInput = `${encode(header)}.${encode(payload)}`;

  try {
    const signer = createSign('RSA-SHA256');
    signer.update(signingInput);
    signer.end();
    const signature = signer.sign(privateKey).toString('base64url');
    return respond(res, 200, { appId, token: `${signingInput}.${signature}` });
  } catch (error) {
    console.error('Unable to sign a JaaS token:', error.message);
    return respond(res, 500, { error: 'Unable to create a JaaS access token. Check the server key configuration.' });
  }
}
