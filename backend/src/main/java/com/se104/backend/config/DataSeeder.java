package com.se104.backend.config;

import com.se104.backend.entity.Subject;
import com.se104.backend.entity.Teacher;
import com.se104.backend.entity.TeacherSubject;
import com.se104.backend.entity.TeacherSubjectId;
import com.se104.backend.repository.SubjectRepository;
import com.se104.backend.repository.TeacherRepository;
import com.se104.backend.repository.TeacherSubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (teacherRepository.existsById("GV001")) return;

        Teacher teacher = Teacher.builder()
                .teacherId("GV001")
                .fullName("Nguyen Van A")
                .password(passwordEncoder.encode("123456"))
                .build();

        teacherRepository.save(teacher);

        Subject subject = Subject.builder()
                .subjectId("SE104")
                .subjectName("Nhap mon CNPM")
                .build();

        subjectRepository.save(subject);

        TeacherSubject ts = new TeacherSubject();

        TeacherSubjectId id = new TeacherSubjectId();
        id.setTeacherId("GV001");
        id.setSubjectId("SE104");

        ts.setId(id);
        ts.setTeacher(teacher);
        ts.setSubject(subject);

        teacherSubjectRepository.save(ts);
    }
}