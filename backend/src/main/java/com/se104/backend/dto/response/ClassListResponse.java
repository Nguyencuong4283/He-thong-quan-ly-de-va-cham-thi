package com.se104.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ClassListResponse {
    private String classId;
    private String name;
    private String subjectName;
    private String semester;
    private Integer year;
    private String teacherId;
    private String examCode;
    private Integer totalStudent;
}
