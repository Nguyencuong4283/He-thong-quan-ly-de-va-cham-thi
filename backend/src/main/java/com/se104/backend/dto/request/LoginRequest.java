package com.se104.backend.dto.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String teacher_id;
    private String password;
}