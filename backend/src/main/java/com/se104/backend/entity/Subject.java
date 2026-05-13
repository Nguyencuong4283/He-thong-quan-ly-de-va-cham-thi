package com.se104.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "SUBJECT")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subject {

    @Id
    @Column(name = "subject_id", nullable = false)
    private String subjectId;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;
}