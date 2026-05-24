package com.se104.backend.dto.other;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TeacherInfoDTO {
    private String teacherId;
    private String fullName;
}
