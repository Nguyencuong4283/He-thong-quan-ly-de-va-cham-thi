package com.se104.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "EXAM")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exam {

    @Id
    @Column(name = "exam_id", nullable = false)
    private String examId;

    @Column(name = "semester")
    private String semester;

    @Column(name = "year")
    private Integer year;

    // CHECK: duration BETWEEN 30 AND 180  (enforce ở tầng app)
    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Column(name = "exam_date")
    private LocalDate examDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;
}