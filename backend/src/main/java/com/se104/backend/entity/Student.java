package com.se104.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "STUDENT")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @Column(name = "student_id", nullable = false)
    private String studentId;

    @Column(name = "full_name", nullable = false)
    private String fullName;
}