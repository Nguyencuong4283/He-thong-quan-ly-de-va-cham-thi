package com.se104.backend.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "exam")
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="exam_id")
    private Long examId;

    private String title;
    private String subject;
    private String semester;
    private Integer year;
    private Integer duration;
    private String status;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @OneToMany(mappedBy = "exam")
    private List<ExamQuestion> examQuestions;

    @OneToMany(mappedBy = "exam")
    private List<Submission> submissions;

    public Exam() {
    }

    public Long getExamId() {
        return examId;
    }

    public String getTitle() {
        return title;
    }

    public String getSubject() {
        return subject;
    }

    public String getSemester() {
        return semester;
    }

    public Integer getYear() {
        return year;
    }

    public Integer getDuration() {
        return duration;
    }

    public String getStatus() {
        return status;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public List<ExamQuestion> getExamQuestions() {
        return examQuestions;
    }

    public void setExamQuestions(List<ExamQuestion> examQuestions) {
        this.examQuestions = examQuestions;
    }

    public void setSubmissions(List<Submission> submissions) {
        this.submissions = submissions;
    }

    public List<Submission> getSubmissions() {
        return submissions;
    }
}