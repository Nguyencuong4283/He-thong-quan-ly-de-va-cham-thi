export function mapClassListItem(item={})
{
  return {
    classId: item.classId ?? item.id ?? item.class_id ?? null,
    className: item.className ?? item.name ?? item.class_name ?? '',
    subjectName: item.subjectName ?? item.subject_name ?? item.subject ?? '',
    semester: item.semester ?? item.sem ?? '',
    year: item.year ?? item.classYear ?? item.class_year ?? null,
    teacherId: item.teacherId ?? item.teacher_id ?? item.teacherId ?? null,
    examCode: item.examCode ?? item.exam_code ?? item.examCode ?? '',
    totalStudent: item.totalStudent ?? item.total_student ?? item.studentCount ?? null,
  };
}
export function buildClassCreateRequest({ classId, className, semester, year, subjectId,examId}) {
    return {
        classId,
        name: className,
        semester,
        year,
        subjectId,
        examId,
    };
}