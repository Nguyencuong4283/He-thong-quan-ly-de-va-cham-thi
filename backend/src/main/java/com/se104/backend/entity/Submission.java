package com.se104.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "SUBMISSION")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "submission_id")
    private Integer submissionId;

    // CHECK: score BETWEEN 0 AND 10  (enforce ở tầng app)
    @Column(name = "score", nullable = false)
    private Float score;

    @Column(name = "score_text")
    private String scoreText;

    @Column(name = "note")
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    private Clazz clazz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;
}