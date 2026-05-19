package com.se104.backend.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionCreateRequest {
    @NotNull(message = "Exam ID cannot be null")
    private Integer examId;
    @NotNull(message = "Score cannot be null")
    @DecimalMin(value = "0.0", message = "Score must be at least 0")
    @DecimalMax(value = "10.0", message = "Score must not exceed 10")
    private Float score;
    private String scoreText;
    private String note;
    @NotNull(message = "Status cannot be null")
    private Boolean status;
}
