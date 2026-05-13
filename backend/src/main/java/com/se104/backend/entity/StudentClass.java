package com.se104.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "STUDENT_CLASS")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentClass {

    @EmbeddedId
    private StudentClassId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("classId")
    @JoinColumn(name = "class_id")
    private Clazz clazz;
}