package com.se104.backend.dto.other;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentInfoDTO {
    @NotNull(message = "Student ID cannot be null")
    @NotEmpty(message = "Student ID cannot be empty")
    private String studentId;
    @NotNull(message = "Full name cannot be null")
    @NotEmpty(message = "Full name cannot be empty")
    private String fullName;
    @Email(message = "Invalid email format")
    private String email;
}
