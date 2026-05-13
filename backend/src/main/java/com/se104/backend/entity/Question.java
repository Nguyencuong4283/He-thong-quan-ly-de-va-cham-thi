package com.se104.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "QUESTION")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    // Lời giải / đáp án tham khảo để giảng viên đối chiếu khi chấm thi
    @Column(name = "answer", nullable = false, columnDefinition = "TEXT")
    private String answer;

    @Column(name = "difficulty", nullable = false)
    private String difficulty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;
}