package com.se104.backend.controller;

import com.se104.backend.dto.request.UpdateProfileRequest;
import com.se104.backend.dto.request.ChangePasswordRequest;
import com.se104.backend.dto.response.TeacherProfileResponse;
import com.se104.backend.dto.response.ApiResponse;
import com.se104.backend.dto.response.SubjectResponse;
import com.se104.backend.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;
    @GetMapping("/subjects")
    public ResponseEntity<ApiResponse<List<SubjectResponse>>> getSubjects() {
        List<SubjectResponse> response = teacherService.getSubjects();
        return ResponseEntity.ok(ApiResponse.<List<SubjectResponse>>builder()
                .success(true)
                .data(response)
                .build());
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<TeacherProfileResponse>> getProfile() {
        TeacherProfileResponse response = teacherService.getProfile();
        return ResponseEntity.ok(ApiResponse.<TeacherProfileResponse>builder()
                .success(true)
                .data(response)
                .build());
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<TeacherProfileResponse>> updateProfile(@RequestBody UpdateProfileRequest request) {
        TeacherProfileResponse response = teacherService.updateProfile(request);
        return ResponseEntity.ok(ApiResponse.<TeacherProfileResponse>builder()
                .success(true)
                .data(response)
                .build());
    }

    @PutMapping("/password")
    public ResponseEntity<ApiResponse<String>> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            teacherService.changePassword(request);
            return ResponseEntity.ok(ApiResponse.<String>builder()
                    .success(true)
                    .data("Đổi mật khẩu thành công")
                    .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }
}
