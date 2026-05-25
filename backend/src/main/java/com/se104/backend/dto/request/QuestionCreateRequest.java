package com.se104.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionCreateRequest {
    @NotNull(message = "Content cannot be null")
    private String content;
    @NotNull(message = "Answer cannot be null")
    private String answer;
    @NotNull(message = "Difficulty cannot be null")
    private String difficulty;
    @NotNull(message = "Subject ID cannot be null")
    private String subjectId;
}
