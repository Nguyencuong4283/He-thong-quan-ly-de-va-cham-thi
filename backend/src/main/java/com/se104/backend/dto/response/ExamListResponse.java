package com.se104.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ExamListResponse {
    private Integer examId;
    private String examCode;
    private String semester;
    private Integer year;
    private Integer duration;
    private String subjectName;
}
