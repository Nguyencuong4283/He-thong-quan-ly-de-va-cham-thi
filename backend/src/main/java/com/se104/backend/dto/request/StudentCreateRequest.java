package com.se104.backend.dto.request;

import com.se104.backend.dto.other.StudentInfoDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentCreateRequest {
    @NotNull(message="Students cannot be null")
    @NotEmpty(message = "Students cannot be empty")
    List<@Valid StudentInfoDTO> students;
}
