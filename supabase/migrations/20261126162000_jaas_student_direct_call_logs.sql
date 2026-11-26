DROP POLICY IF EXISTS class_sessions_insert_self ON public.class_sessions;
CREATE POLICY class_sessions_insert_self
ON public.class_sessions
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = (SELECT auth.uid())
  AND participant_role = (SELECT public.current_profile_role())
  AND (
    (
      batch_id IS NOT NULL
      AND EXISTS (
        SELECT 1
        FROM public.batches AS batch
        WHERE batch.id = class_sessions.batch_id
      )
    )
    OR (
      batch_id IS NULL
      AND (SELECT public.current_profile_role()) IN ('admin', 'staff', 'student')
      AND COALESCE(batch_name, '') = 'Direct JaaS Test'
      AND COALESCE(room_code, '') <> ''
    )
  )
);
