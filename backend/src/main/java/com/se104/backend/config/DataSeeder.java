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
        //Them 1 giang vien nua
        // ===== Tạo thêm môn học =====
        Subject subject4 = Subject.builder()
                .subjectId("SS001")
                .subjectName("Triết học Mác - Lênin")
                .build();

        Subject subject5 = Subject.builder()
                .subjectId("SS008")
                .subjectName("Kinh tế Chính trị Mác - Lênin")
                .build();

        subjectRepository.save(subject4);
        subjectRepository.save(subject5);

// ===== Tạo giảng viên GV002 =====
        Teacher teacher2 = Teacher.builder()
                .teacherId("GV002")
                .fullName("Tran Thi B")
                .password(passwordEncoder.encode("123456"))
                .build();

        teacherRepository.save(teacher2);

// ===== GV002 dạy SS001 =====
        TeacherSubject ts4 = new TeacherSubject();
        TeacherSubjectId id4 = new TeacherSubjectId();
        id4.setTeacherId("GV002");
        id4.setSubjectId("SS001");

        ts4.setId(id4);
        ts4.setTeacher(teacher2);
        ts4.setSubject(subject4);

        teacherSubjectRepository.save(ts4);

// ===== GV002 dạy SS008 =====
        TeacherSubject ts5 = new TeacherSubject();
        TeacherSubjectId id5 = new TeacherSubjectId();
        id5.setTeacherId("GV002");
        id5.setSubjectId("SS008");

        ts5.setId(id5);
        ts5.setTeacher(teacher2);
        ts5.setSubject(subject5);

        teacherSubjectRepository.save(ts5);

// ===== GV002 dạy thêm môn SE104 =====
        TeacherSubject ts6 = new TeacherSubject();
        TeacherSubjectId id6 = new TeacherSubjectId();
        id6.setTeacherId("GV002");
        id6.setSubjectId("SE104");

        ts6.setId(id6);
        ts6.setTeacher(teacher2);
        ts6.setSubject(subject);

        teacherSubjectRepository.save(ts6);
    }
}