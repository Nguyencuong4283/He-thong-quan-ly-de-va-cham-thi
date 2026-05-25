package com.se104.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamQuestionId implements Serializable {

    @Column(nullable = false)
    private Integer examId;

    @Column(nullable = false)
    private Integer questionId;
}