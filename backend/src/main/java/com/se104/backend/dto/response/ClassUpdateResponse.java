package com.se104.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ClassUpdateResponse {
    private String classId;
    private String examCode;
}
