package com.se104.backend.dto.response;

import com.se104.backend.dto.other.TeacherInfoDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TeacherLoginResponse {
    private String token;
    private TeacherInfoDTO teacher;
}
