package com.se104.backend.controller;

import com.se104.backend.dto.request.QuestionCreateRequest;
import com.se104.backend.dto.request.QuestionUpdateRequest;
import com.se104.backend.dto.response.ApiResponse;
import com.se104.backend.dto.response.QuestionDetailResponse;
import com.se104.backend.dto.response.QuestionListMeta;
import com.se104.backend.dto.response.QuestionListResponse;
import com.se104.backend.service.ExamService;
import com.se104.backend.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;
    @GetMapping
    public ResponseEntity<ApiResponse<List<QuestionListResponse>>> getAllQuestion(
            @RequestParam(required = false) String subjectId,
            @RequestParam(required = false) String difficulty)
    {
        List<QuestionListResponse> questionList = questionService.getAllQuestion(subjectId, difficulty);
        int amountSub=(int)questionList.stream().map(q->q.getSubjectName()).distinct().count();
        QuestionListMeta meta=QuestionListMeta.builder()
                .totalQuestion(questionList.size())
                .amountSubject(amountSub)
                .build();
        return new ResponseEntity<>(ApiResponse.<List<QuestionListResponse>>builder()
                .success(true)
                .data(questionList)
                .meta(meta)
            .build(), HttpStatus.OK);
    }
    @GetMapping("/{question_id}")
    public ResponseEntity<ApiResponse<QuestionDetailResponse>> getQuestionById(@PathVariable("question_id") int questionId){
        QuestionDetailResponse questionDetail = questionService.getQuestionById(questionId);
        return new ResponseEntity<>(ApiResponse.<QuestionDetailResponse>builder()
                .success(true)
                .data(questionDetail)
                .build(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<ApiResponse<QuestionListResponse>> createQuestion(@Valid @RequestBody QuestionCreateRequest questionCreateRequest){
        QuestionListResponse question=questionService.createQuestion(questionCreateRequest);
        return new ResponseEntity<>(ApiResponse.<QuestionListResponse>builder()
                .success(true)
                .data(question)
                .build(), HttpStatus.OK);
    }
    @PutMapping("/{question_id}")
    public ResponseEntity<ApiResponse<QuestionDetailResponse>> updateQuestion(@PathVariable("question_id") int questionId,
                                                                              @Valid @RequestBody QuestionUpdateRequest questionUpdateRequest){
        QuestionDetailResponse question=questionService.updateQuestion(questionId,questionUpdateRequest);
        return new ResponseEntity<>(ApiResponse.<QuestionDetailResponse>builder()
                .success(true)
                .data(question)
                .build(), HttpStatus.OK);
    }

}
