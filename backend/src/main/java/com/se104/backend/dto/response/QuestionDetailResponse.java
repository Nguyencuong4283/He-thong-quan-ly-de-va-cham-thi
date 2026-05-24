package com.se104.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QuestionDetailResponse {
    private int questionId;
    private String content;
    private String answer;
    private String difficulty;
    private String subjectName;
}
