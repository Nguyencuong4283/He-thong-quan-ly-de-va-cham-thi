package com.se104.backend.controller;

import com.se104.backend.dto.other.TeacherInfoDTO;
import com.se104.backend.dto.request.TeacherLoginRequest;
import com.se104.backend.dto.response.ApiResponse;
import com.se104.backend.dto.response.TeacherLoginResponse;
import com.se104.backend.service.TeacherService;
import com.se104.backend.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final TeacherService teacherService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TeacherLoginResponse>> login(@Valid @RequestBody TeacherLoginRequest request) {
        TeacherLoginResponse response=teacherService.login(request);
        return ResponseEntity.ok(
                ApiResponse.<TeacherLoginResponse>builder()
                        .success(true)
                        .data(response)
                        .build()
        );
    }
}