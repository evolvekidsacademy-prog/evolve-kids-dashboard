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
  if (!match) return respond(res, 401, { error: 'Sign in as an administrator to add staff.' });

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    console.error('Staff account configuration is incomplete.');
    return respond(res, 503, { error: 'Staff accounts are not configured on the server.' });
  }

  const fullName = typeof req.body?.fullName === 'string' ? req.body.fullName.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (
    !fullName ||
    fullName.length > 120 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password.length < 8 ||
    password.length > 128
  ) {
    return respond(res, 400, { error: 'Enter a valid name, email address, and password (8–128 characters).' });
  }

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { autoRefreshToken: false, persistSession: false }
  });
  const { data: userResult, error: userError } = await userClient.auth.getUser(match[1]);
  if (userError || !userResult.user) {
    return respond(res, 401, { error: 'Your sign-in has expired. Sign in again.' });
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  const { data: callerProfile, error: profileError } = await adminClient
    .from('profiles')
    .select('role')
    .eq('id', userResult.user.id)
    .maybeSingle();
  if (profileError) {
    console.error('Unable to verify staff creator role:', profileError.message);
    return respond(res, 500, { error: 'Unable to verify administrator permissions.' });
  }
  const callerRole = typeof callerProfile?.role === 'string' ? callerProfile.role.trim().toLowerCase() : '';
  if (callerRole !== 'admin') {
    return respond(res, 403, { error: 'Only administrators can add staff.' });
  }

  const { data: createdUserResult, error: createUserError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName }
  });
  if (createUserError) {
    if (/already registered|already exists/i.test(createUserError.message)) {
      return respond(res, 409, { error: 'An account already exists for this email. Assign the staff role from Staff Accounts & Permissions.' });
    }
    console.error('Unable to create staff account:', createUserError.message);
    return respond(res, 400, { error: createUserError.message });
  }

  const createdUser = createdUserResult.user;
  if (!createdUser?.id) {
    console.error('Staff account creation succeeded without returning a user ID.');
    return respond(res, 500, { error: 'The account was created, but the staff profile could not be identified.' });
  }

  const { error: staffProfileError } = await adminClient
    .from('profiles')
    .upsert(
      {
        id: createdUser.id,
        email,
        full_name: fullName,
        role: 'staff'
      },
      { onConflict: 'id' }
    );
  if (staffProfileError) {
    const { error: cleanupError } = await adminClient.auth.admin.deleteUser(createdUser.id);
    if (cleanupError) {
      console.error('Failed to clean up staff auth account after profile save failure:', cleanupError.message);
    }
    console.error('Unable to save staff profile:', staffProfileError.message);
    return respond(res, 500, {
      error: cleanupError
        ? 'The account was created, but its staff profile could not be saved or cleaned up. Contact an administrator before retrying.'
        : 'The staff profile could not be saved; the incomplete account was removed.'
    });
  }

  return respond(res, 200, { id: createdUser.id, email });
}
