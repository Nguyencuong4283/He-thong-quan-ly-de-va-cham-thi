package com.se104.backend.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamCreateRequest {
    @NotNull(message="Exam code cannot be null")
    private String examCode;
    private String semester;
    @DecimalMin(value="1", message="Year must be at least 1")
    private int year;
    @DecimalMin(value="30", message="Duration must be at least 30")
    @DecimalMax(value="180", message="Duration must be at most 180")
    private int duration;
    @NotNull(message="Subject ID cannot be null")
    private String subjectId;
    @NotNull(message="Questions ID cannot be null")
    private List<Integer> questionsId;
}
