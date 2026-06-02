export function mapQuestionListItem(item = {}) {
  return {
    questionId: item.questionId ?? item.id ?? null,
    difficulty: item.difficulty ?? item.level ?? "",
    subjectName: item.subjectName ?? item.subject_name ?? item.subject ?? "",
  };
}

export function mapQuestionDetailItem(item = {}) {
  return {
    questionId: item.questionId ?? item.id ?? null,
    difficulty: item.difficulty ?? item.level ?? "",
    subjectName: item.subjectName ?? item.subject_name ?? item.subject ?? "",
    content: item.content ?? item.description ?? "",
    answer: item.answer ?? item.referenceAnswer ?? "",
  };
}

export function mapQuestionList(arr = []) {
  return (arr || []).map(mapQuestionListItem);
}
/**
 * Build a request payload for creating a new question.
 * @param {Object} params
 * @param {string} params.content - Nội dung câu hỏi
 * @param {string} params.answer - Lời giải tham khảo / outline chấm điểm
 * @param {string} params.difficulty - Độ khó (Dễ, Trung bình, Khó)
 * @param {string} params.subjectId - Mã môn học (ví dụ: MH001)
 * @returns {Object}
 */
export function buildQuestionCreateRequest({ content, answer, difficulty, subjectId }) {
  return {
    content,
    answer,
    difficulty,
    subjectId,
  };
}

/**
 * Build a request payload for updating an existing question.
 * @param {Object} params
 * @param {string} params.content
 * @param {string} params.answer
 * @param {string} params.difficulty
 * @returns {Object}
 */
export function buildQuestionUpdateRequest({ content, answer, difficulty }) {
  return {
    content,
    answer,
    difficulty,
  };
}
export default { mapQuestionListItem, mapQuestionDetailItem, mapQuestionList,buildQuestionCreateRequest, buildQuestionUpdateRequest };
