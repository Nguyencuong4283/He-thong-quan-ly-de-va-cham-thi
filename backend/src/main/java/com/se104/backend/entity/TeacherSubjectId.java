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

    @Column(name = "teacher_id", nullable = false)
    private String teacherId;

    @Column(name = "subject_id", nullable = false)
    private String subjectId;
}