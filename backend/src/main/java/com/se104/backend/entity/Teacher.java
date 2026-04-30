package com.se104.backend.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "teacher")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private Integer teacherId;

    @Column(nullable = false)
    private String name;

    @Column
    private String department;

    @Column
    @OneToMany(mappedBy = "teacher")
    private List<Exam> exams;

    @Column
    @OneToMany(mappedBy = "teacher")
    private List<Classroom> classrooms;

    public Teacher() {
    }

    public Integer getTeacherId() {
        return teacherId;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<Classroom> getClassrooms() {
        return classrooms;
    }

    public List<Exam> getExams() {
        return exams;
    }

    public void setExams(List<Exam> exams) {
        this.exams = exams;
    }

    public void setClassrooms(List<Classroom> classrooms) {
        this.classrooms = classrooms;
    }
}
