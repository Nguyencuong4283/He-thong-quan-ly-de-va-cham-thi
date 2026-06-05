package com.se104.backend.config;

import com.se104.backend.entity.*;
import com.se104.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;
    private final ClazzRepository clazzRepository;
    private final QuestionRepository questionRepository;
    private final ExamRepository examRepository;
    private final StudentRepository studentRepository;
    private final StudentClassRepository studentClassRepository;
    private final SubmissionRepository submissionRepository;
    private final ExamQuestionRepository examQuestionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        // If classes already exist, we assume database is seeded
        if (clazzRepository.count() > 0) {
            return;
        }

        // Clean up tables to prevent foreign key or unique constraint issues
        submissionRepository.deleteAll();
        studentClassRepository.deleteAll();
        examQuestionRepository.deleteAll();
        clazzRepository.deleteAll();
        examRepository.deleteAll();
        questionRepository.deleteAll();
        teacherSubjectRepository.deleteAll();
        
        // 1. Seed Teacher
        Teacher teacher = teacherRepository.findById("GV001").orElse(null);
        if (teacher == null) {
            teacher = Teacher.builder()
                    .teacherId("GV001")
                    .fullName("TS. Nguyễn Văn X")
                    .email("dr.x@uit.edu.vn")
                    .academicRank("Tiến sĩ")
                    .department("Công nghệ phần mềm")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            teacherRepository.save(teacher);
        }

        // 2. Seed Subjects
        Subject subOS = subjectRepository.findById("IT007").orElse(null);
        if (subOS == null) {
            subOS = Subject.builder().subjectId("IT007").subjectName("Hệ điều hành").build();
            subjectRepository.save(subOS);
        }
        Subject subNet = subjectRepository.findById("IT005").orElse(null);
        if (subNet == null) {
            subNet = Subject.builder().subjectId("IT005").subjectName("Mạng máy tính").build();
            subjectRepository.save(subNet);
        }
        Subject subLaw = subjectRepository.findById("SS006").orElse(null);
        if (subLaw == null) {
            subLaw = Subject.builder().subjectId("SS006").subjectName("Pháp luật đại cương").build();
            subjectRepository.save(subLaw);
        }
        Subject subSE = subjectRepository.findById("SE104").orElse(null);
        if (subSE == null) {
            subSE = Subject.builder().subjectId("SE104").subjectName("Nhập môn CNPM").build();
            subjectRepository.save(subSE);
        }
        Subject subOOP = subjectRepository.findById("IT002").orElse(null);
        if (subOOP == null) {
            subOOP = Subject.builder().subjectId("IT002").subjectName("Thiết kế hướng đối tượng").build();
            subjectRepository.save(subOOP);
        }

        // 3. Assign Subjects to Teacher
        List<Subject> subjects = List.of(subOS, subNet, subLaw, subSE, subOOP);
        for (Subject sub : subjects) {
            TeacherSubjectId tsId = new TeacherSubjectId(teacher.getTeacherId(), sub.getSubjectId());
            if (!teacherSubjectRepository.existsById(tsId)) {
                TeacherSubject ts = new TeacherSubject();
                ts.setId(tsId);
                ts.setTeacher(teacher);
                ts.setSubject(sub);
                teacherSubjectRepository.save(ts);
            }
        }

        // 4. Seed Questions
        List<Question> questions = new ArrayList<>();
        
        // IT007 (OS) Questions
        questions.add(Question.builder().content("Mô tả giải thuật lập lịch CPU Round Robin (RR) và giải thích tham số time quantum.").answer("1. Định nghĩa RR: 4đ\n2. Ý nghĩa time quantum: 4đ\n3. Trình bày sạch sẽ: 2đ").difficulty("Trung bình").subject(subOS).build());
        questions.add(Question.builder().content("Định nghĩa deadlock và phân tích 4 điều kiện cần để xảy ra tình trạng deadlock.").answer("1. Định nghĩa deadlock: 3đ\n2. 4 điều kiện (Mutual exclusion, Hold and wait, No preemption, Circular wait): 6đ\n3. Trình bày sạch sẽ: 1đ").difficulty("Khó").subject(subOS).build());
        questions.add(Question.builder().content("Tiến trình (process) là gì? Phân biệt tiến trình và luồng (thread).").answer("1. Định nghĩa tiến trình: 3đ\n2. So sánh tiến trình vs luồng: 5đ\n3. Trình bày khoa học: 2đ").difficulty("Dễ").subject(subOS).build());

        // IT005 (Network) Questions
        questions.add(Question.builder().content("Trình bày chức năng của tầng Vật lý và tầng Giao vận trong mô hình OSI.").answer("1. Chức năng Physical: 4đ\n2. Chức năng Transport: 4đ\n3. Trình bày sạch sẽ: 2đ").difficulty("Trung bình").subject(subNet).build());
        questions.add(Question.builder().content("Phân biệt hai giao thức định tuyến tĩnh và định tuyến động.").answer("1. Định nghĩa định tuyến tĩnh: 4đ\n2. Định nghĩa định tuyến động: 4đ\n3. So sánh: 2đ").difficulty("Dễ").subject(subNet).build());
        questions.add(Question.builder().content("Giải thích cơ chế bắt tay 3 bước (three-way handshake) của giao thức TCP.").answer("1. Bước 1 (SYN): 3đ\n2. Bước 2 (SYN-ACK): 3đ\n3. Bước 3 (ACK): 4đ").difficulty("Khó").subject(subNet).build());

        // SS006 (Law) Questions
        questions.add(Question.builder().content("Nêu định nghĩa hiến pháp và phân tích vị trí tối cao của hiến pháp.").answer("1. Định nghĩa hiến pháp: 4đ\n2. Tính tối cao: 4đ\n3. Trình bày khoa học: 2đ").difficulty("Dễ").subject(subLaw).build());
        questions.add(Question.builder().content("Trình bày cơ cấu bộ máy nhà nước nước Cộng hòa xã hội chủ nghĩa Việt Nam.").answer("1. Các cơ quan lập pháp, hành pháp, tư pháp: 8đ\n2. Trình bày mạch lạc: 2đ").difficulty("Trung bình").subject(subLaw).build());

        // SE104 (Software Engineering) Questions
        questions.add(Question.builder().content("Trình bày mô hình phát triển phần mềm Thác nước (Waterfall) và ưu nhược điểm.").answer("1. Các giai đoạn Waterfall: 5đ\n2. Ưu và nhược điểm: 4đ\n3. Vẽ sơ đồ hoặc trình bày đẹp: 1đ").difficulty("Dễ").subject(subSE).build());
        questions.add(Question.builder().content("Phân biệt kiểm thử hộp đen (Black-box) và kiểm thử hộp trắng (White-box).").answer("1. Khái niệm hộp đen: 4đ\n2. Khái niệm hộp trắng: 4đ\n3. So sánh: 2đ").difficulty("Trung bình").subject(subSE).build());
        questions.add(Question.builder().content("Trình bày các nguyên lý thiết kế phần mềm SOLID.").answer("1. Giải thích từng chữ cái S, O, L, I, D: 8đ\n2. Ví dụ minh họa: 2đ").difficulty("Khó").subject(subSE).build());

        // IT002 (OOP Design) Questions
        questions.add(Question.builder().content("Trình bày 4 tính chất cơ bản của lập trình hướng đối tượng (OOP).").answer("1. Kế thừa, Đóng gói, Đa hình, Trừu tượng: 8đ\n2. Trình bày rõ ràng: 2đ").difficulty("Dễ").subject(subOOP).build());
        questions.add(Question.builder().content("Trình bày mẫu thiết kế Singleton và viết mã nguồn minh họa.").answer("1. Định nghĩa và mục đích Singleton: 4đ\n2. Mã nguồn minh họa: 4đ\n3. Trình bày sạch sẽ: 2đ").difficulty("Trung bình").subject(subOOP).build());

        for (Question q : questions) {
            questionRepository.save(q);
        }

        // 5. Seed Exams
        Exam examOS = Exam.builder().examCode("EX-IT007-2025-01").duration(90).semester("Fall 2025").year(2025).subject(subOS).teacher(teacher).build();
        Exam examNet = Exam.builder().examCode("EX-IT005-2025-01").duration(90).semester("Fall 2025").year(2025).subject(subNet).teacher(teacher).build();
        Exam examLaw = Exam.builder().examCode("EX-SS006-2025-01").duration(60).semester("Spring 2025").year(2025).subject(subLaw).teacher(teacher).build();
        Exam examSE = Exam.builder().examCode("EX-SE104-2025-01").duration(120).semester("Fall 2025").year(2025).subject(subSE).teacher(teacher).build();
        Exam examOOP = Exam.builder().examCode("EX-IT002-2024-01").duration(90).semester("Fall 2024").year(2024).subject(subOOP).teacher(teacher).build();

        examRepository.save(examOS);
        examRepository.save(examNet);
        examRepository.save(examLaw);
        examRepository.save(examSE);
        examRepository.save(examOOP);

        // Map questions to exams
        examQuestionRepository.save(new ExamQuestion(new ExamQuestionId(examOS.getExamId(), questions.get(0).getQuestionId()), examOS, questions.get(0), 1));
        examQuestionRepository.save(new ExamQuestion(new ExamQuestionId(examOS.getExamId(), questions.get(1).getQuestionId()), examOS, questions.get(1), 2));
        
        examQuestionRepository.save(new ExamQuestion(new ExamQuestionId(examNet.getExamId(), questions.get(3).getQuestionId()), examNet, questions.get(3), 1));
        examQuestionRepository.save(new ExamQuestion(new ExamQuestionId(examNet.getExamId(), questions.get(5).getQuestionId()), examNet, questions.get(5), 2));

        examQuestionRepository.save(new ExamQuestion(new ExamQuestionId(examLaw.getExamId(), questions.get(6).getQuestionId()), examLaw, questions.get(6), 1));
        examQuestionRepository.save(new ExamQuestion(new ExamQuestionId(examLaw.getExamId(), questions.get(7).getQuestionId()), examLaw, questions.get(7), 2));

        examQuestionRepository.save(new ExamQuestion(new ExamQuestionId(examSE.getExamId(), questions.get(8).getQuestionId()), examSE, questions.get(8), 1));
        examQuestionRepository.save(new ExamQuestion(new ExamQuestionId(examSE.getExamId(), questions.get(9).getQuestionId()), examSE, questions.get(9), 2));

        examQuestionRepository.save(new ExamQuestion(new ExamQuestionId(examOOP.getExamId(), questions.get(11).getQuestionId()), examOOP, questions.get(11), 1));
        examQuestionRepository.save(new ExamQuestion(new ExamQuestionId(examOOP.getExamId(), questions.get(12).getQuestionId()), examOOP, questions.get(12), 2));

        // 6. Seed Classes
        Clazz clsOS = Clazz.builder().classId("CLASS-001").name("IT007.N11").semester("Fall 2025").year(2025).totalStudent(5).subject(subOS).teacher(teacher).exam(examOS).build();
        Clazz clsNet = Clazz.builder().classId("CLASS-002").name("IT005.N12").semester("Fall 2025").year(2025).totalStudent(4).subject(subNet).teacher(teacher).exam(examNet).build();
        Clazz clsLaw = Clazz.builder().classId("CLASS-003").name("SS006.N13").semester("Spring 2025").year(2025).totalStudent(3).subject(subLaw).teacher(teacher).exam(examLaw).build();
        Clazz clsSE = Clazz.builder().classId("CLASS-004").name("SE104.N11").semester("Fall 2025").year(2025).totalStudent(6).subject(subSE).teacher(teacher).exam(examSE).build();
        Clazz clsOOP = Clazz.builder().classId("CLASS-005").name("IT002.N12").semester("Fall 2024").year(2024).totalStudent(4).subject(subOOP).teacher(teacher).exam(examOOP).build();

        clazzRepository.save(clsOS);
        clazzRepository.save(clsNet);
        clazzRepository.save(clsLaw);
        clazzRepository.save(clsSE);
        clazzRepository.save(clsOOP);

        // 7. Seed Students
        Student s1 = studentRepository.findById("SV001").orElse(null);
        if (s1 == null) {
            s1 = Student.builder().studentId("SV001").fullName("Nguyễn Văn A").email("sv001@uit.edu.vn").build();
            studentRepository.save(s1);
        }
        Student s2 = studentRepository.findById("SV002").orElse(null);
        if (s2 == null) {
            s2 = Student.builder().studentId("SV002").fullName("Trần Thị B").email("sv002@uit.edu.vn").build();
            studentRepository.save(s2);
        }
        Student s3 = studentRepository.findById("SV003").orElse(null);
        if (s3 == null) {
            s3 = Student.builder().studentId("SV003").fullName("Lê Văn C").email("sv003@uit.edu.vn").build();
            studentRepository.save(s3);
        }
        Student s4 = studentRepository.findById("SV004").orElse(null);
        if (s4 == null) {
            s4 = Student.builder().studentId("SV004").fullName("Phạm Thị D").email("sv004@uit.edu.vn").build();
            studentRepository.save(s4);
        }
        Student s5 = studentRepository.findById("SV005").orElse(null);
        if (s5 == null) {
            s5 = Student.builder().studentId("SV005").fullName("Hoàng Văn E").email("sv005@uit.edu.vn").build();
            studentRepository.save(s5);
        }
        Student s6 = studentRepository.findById("SV006").orElse(null);
        if (s6 == null) {
            s6 = Student.builder().studentId("SV006").fullName("Vũ Thị F").email("sv006@uit.edu.vn").build();
            studentRepository.save(s6);
        }

        // 8. Enroll Students in Classes
        List<Student> allStudents = List.of(s1, s2, s3, s4, s5, s6);
        
        // CLASS-001 (5 students: s1 - s5)
        for (int i = 0; i < 5; i++) {
            Student s = allStudents.get(i);
            studentClassRepository.save(new StudentClass(new StudentClassId(s.getStudentId(), clsOS.getClassId()), s, clsOS));
        }
        // CLASS-002 (4 students: s1 - s4)
        for (int i = 0; i < 4; i++) {
            Student s = allStudents.get(i);
            studentClassRepository.save(new StudentClass(new StudentClassId(s.getStudentId(), clsNet.getClassId()), s, clsNet));
        }
        // CLASS-003 (3 students: s1 - s3)
        for (int i = 0; i < 3; i++) {
            Student s = allStudents.get(i);
            studentClassRepository.save(new StudentClass(new StudentClassId(s.getStudentId(), clsLaw.getClassId()), s, clsLaw));
        }
        // CLASS-004 (6 students: s1 - s6)
        for (int i = 0; i < 6; i++) {
            Student s = allStudents.get(i);
            studentClassRepository.save(new StudentClass(new StudentClassId(s.getStudentId(), clsSE.getClassId()), s, clsSE));
        }
        // CLASS-005 (4 students: s1 - s4)
        for (int i = 0; i < 4; i++) {
            Student s = allStudents.get(i);
            studentClassRepository.save(new StudentClass(new StudentClassId(s.getStudentId(), clsOOP.getClassId()), s, clsOOP));
        }

        // 9. Seed Submissions
        // Class 001 (OS)
        submissionRepository.save(Submission.builder().score(8.5f).scoreText("Tám rưỡi").note("Bài làm tốt").status(true).student(s1).clazz(clsOS).exam(examOS).build());
        submissionRepository.save(Submission.builder().score(7.0f).scoreText("Bảy").note("Bài làm khá").status(true).student(s2).clazz(clsOS).exam(examOS).build());
        submissionRepository.save(Submission.builder().score(4.5f).scoreText("Bốn rưỡi").note("Cần cố gắng hơn").status(true).student(s3).clazz(clsOS).exam(examOS).build());
        submissionRepository.save(Submission.builder().score(9.0f).scoreText("Chín").note("Lập luận xuất sắc").status(true).student(s4).clazz(clsOS).exam(examOS).build());
        submissionRepository.save(Submission.builder().score(0.0f).scoreText("").note("").status(false).student(s5).clazz(clsOS).exam(examOS).build());

        // Class 002 (Net)
        submissionRepository.save(Submission.builder().score(6.5f).scoreText("Sáu rưỡi").note("Khá").status(true).student(s1).clazz(clsNet).exam(examNet).build());
        submissionRepository.save(Submission.builder().score(8.0f).scoreText("Tám").note("Tốt").status(true).student(s2).clazz(clsNet).exam(examNet).build());
        submissionRepository.save(Submission.builder().score(5.0f).scoreText("Năm").note("Trung bình").status(true).student(s3).clazz(clsNet).exam(examNet).build());
        submissionRepository.save(Submission.builder().score(0.0f).scoreText("").note("").status(false).student(s4).clazz(clsNet).exam(examNet).build());

        // Class 003 (Law)
        submissionRepository.save(Submission.builder().score(9.5f).scoreText("Chín rưỡi").note("Xuất sắc").status(true).student(s1).clazz(clsLaw).exam(examLaw).build());
        submissionRepository.save(Submission.builder().score(8.5f).scoreText("Tám rưỡi").note("Tốt").status(true).student(s2).clazz(clsLaw).exam(examLaw).build());
        submissionRepository.save(Submission.builder().score(0.0f).scoreText("").note("").status(false).student(s3).clazz(clsLaw).exam(examLaw).build());

        // Class 004 (SE)
        submissionRepository.save(Submission.builder().score(7.5f).scoreText("Bảy rưỡi").note("Tốt").status(true).student(s1).clazz(clsSE).exam(examSE).build());
        submissionRepository.save(Submission.builder().score(6.0f).scoreText("Sáu").note("Khá").status(true).student(s2).clazz(clsSE).exam(examSE).build());
        submissionRepository.save(Submission.builder().score(8.5f).scoreText("Tám rưỡi").note("Xuất sắc").status(true).student(s3).clazz(clsSE).exam(examSE).build());
        submissionRepository.save(Submission.builder().score(9.0f).scoreText("Chín").note("Lập luận vững vàng").status(true).student(s4).clazz(clsSE).exam(examSE).build());
        submissionRepository.save(Submission.builder().score(4.0f).scoreText("Bốn").note("Cần ôn tập kỹ").status(true).student(s5).clazz(clsSE).exam(examSE).build());
        submissionRepository.save(Submission.builder().score(0.0f).scoreText("").note("").status(false).student(s6).clazz(clsSE).exam(examSE).build());

        // Class 005 (OOP Design)
        submissionRepository.save(Submission.builder().score(8.0f).scoreText("Tám").note("Tốt").status(true).student(s1).clazz(clsOOP).exam(examOOP).build());
        submissionRepository.save(Submission.builder().score(7.5f).scoreText("Bảy rưỡi").note("Khá tốt").status(true).student(s2).clazz(clsOOP).exam(examOOP).build());
        submissionRepository.save(Submission.builder().score(9.0f).scoreText("Chín").note("Rất tốt").status(true).student(s3).clazz(clsOOP).exam(examOOP).build());
        submissionRepository.save(Submission.builder().score(0.0f).scoreText("").note("").status(false).student(s4).clazz(clsOOP).exam(examOOP).build());

    }
}