package com.se104.backend.service;

import com.se104.backend.dto.request.ExamCreateRequest;
import com.se104.backend.dto.request.ExamUpdateRequest;
import com.se104.backend.dto.response.ExamDetailResponse;
import com.se104.backend.dto.response.ExamListResponse;
import com.se104.backend.dto.response.QuestionDetailResponse;
import com.se104.backend.dto.response.QuestionListResponse;
import com.se104.backend.entity.*;
import com.se104.backend.exception.BusinessException;
import com.se104.backend.repository.ExamRepository;
import com.se104.backend.repository.QuestionRepository;
import com.se104.backend.repository.SubjectRepository;
import com.se104.backend.repository.TeacherRepository;
import com.se104.backend.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final ExamRepository examRepository;
    private final SubjectRepository subjectRepository;
    private final QuestionRepository questionRepository;
    private final TeacherRepository teacherRepository;


    public List<ExamListResponse> getAll(String subjectId, String semester, Integer year) {
        String teacherId= SecurityUtil.getCurrentTeacherId();
        Specification<Exam> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.equal(root.get("teacher").get("teacherId"), teacherId));
            if (subjectId != null) {
                predicates.add(criteriaBuilder.equal(root.get("subject").get("subjectId"), subjectId));
            }
            if (semester != null) {
                predicates.add(criteriaBuilder.equal(root.get("semester"), semester));
            }
            if (year != null) {
                predicates.add(criteriaBuilder.equal(root.get("year"), year));
            }
            return criteriaBuilder.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
        return examRepository.findAll(spec).stream()
                .map(this::examToExamListResponse)
                .toList();
    }

    public ExamDetailResponse getExamById(int examId) {
        String teacherId=SecurityUtil.getCurrentTeacherId();
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new EntityNotFoundException("Exam not found"));
        if (!exam.getTeacher().getTeacherId().equals(teacherId))
            throw new BusinessException("Unauthorized access to exam");
        List<QuestionDetailResponse> questions=exam.getExamQuestions()
                .stream()
                .sorted(Comparator.comparing(ExamQuestion::getQuestionOrder))
                .map(e->questionToQuestionDetailResponse(e.getQuestion()))
                .toList();
        return ExamDetailResponse.builder()
                .examSummary(examToExamListResponse(exam))
                .questions(questions)
                .build();
    }

    @Transactional
    public ExamListResponse createExam(ExamCreateRequest examCreateRequest) {
        String teacherId=SecurityUtil.getCurrentTeacherId();
        Teacher teacher=teacherRepository.findById(teacherId)
                .orElseThrow(()->new EntityNotFoundException("Teacher not found"));
        Subject subject=subjectRepository.findById(examCreateRequest.getSubjectId())
                .orElseThrow(()->new EntityNotFoundException("Subject not found"));
        List<Question> questions=questionRepository.findAllById(examCreateRequest.getQuestionsId());
        if (questions.size() != examCreateRequest.getQuestionsId().size()) {
            throw new EntityNotFoundException("Some questions not found");
        }
        Exam exam=Exam.builder()
                .examCode(examCreateRequest.getExamCode())
                .semester(examCreateRequest.getSemester())
                .year(examCreateRequest.getYear())
                .duration(examCreateRequest.getDuration())
                .subject(subject)
                .teacher(teacher)
                .build();
        exam=examRepository.save(exam);
        List<ExamQuestion> examQuestions=buildExamQuestions(exam,questions);
        exam.setExamQuestions(examQuestions);
        exam=examRepository.save(exam);
        return examToExamListResponse(exam);
    }
    @Transactional
    public ExamListResponse updateExam(int examId, ExamUpdateRequest examUpdateRequest) {
        String teacherId=SecurityUtil.getCurrentTeacherId();
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new EntityNotFoundException("Exam not found"));
        if (!exam.getTeacher().getTeacherId().equals(teacherId))
            throw new BusinessException("Unauthorized access to exam");
        List<Question> questions = questionRepository.findAllById(examUpdateRequest.getQuestionsId());
        if (questions.size() != examUpdateRequest.getQuestionsId().size()) {
            throw new EntityNotFoundException("Some questions not found");
        }
        exam.setDuration(examUpdateRequest.getDuration());
        exam.getExamQuestions().clear();
        exam.getExamQuestions().addAll(buildExamQuestions(exam, questions));
        return examToExamListResponse(exam);
    }
    private QuestionDetailResponse questionToQuestionDetailResponse(Question question) {
        return QuestionDetailResponse.builder()
                .questionId(question.getQuestionId())
                .content(question.getContent())
                .answer(question.getAnswer())
                .difficulty(question.getDifficulty())
                .subjectName(question.getSubject().getSubjectName())
                .build();
    }
    private ExamListResponse examToExamListResponse(Exam exam) {
        return ExamListResponse.builder()
                .examId(exam.getExamId())
                .examCode(exam.getExamCode())
                .semester(exam.getSemester())
                .year(exam.getYear())
                .duration(exam.getDuration())
                .subjectName(exam.getSubject().getSubjectName())
                .build();
    }
    private List<ExamQuestion> buildExamQuestions(Exam exam, List<Question> questions) {
        return IntStream.range(0, questions.size())
                .mapToObj(i -> ExamQuestion.builder()
                        .id(new ExamQuestionId(
                                exam.getExamId(),
                                questions.get(i).getQuestionId()
                        ))
                        .exam(exam)
                        .question(questions.get(i))
                        .questionOrder(i + 1)
                        .build())
                .collect(Collectors.toList());
    }
}
