package com.se104.backend.controller;

import com.se104.backend.dto.request.ExamCreateRequest;
import com.se104.backend.dto.request.ExamUpdateRequest;
import com.se104.backend.dto.response.ApiResponse;
import com.se104.backend.dto.response.ExamDetailResponse;
import com.se104.backend.dto.response.ExamListResponse;
import com.se104.backend.service.ExamService;
import jakarta.validation.Valid;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam")
@RequiredArgsConstructor
public class ExamController {
    private final ExamService examService;
    @GetMapping
    public ResponseEntity<ApiResponse<List<ExamListResponse>>> getAllExam(
            @RequestParam(required = false) String subjectId,
            @RequestParam(required = false) String semeter,
            @RequestParam(required = false) Integer year
    )
    {
        List<ExamListResponse> exams=examService.getAll(subjectId,semeter,year);
        return ResponseEntity.ok(ApiResponse.<List<ExamListResponse>>builder()
                .success(true)
                .data(exams)
                .build());
    }
    @GetMapping("/{examId}")
    public ResponseEntity<ApiResponse<ExamDetailResponse>> getExamById(@PathVariable int examId){
        ExamDetailResponse examDetail=examService.getExamById(examId);
        return ResponseEntity.ok(ApiResponse.<ExamDetailResponse>builder()
                .success(true)
                .data(examDetail)
                .build());
    }
    @PostMapping
    public ResponseEntity<ApiResponse<ExamListResponse>> createExam(@Valid @RequestBody ExamCreateRequest examCreateRequest){
        ExamListResponse exam=examService.createExam(examCreateRequest);
        return ResponseEntity.ok(ApiResponse.<ExamListResponse>builder()
                .success(true)
                .message("Create exam successfully")
                .data(exam)
                .build());
    }
    @PutMapping("/{examId}")
    public ResponseEntity<ApiResponse<ExamListResponse>> updateExam(
            @PathVariable int examId,
            @Valid @RequestBody ExamUpdateRequest examUpdateRequest
    ) {
        ExamListResponse exam = examService.updateExam(examId, examUpdateRequest);
        return ResponseEntity.ok(ApiResponse.<ExamListResponse>builder()
                .success(true)
                .message("Update exam successfully")
                .data(exam)
                .build());
    }
    @DeleteMapping("/{examId}")
    public ResponseEntity<ApiResponse<Void>> deleteExam(@PathVariable int examId) {
        examService.deleteExam(examId);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Delete exam successfully")
                .build());
    }
}
