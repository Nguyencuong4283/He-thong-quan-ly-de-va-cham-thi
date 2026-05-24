package com.se104.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private String token;
    private TeacherDTO teacher;

    // Lớp lồng để tạo nested object "teacher" trong JSON trả về
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TeacherDTO {
        private String teacher_id;
        private String full_name;
    }
}