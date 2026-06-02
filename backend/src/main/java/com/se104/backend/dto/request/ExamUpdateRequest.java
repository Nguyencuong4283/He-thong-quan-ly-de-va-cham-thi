package com.se104.backend.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;
import lombok.NonNull;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamUpdateRequest {
    @DecimalMin(value="30", message="Duration must be at least 30")
    @DecimalMax(value="180", message="Duration must be at most 180")
    private Integer duration;
    @NotNull(message="Questions ID cannot be null")
    private List<Integer> questionsId;
}
