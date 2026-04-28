package Entity;

import jakarta.persistence.*;

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
    private Classroom classRoom;
}