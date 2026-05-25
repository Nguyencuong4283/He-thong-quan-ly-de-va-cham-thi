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
	//Day la noi dung code tao nguoi dung va mon hoc

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

        Subject subject2 = Subject.builder()
                .subjectId("SE101")
                .subjectName("Phuong phap mo hinh hoa")
                .build();
        subjectRepository.save(subject2);

        Subject subject3 = Subject.builder()
                .subjectId("IT001")
                .subjectName("Nhap mon lap trinh")
                .build();
        subjectRepository.save(subject3);


        TeacherSubject ts = new TeacherSubject();

        TeacherSubjectId id = new TeacherSubjectId();
        id.setTeacherId("GV001");
        id.setSubjectId("SE104");

        ts.setId(id);
        ts.setTeacher(teacher);
        ts.setSubject(subject);

        teacherSubjectRepository.save(ts);

        TeacherSubject ts2 = new TeacherSubject();
        TeacherSubjectId id2 = new TeacherSubjectId();
        id2.setTeacherId("GV001");
        id2.setSubjectId("SE101");
        ts2.setId(id2);
        ts2.setTeacher(teacher);
        ts2.setSubject(subject2);
        teacherSubjectRepository.save(ts2);

        TeacherSubject ts3 = new TeacherSubject();
        TeacherSubjectId id3 = new TeacherSubjectId();
        id3.setTeacherId("GV001");
        id3.setSubjectId("IT001");
        ts3.setId(id3);
        ts3.setTeacher(teacher);
        ts3.setSubject(subject3);
        teacherSubjectRepository.save(ts3);

    }
}