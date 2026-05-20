package com.se104.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "CLASS")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Clazz {

    @Id
    @Column(name = "class_id", nullable = false)
    private String classId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "semester", nullable = false)
    private String semester;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name="total_student",nullable = true)
    private Integer totalStudent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="teacher_id", nullable = false)
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="exam_id")
    private Exam exam;

    @OneToMany(mappedBy = "clazz", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StudentClass> studentClasses=new ArrayList<>();
}
