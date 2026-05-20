package com.se104.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.se104.backend.dto.other.StudentInfoDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ClassStudentResponse {
    private String classId;
    private String name;
    private String subjectName;
    private String semester;
    private Integer year;
    private Integer examId;
    private String examCode;
    private List<StudentInfoDTO> students;
}
