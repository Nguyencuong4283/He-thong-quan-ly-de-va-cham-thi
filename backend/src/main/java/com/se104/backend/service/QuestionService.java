package com.se104.backend.service;

import com.se104.backend.dto.request.QuestionCreateRequest;
import com.se104.backend.dto.request.QuestionUpdateRequest;
import com.se104.backend.dto.response.QuestionDetailResponse;
import com.se104.backend.dto.response.QuestionListResponse;
import com.se104.backend.entity.Question;
import com.se104.backend.entity.Subject;
import com.se104.backend.entity.TeacherSubject;
import com.se104.backend.repository.QuestionRepository;
import com.se104.backend.repository.SubjectRepository;
import com.se104.backend.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Selection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import jakarta.persistence.criteria.Predicate;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    SubjectRepository subjectRepository;
    public List<QuestionListResponse> getAllQuestion(String subjectId, String difficulty) {
        String teacherId= SecurityUtil.getCurrentTeacherId();
        Specification<Question> spec=((root, query, criteriaBuilder) ->
        {
            List<Predicate> predicates = new ArrayList<>();
            Join<Question, Subject> subjectJoin = root.join("subject");
            Join<Subject, TeacherSubject> teacherSubjectJoin = subjectJoin.join("teacherSubjects");
            predicates.add(criteriaBuilder.equal(teacherSubjectJoin.get("teacher").get("teacherId"), teacherId));
            if(subjectId!=null){
                predicates.add(criteriaBuilder.equal(root.get("subject").get("subjectId"),subjectId));}
            if (difficulty != null)
                predicates.add(criteriaBuilder.equal(root.get("difficulty"), difficulty));
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        List<Question> questions = questionRepository.findAll(spec);
        return questions.stream().map(question->QuestionListResponse.builder()
                .questionId(question.getQuestionId())
                .difficulty(question.getDifficulty())
                .subjectName(question.getSubject().getSubjectName())
                .build()).toList();
    }
    public QuestionDetailResponse getQuestionById(int questionId){
        Question question = questionRepository.findById(questionId)
                .orElseThrow(()->new EntityNotFoundException("Question not found"));
        return QuestionDetailResponse.builder()
                .questionId(question.getQuestionId())
                .content(question.getContent())
                .answer(question.getAnswer())
                .difficulty(question.getDifficulty())
                .subjectName(question.getSubject().getSubjectName())
                .build();
    }
    public QuestionListResponse createQuestion(QuestionCreateRequest questionCreateRequest)
    {
        Subject subject = subjectRepository.findById(questionCreateRequest.getSubjectId())
                .orElseThrow(()->new EntityNotFoundException("Subject not found"));
        Question question = Question.builder()
                .content(questionCreateRequest.getContent())
                .answer(questionCreateRequest.getAnswer())
                .difficulty(questionCreateRequest.getDifficulty())
                .subject(subject)
                .build();
        Question saveQuestion=questionRepository.save(question);
        return QuestionListResponse.builder()
                .questionId(saveQuestion.getQuestionId())
                .difficulty(saveQuestion.getDifficulty())
                .subjectName(saveQuestion.getSubject().getSubjectName())
                .build();
    }
    public QuestionDetailResponse updateQuestion(int questionId, QuestionUpdateRequest questionUpdateRequest){
        Question question = questionRepository.findById(questionId)
                        .orElseThrow(()->new EntityNotFoundException("Question not found"));
        question.setContent(questionUpdateRequest.getContent());
        question.setAnswer(questionUpdateRequest.getAnswer());
        question.setDifficulty(questionUpdateRequest.getDifficulty());
        Question updateQuestion=questionRepository.save(question);
        return QuestionDetailResponse.builder()
                .questionId(updateQuestion.getQuestionId())
                .content(updateQuestion.getContent())
                .answer(updateQuestion.getAnswer())
                .difficulty(updateQuestion.getDifficulty())
                .subjectName(updateQuestion.getSubject().getSubjectName())
                .build();
    }
    public void deleteQuestion(int questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));
        questionRepository.delete(question);
    }

}
