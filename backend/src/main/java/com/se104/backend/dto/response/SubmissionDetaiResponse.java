package com.se104.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SubmissionDetaiResponse {
    private Integer submissionId;
    private String studentId;
    private String studentName;
    private String classId;
    private Float score;
    private String scoreText;
    private String note;
    private Boolean status;
}