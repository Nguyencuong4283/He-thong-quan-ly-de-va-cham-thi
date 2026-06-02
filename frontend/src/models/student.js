export function mapStudentListItem(item={})
{
  return {
    studentId: item.studentId ?? item.id ?? item.student_id ?? null,
    fullName: item.fullName ?? item.name ?? item.full_name ?? '',
    email: item.email ?? item.emailAddress ?? item.email_address ?? '',
  };
}
export function buildStudentCreateRequest(students = []) {
  return {
    students: students.map((s) => ({
      studentId: s.mssv || s.studentId || '',
      fullName: s.name || s.fullName || '',
      email: s.email || '',
    })),
  };
}