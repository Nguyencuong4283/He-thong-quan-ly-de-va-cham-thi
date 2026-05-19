package com.se104.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
//cai nay null thi ko hien
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QuestionListResponse {
    private int questionId;
    private String difficulty;
    private String subjectName;
}
