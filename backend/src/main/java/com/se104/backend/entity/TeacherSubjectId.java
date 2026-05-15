package com.se104.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherSubjectId implements Serializable {

    @Column(nullable = false)
    private String teacherId;

    @Column(nullable = false)
    private String subjectId;
}