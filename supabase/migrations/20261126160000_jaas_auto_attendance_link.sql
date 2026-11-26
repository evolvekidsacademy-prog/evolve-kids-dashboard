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
