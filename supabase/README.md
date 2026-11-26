# Supabase setup

Apply `migrations/20261126135600_profiles_role_rls.sql` to the Supabase project before signing in. Use the Supabase CLI migration workflow or run the SQL in the Supabase SQL Editor.

The migration enables row-level security so authenticated users can read their own profile and admins can read or update other accounts, without allowing users to change their own role. It replaces existing row-level security policies on `public.profiles`.

Apply `migrations/20261126144500_academy_data_access.sql` after the profile migration. It grants the dashboard's required table privileges and replaces policies on `batches`, `students`, `class_sessions`, `attendance`, and `payments` with role- and assignment-scoped policies.

Apply `migrations/20261126153000_jaas_direct_call_attendance.sql` after the academy data access migration. It permits batch-independent JaaS session logs for admins and staff, and adds a `class_session_id` link for attendance records.

For automated attendance, each student must have a linked Supabase auth user in `students.user_id` and an assigned `batch_id`. When an admin/staff host's JaaS room receives a signed-in student, the app matches JaaS's `participantJoined.userContext.id` to that auth user and marks the student Present; the attendance row is linked to the saved class session when the host ends the call. Direct test rooms have no batch roster, so they do not automatically mark attendance.

Apply `migrations/20261126160000_jaas_auto_attendance_link.sql` after that migration. It permits an assigned host to link automatically recorded attendance to that host's matching batch session while preserving the existing role and assignment checks.

Apply `migrations/20261126162000_jaas_student_direct_call_logs.sql` next. It allows student accounts to save their own batch-independent JaaS session logs.

## JaaS and Vercel setup

1. In the [8x8 JaaS console](https://jaas.8x8.vc/), create an App, [generate an RSA API key](https://developer.8x8.com/jaas/docs/api-keys-generate-add), and upload its public key. Keep the private key for Vercel only. See the [JaaS JWT requirements](https://developer.8x8.com/jaas/docs/api-keys-jwt) and [IFrame API integration](https://developer.8x8.com/jaas/docs/iframe-api-integration).
2. In Vercel, add these environment variables for every environment where you deploy the app:
   - `JAAS_APP_ID`: the App ID from the JaaS console.
   - `JAAS_API_KEY_ID`: the key ID associated with the uploaded public key.
   - `JAAS_PRIVATE_KEY`: the matching private RSA key, including its PEM header and footer. Newlines may be entered literally or as `\n`.
   - `SUPABASE_URL` and `SUPABASE_ANON_KEY`: the same project URL and public anon key used by the dashboard. These are used by the token function to verify the signed-in user and role.
   - Keep the existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables for the browser app.
3. Apply all migrations above in timestamp order using the Supabase CLI or the Supabase SQL Editor. Deploying the frontend to Vercel does not apply database migrations.
4. Redeploy after setting the environment variables. Admin, staff, and student accounts can join a shared JaaS room without a class assignment. Calls are logged; batch-based automated attendance only applies when using an assigned batch classroom.

Never put `JAAS_PRIVATE_KEY` in a `VITE_` variable, client-side code, or a committed file. The `/api/jaas-token` function signs short-lived room-scoped tokens only after checking the caller's Supabase session and profile role.

The plain Vite development server does not run Vercel API functions. For local end-to-end testing, configure the same environment variables and use `npx vercel dev`; otherwise test against the deployed Vercel app. See the [JaaS IFrame API events](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe-events/) reference for the participant identity event used by automated attendance.
