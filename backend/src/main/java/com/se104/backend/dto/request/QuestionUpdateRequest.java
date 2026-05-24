package com.se104.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionUpdateRequest {
    @NotNull(message = "Content cannot be null")
    @NotEmpty(message = "Content cannot be empty")
    private String content;
    @NotNull(message="Answer cannot be null")
    private String answer;
    @NotNull(message="Difficulty cannot be null")
    @NotEmpty(message="Difficulty cannot be empty")
    private String difficulty;
}
