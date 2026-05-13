package com.se104.backend.entity;

import jakarta.persistence.*;
import lombok.*;

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
}
