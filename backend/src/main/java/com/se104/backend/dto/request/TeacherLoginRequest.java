package com.se104.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherLoginRequest {
    @NotBlank(message = "Teacher ID cannot be blank")
    private String teacherId;
    @NotBlank(message = "Password cannot be blank")
    private String password;
}
