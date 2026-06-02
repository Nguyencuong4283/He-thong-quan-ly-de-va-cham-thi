export function mapSubmissionListItem(item={})
{
    return {
        submissionId: item.submissionId ?? item.id ?? null,
        studentId: item.studentId ?? null,
        // Danh sách trả về fullName, chi tiết trả về studentName. Map cả 2 về fullName.
        fullName: item.fullName ?? item.studentName ?? item.name ?? '',
        score: item.score ?? -1,
        status: item.status === true || item.status === 'true',
    };
}
export function mapSubmissionDetailItem(item={})
{
    return {
        submissionId: item.submissionId ?? item.id ?? null,
        studentId: item.studentId ?? null,
        fullName: item.studentName ?? item.fullName ?? '', // Chuẩn hóa studentName từ API về fullName
        classId: item.classId ?? null,
        score: item.score ?? -1,
        scoreText: item.scoreText ?? '',
        status: item.status === true,
        note: item.note ?? '',
    };
}
export function buildSubmissionCreateAndUpdateRequest({ examId, score, scoreText, note, status }) {
    return {
        examId,
        score,
        scoreText,
        note,
        status
    };
}