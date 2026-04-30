package com.se104.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "exam_question")
public class ExamQuestion {
    @EmbeddedId
    private ExamQuestionId examQuestionId = new ExamQuestionId();

    @ManyToOne
    @MapsId("examId")
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @ManyToOne
    @MapsId("questionId")
    @JoinColumn(name = "question_id")
    private Question question;

    private Float points;

    public ExamQuestion() {
    }

    public ExamQuestionId getExamQuestionId() { return examQuestionId; }
    public void setExamQuestionId(ExamQuestionId examQuestionId) { this.examQuestionId = examQuestionId; }

    public Exam getExam() { return exam; }
    public void setExam(Exam exam) { this.exam = exam; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public Float getPoints() { return points; }
    public void setPoints(Float points) { this.points = points; }
}
