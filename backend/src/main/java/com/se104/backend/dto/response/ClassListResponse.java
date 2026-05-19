package com.se104.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClassListResponse {
    private String classId;
    private String name;
    private String subjectName;
    private String teacherId;
    private String examCode;
    private Integer totalStudent;
}
