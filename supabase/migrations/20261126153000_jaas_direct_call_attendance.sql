ALTER TABLE public.class_sessions
  ALTER COLUMN batch_id DROP NOT NULL;

DO $$
DECLARE
  session_id_type text;
BEGIN
  SELECT format_type(attribute.atttypid, attribute.atttypmod)
  INTO session_id_type
  FROM pg_attribute AS attribute
  WHERE attribute.attrelid = 'public.class_sessions'::regclass
    AND attribute.attname = 'id'
    AND NOT attribute.attisdropped;

  IF session_id_type IS NULL THEN
    RAISE EXCEPTION 'public.class_sessions.id was not found';
  END IF;

  EXECUTE format(
    'ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS class_session_id %s REFERENCES public.class_sessions(id) ON DELETE SET NULL',
    session_id_type
  );
END
$$;

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
      AND (SELECT public.current_profile_role()) IN ('admin', 'staff')
      AND COALESCE(batch_name, '') = 'Direct JaaS Test'
      AND COALESCE(room_code, '') <> ''
    )
  )
);

DROP POLICY IF EXISTS attendance_insert_admin_or_assigned_staff ON public.attendance;
CREATE POLICY attendance_insert_admin_or_assigned_staff
ON public.attendance
FOR INSERT
TO authenticated
WITH CHECK (
  marked_by = (SELECT auth.uid())
  AND (
    (SELECT public.current_profile_role()) = 'admin'
    OR (
      (SELECT public.current_profile_role()) = 'staff'
      AND EXISTS (
        SELECT 1
        FROM public.students AS student
        WHERE student.id = attendance.student_id
          AND student.trainer_id = (SELECT auth.uid())
          AND student.batch_id = attendance.batch_id
      )
    )
  )
  AND (
    class_session_id IS NULL
    OR EXISTS (
      SELECT 1
      FROM public.class_sessions AS class_session
      WHERE class_session.id = attendance.class_session_id
        AND class_session.user_id = (SELECT auth.uid())
        AND (
          class_session.batch_id = attendance.batch_id
          OR (
            class_session.batch_id IS NULL
            AND (SELECT public.current_profile_role()) IN ('admin', 'staff')
          )
        )
    )
  )
);

DROP POLICY IF EXISTS attendance_update_admin_or_assigned_staff ON public.attendance;
CREATE POLICY attendance_update_admin_or_assigned_staff
ON public.attendance
FOR UPDATE
TO authenticated
USING (
  (SELECT public.current_profile_role()) = 'admin'
  OR (
    (SELECT public.current_profile_role()) = 'staff'
    AND EXISTS (
      SELECT 1
      FROM public.students AS student
      WHERE student.id = attendance.student_id
        AND student.trainer_id = (SELECT auth.uid())
        AND student.batch_id = attendance.batch_id
    )
  )
)
WITH CHECK (
  marked_by = (SELECT auth.uid())
  AND (
    (SELECT public.current_profile_role()) = 'admin'
    OR (
      (SELECT public.current_profile_role()) = 'staff'
      AND EXISTS (
        SELECT 1
        FROM public.students AS student
        WHERE student.id = attendance.student_id
          AND student.trainer_id = (SELECT auth.uid())
          AND student.batch_id = attendance.batch_id
      )
    )
  )
  AND (
    class_session_id IS NULL
    OR EXISTS (
      SELECT 1
      FROM public.class_sessions AS class_session
      WHERE class_session.id = attendance.class_session_id
        AND class_session.user_id = (SELECT auth.uid())
        AND (
          class_session.batch_id = attendance.batch_id
          OR (
            class_session.batch_id IS NULL
            AND (SELECT public.current_profile_role()) IN ('admin', 'staff')
          )
        )
    )
  )
);
