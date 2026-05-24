package com.se104.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ClassCreateRequest {
    @NotNull(message = "Class ID cannot be null")
    private String classId;
    @NotNull(message = "Name cannot be null")
    private String name;
    @NotNull(message = "Semester cannot be null")
    private String semester;
    @NotNull(message = "Year cannot be null")
    private Integer year;
    @NotNull(message = "Subject ID cannot be null")
    private String subjectId;
    private Integer examId;
}
