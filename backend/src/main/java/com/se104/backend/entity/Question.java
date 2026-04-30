package com.se104.backend.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;

    @Column(columnDefinition = "TEXT")
    private String content;
    private String type;
    private String difficulty;
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String answers;

    @Column(name ="correct_answer", columnDefinition = "TEXT")
    private String correctAnswer;

    @OneToMany(mappedBy = "question")
    private List<ExamQuestion> examQuestions;

    public Question() {
    }

    public Long getQuestionId() {
        return questionId;
    }

    public String getContent() {
        return content;
    }

    public String getType() {
        return type;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getSubject() {
        return subject;
    }

    public String getAnswers() {
        return answers;
    }

    public String getCorrect_answer() {
        return correctAnswer;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setAnswers(String answers) {
        this.answers = answers;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public List<ExamQuestion> getExamQuestions() {
        return examQuestions;
    }

    public void setExamQuestions(List<ExamQuestion> examQuestions) {
        this.examQuestions = examQuestions;
    }
}
