export function mapExamListItem(item = {}) {
  return {
    examId: item.examId ?? item.id ?? item.exam_id ?? null,
    examCode: item.examCode ?? item.exam_code ?? item.code ?? '',
    semester: item.semester ?? item.semeter ?? '',
    year: item.year ?? item.examYear ?? item.yearExam ?? null,
    duration: item.duration ?? item.time ?? null,
    subjectName: item.subjectName ?? item.subject_name ?? item.subject ?? '',
  };
}

export function mapExamQuestionItem(item = {}) {
  return {
    questionId: item.questionId ?? item.id ?? item.question_id ?? null,
    content: item.content ?? item.description ?? '',
    answer: item.answer ?? item.referenceAnswer ?? item.outline ?? '',
    difficulty: item.difficulty ?? item.level ?? '',
  };
}

export function mapExamDetailItem(item = {}) {
  const summary = item.examSummary ?? item.summary ?? item;

  return {
    examSummary: {
      examId: summary.examId ?? summary.id ?? summary.exam_id ?? null,
      examCode: summary.examCode ?? summary.exam_code ?? summary.code ?? '',
      semester: summary.semester ?? summary.semeter ?? '',
      year: summary.year ?? summary.examYear ?? summary.yearExam ?? null,
      duration: summary.duration ?? summary.time ?? null,
      subjectId: summary.subjectId ?? summary.subject_id ?? summary.subjectId ?? null,
      subjectName: summary.subjectName ?? summary.subject_name ?? summary.subject ?? '',
    },
    questions: Array.isArray(item.questions) ? item.questions.map(mapExamQuestionItem) : [],
  };
}

export function mapExamList(arr = []) {
  return (arr || []).map(mapExamListItem);
}

//request builders
export function buildExamCreateRequest({ examCode, semester, year, duration, subjectId, questions = [] }) {
  return {
    examCode,
    semester,
    year,
    duration,
    subjectId,
    questionsId: questions,
  };
}

export function buildExamUpdateRequest({ duration, questions = [] }) {
  return {
    duration,
    questionsId: questions,
  };
}

export default {
  mapExamListItem,
  mapExamQuestionItem,
  mapExamDetailItem,
  mapExamList,
  buildExamCreateRequest,
  buildExamUpdateRequest,
};