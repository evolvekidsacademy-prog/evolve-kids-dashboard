CREATE OR REPLACE FUNCTION public.current_profile_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT lower(profile.role)
  FROM public.profiles AS profile
  WHERE profile.id = (SELECT auth.uid())
  LIMIT 1
$$;

REVOKE ALL ON FUNCTION public.current_profile_role() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.current_profile_role() TO authenticated;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.profiles FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.profiles TO authenticated;
GRANT UPDATE (role) ON TABLE public.profiles TO authenticated;

DO $$
DECLARE
  existing_policy record;
BEGIN
  FOR existing_policy IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
  LOOP
    EXECUTE format('DROP POLICY %I ON public.profiles', existing_policy.policyname);
  END LOOP;
END
$$;

CREATE POLICY profiles_select_self_or_admin
ON public.profiles
FOR SELECT
TO authenticated
USING (
  id = (SELECT auth.uid())
  OR (SELECT public.current_profile_role()) = 'admin'
);

CREATE POLICY profiles_update_other_accounts_admin
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  (SELECT public.current_profile_role()) = 'admin'
  AND id <> (SELECT auth.uid())
)
WITH CHECK (
  (SELECT public.current_profile_role()) = 'admin'
  AND id <> (SELECT auth.uid())
);
