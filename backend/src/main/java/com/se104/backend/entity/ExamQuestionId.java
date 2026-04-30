package com.se104.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ExamQuestionId implements Serializable {
    @Column(name ="exam_id")
    private Long examId;

    @Column(name = "question_id")
    private Long questionId;

    @Override
    public int hashCode(){
        return Objects.hash(examId, questionId);
    }

    @Override
    public boolean equals(Object o){
        if(this == o) return true;
        if(!(o instanceof ExamQuestionId)) return false;
        ExamQuestionId that = (ExamQuestionId)o;

        return Objects.equals(this.examId,that.examId)
                && Objects.equals(this.questionId,that.questionId);
    }
}
