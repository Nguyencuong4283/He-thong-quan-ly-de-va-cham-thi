package com.se104.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TEACHER_SUBJECT")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherSubject {

    @EmbeddedId
    private TeacherSubjectId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("teacherId")
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("subjectId")
    @JoinColumn(name = "subject_id")
    private Subject subject;
}
