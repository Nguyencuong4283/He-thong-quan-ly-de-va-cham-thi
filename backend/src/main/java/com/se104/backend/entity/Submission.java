package com.se104.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "submission")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="submission_id")
    private Long submissionId;

    @Column(columnDefinition = "TEXT")
    private String answers;

    private Float score;
    private String status;
    private LocalDateTime submitted_at;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    public Submission() {
    }

    public void setSubmissionId(Long submissionId) {
        this.submissionId = submissionId;
    }

    public void setAnswers(String answers) {
        this.answers = answers;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setSubmitted_at(LocalDateTime submitted_at) {
        this.submitted_at = submitted_at;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public Long getSubmissionId() {
        return submissionId;
    }

    public String getAnswers() {
        return answers;
    }

    public Float getScore() {
        return score;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getSubmitted_at() {
        return submitted_at;
    }

    public Student getStudent() {
        return student;
    }

    public Exam getExam() {
        return exam;
    }
}
