# Supabase setup

Apply `migrations/20261126135600_profiles_role_rls.sql` to the Supabase project before signing in. Use the Supabase CLI migration workflow or run the SQL in the Supabase SQL Editor.

The migration enables row-level security so authenticated users can read their own profile and admins can read or update other accounts, without allowing users to change their own role. It replaces existing row-level security policies on `public.profiles`.
