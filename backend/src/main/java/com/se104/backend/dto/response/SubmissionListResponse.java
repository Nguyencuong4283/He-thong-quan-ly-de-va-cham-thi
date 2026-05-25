package com.se104.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SubmissionListResponse {
    private Integer submissionId;
    private String studentId;
    private String fullName;
    private Float score;
    private Boolean status;
}
