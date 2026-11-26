GRANT USAGE ON SCHEMA public TO authenticated;

REVOKE ALL PRIVILEGES ON TABLE
  public.batches,
  public.students,
  public.class_sessions,
  public.attendance,
  public.payments
FROM PUBLIC, anon, authenticated;

GRANT SELECT ON TABLE
  public.batches,
  public.students,
  public.class_sessions,
  public.attendance
TO authenticated;

GRANT INSERT ON TABLE
  public.students,
  public.class_sessions,
  public.attendance,
  public.payments
TO authenticated;

GRANT UPDATE (sessions_completed, fee_status) ON TABLE public.students TO authenticated;
GRANT UPDATE ON TABLE public.attendance TO authenticated;

ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  existing_policy record;
BEGIN
  FOR existing_policy IN
    SELECT tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('batches', 'students', 'class_sessions', 'attendance', 'payments')
  LOOP
    EXECUTE format(
      'DROP POLICY %I ON public.%I',
      existing_policy.policyname,
      existing_policy.tablename
    );
  END LOOP;
END
$$;

CREATE POLICY batches_select_by_assignment
ON public.batches
FOR SELECT
TO authenticated
USING (
  (SELECT public.current_profile_role()) = 'admin'
  OR (
    (SELECT public.current_profile_role()) = 'staff'
    AND trainer_id = (SELECT auth.uid())
  )
  OR (
    (SELECT public.current_profile_role()) = 'student'
    AND EXISTS (
      SELECT 1
      FROM public.students AS student
      WHERE student.batch_id = batches.id
        AND student.user_id = (SELECT auth.uid())
    )
  )
);

CREATE POLICY students_select_by_assignment
ON public.students
FOR SELECT
TO authenticated
USING (
  (SELECT public.current_profile_role()) = 'admin'
  OR (
    (SELECT public.current_profile_role()) = 'staff'
    AND trainer_id = (SELECT auth.uid())
  )
  OR (
    (SELECT public.current_profile_role()) = 'student'
    AND user_id = (SELECT auth.uid())
  )
);

CREATE POLICY students_insert_admin
ON public.students
FOR INSERT
TO authenticated
WITH CHECK (
  (SELECT public.current_profile_role()) = 'admin'
);

CREATE POLICY students_update_sessions_admin_or_assigned_staff
ON public.students
FOR UPDATE
TO authenticated
USING (
  (SELECT public.current_profile_role()) = 'admin'
  OR (
    (SELECT public.current_profile_role()) = 'staff'
    AND trainer_id = (SELECT auth.uid())
  )
)
WITH CHECK (
  (SELECT public.current_profile_role()) = 'admin'
  OR (
    (SELECT public.current_profile_role()) = 'staff'
    AND trainer_id = (SELECT auth.uid())
  )
);

CREATE OR REPLACE FUNCTION public.guard_student_fee_status_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF (SELECT auth.uid()) IS NOT NULL
     AND COALESCE((SELECT public.current_profile_role()), '') <> 'admin'
     AND NEW.fee_status IS DISTINCT FROM OLD.fee_status
  THEN
    RAISE EXCEPTION 'Only administrators can update student fee status';
  END IF;
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS guard_student_fee_status_update ON public.students;
CREATE TRIGGER guard_student_fee_status_update
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.guard_student_fee_status_update();

CREATE POLICY class_sessions_select_admin_or_self
ON public.class_sessions
FOR SELECT
TO authenticated
USING (
  (SELECT public.current_profile_role()) = 'admin'
  OR (
    (SELECT public.current_profile_role()) IN ('staff', 'student')
    AND user_id = (SELECT auth.uid())
  )
);

CREATE POLICY class_sessions_insert_self
ON public.class_sessions
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = (SELECT auth.uid())
  AND participant_role = (SELECT public.current_profile_role())
  AND EXISTS (
    SELECT 1
    FROM public.batches AS batch
    WHERE batch.id = class_sessions.batch_id
  )
);

CREATE POLICY attendance_select_by_assignment
ON public.attendance
FOR SELECT
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
  OR (
    (SELECT public.current_profile_role()) = 'student'
    AND EXISTS (
      SELECT 1
      FROM public.students AS student
      WHERE student.id = attendance.student_id
        AND student.user_id = (SELECT auth.uid())
    )
  )
);

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
);

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
);

CREATE POLICY payments_insert_admin
ON public.payments
FOR INSERT
TO authenticated
WITH CHECK (
  (SELECT public.current_profile_role()) = 'admin'
);
