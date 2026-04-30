package com.se104.backend.entity;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    private String mssv;
    private String name;
    private String email;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Classroom classroom;

    @OneToMany(mappedBy = "student")
    private List<Submission> submissions;

    public Student() {
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public void setMssv(String mssv) {
        this.mssv = mssv;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setClassRoom(Classroom classroom) {
        this.classroom = classroom;
    }

    public Long getStudentId() {
        return studentId;
    }

    public String getMssv() {
        return mssv;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public Classroom getClassRoom() {
        return classroom;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }

    public List<Submission> getSubmissions() {
        return submissions;
    }

    public void setSubmissions(List<Submission> submissions) {
        this.submissions = submissions;
    }
}