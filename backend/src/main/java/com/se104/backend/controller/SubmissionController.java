package com.se104.backend.controller;

import com.se104.backend.dto.request.SubmissionCreateRequest;
import com.se104.backend.dto.request.SubmissionUpdateRequest;
import com.se104.backend.dto.response.ApiResponse;
import com.se104.backend.dto.response.SubmissionDetaiResponse;
import com.se104.backend.dto.response.SubmissionListResponse;
import com.se104.backend.service.SubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @GetMapping("/classes/{classId}/submission")
    public ResponseEntity<ApiResponse<List<SubmissionListResponse>>> getSubmissionsByClass(
            @PathVariable String classId,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean statusFilter
    ) {
        List<SubmissionListResponse> submissions =
                submissionService.getSubmissionsByClass(classId, search, statusFilter);

        ApiResponse<List<SubmissionListResponse>> response =
                ApiResponse.<List<SubmissionListResponse>>builder()
                        .success(true)
                        .data(submissions)
                        .message("Get submissions successfully")
                        .meta(Map.of("class_id", classId))
                        .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/submission/{submissionId}")
    public ResponseEntity<ApiResponse<SubmissionDetaiResponse>> getSubmissionDetail(
            @PathVariable Integer submissionId
    ) {
        SubmissionDetaiResponse submission =
                submissionService.getSubmissionDetail(submissionId);

        ApiResponse<SubmissionDetaiResponse> response =
                ApiResponse.<SubmissionDetaiResponse>builder()
                        .success(true)
                        .data(submission)
                        .message("Get submission detail successfully")
                        .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/classes/{classId}/student/{studentId}/submission")
    public ResponseEntity<ApiResponse<SubmissionDetaiResponse>> createSubmission(
            @PathVariable String classId,
            @PathVariable String studentId,
            @Valid @RequestBody SubmissionCreateRequest request
    ) {
        SubmissionDetaiResponse submission =
                submissionService.createSubmission(classId, studentId, request);

        ApiResponse<SubmissionDetaiResponse> response =
                ApiResponse.<SubmissionDetaiResponse>builder()
                        .success(true)
                        .data(submission)
                        .message("Create submission successfully")
                        .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/submission/{submissionId}")
    public ResponseEntity<ApiResponse<SubmissionDetaiResponse>> updateSubmission(
            @PathVariable Integer submissionId,
            @Valid@RequestBody SubmissionUpdateRequest request
    ) {
        SubmissionDetaiResponse submission =
                submissionService.updateSubmission(submissionId, request);

        ApiResponse<SubmissionDetaiResponse> response =
                ApiResponse.<SubmissionDetaiResponse>builder()
                        .success(true)
                        .data(submission)
                        .message("Update submission successfully")
                        .build();

        return ResponseEntity.ok(response);
    }
}