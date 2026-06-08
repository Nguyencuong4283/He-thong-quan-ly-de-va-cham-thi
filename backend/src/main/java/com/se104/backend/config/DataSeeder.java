package com.se104.backend.config;
 
import com.se104.backend.entity.*;
import com.se104.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
 
import java.util.List;
import java.util.ArrayList;
 
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
 
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClazzRepository clazzRepository;
    private final StudentRepository studentRepository;
    private final StudentClassRepository studentClassRepository;
    private final QuestionRepository questionRepository;
    private final ExamRepository examRepository;
    private final ExamQuestionRepository examQuestionRepository;
    private final SubmissionRepository submissionRepository;
 
    @Override
    public void run(String... args) {
        // ===== 1. SEED TEACHERS & SUBJECTS =====
        Teacher teacher1 = null;
        if (!teacherRepository.existsById("GV001")) {
            teacher1 = Teacher.builder()
                    .teacherId("GV001")
                    .fullName("Nguyen Van A")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            teacherRepository.save(teacher1);
        } else {
            teacher1 = teacherRepository.findById("GV001").orElse(null);
        }
 
        Teacher teacher2 = null;
        if (!teacherRepository.existsById("GV002")) {
            teacher2 = Teacher.builder()
                    .teacherId("GV002")
                    .fullName("Tran Thi B")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            teacherRepository.save(teacher2);
        } else {
            teacher2 = teacherRepository.findById("GV002").orElse(null);
        }
 
        Teacher teacher3 = null;
        if (!teacherRepository.existsById("GV003")) {
            teacher3 = Teacher.builder()
                    .teacherId("GV003")
                    .fullName("Le Hoang C")
                    .password(passwordEncoder.encode("123456"))
                    .build();
            teacherRepository.save(teacher3);
        } else {
            teacher3 = teacherRepository.findById("GV003").orElse(null);
        }
 
        Subject subjectSe104 = null;
        if (!subjectRepository.existsById("SE104")) {
            subjectSe104 = Subject.builder()
                    .subjectId("SE104")
                    .subjectName("Nhap mon CNPM")
                    .build();
            subjectRepository.save(subjectSe104);
        } else {
            subjectSe104 = subjectRepository.findById("SE104").orElse(null);
        }
 
        Subject subjectSe101 = null;
        if (!subjectRepository.existsById("SE101")) {
            subjectSe101 = Subject.builder()
                    .subjectId("SE101")
                    .subjectName("Phuong phap mo hinh hoa")
                    .build();
            subjectRepository.save(subjectSe101);
        } else {
            subjectSe101 = subjectRepository.findById("SE101").orElse(null);
        }
 
        Subject subjectIt001 = null;
        if (!subjectRepository.existsById("IT001")) {
            subjectIt001 = Subject.builder()
                    .subjectId("IT001")
                    .subjectName("Nhap mon lap trinh")
                    .build();
            subjectRepository.save(subjectIt001);
        } else {
            subjectIt001 = subjectRepository.findById("IT001").orElse(null);
        }
 
        Subject subjectSs001 = null;
        if (!subjectRepository.existsById("SS001")) {
            subjectSs001 = Subject.builder()
                    .subjectId("SS001")
                    .subjectName("Triết học Mác - Lênin")
                    .build();
            subjectRepository.save(subjectSs001);
        } else {
            subjectSs001 = subjectRepository.findById("SS001").orElse(null);
        }
 
        Subject subjectSs008 = null;
        if (!subjectRepository.existsById("SS008")) {
            subjectSs008 = Subject.builder()
                    .subjectId("SS008")
                    .subjectName("Kinh tế Chính trị Mác - Lênin")
                    .build();
            subjectRepository.save(subjectSs008);
        } else {
            subjectSs008 = subjectRepository.findById("SS008").orElse(null);
        }
 
        // ===== 2. SEED TEACHER-SUBJECT LINKS =====
        seedTeacherSubject("GV001", "SE104", teacher1, subjectSe104);
        seedTeacherSubject("GV001", "SE101", teacher1, subjectSe101);
        seedTeacherSubject("GV001", "IT001", teacher1, subjectIt001);
        seedTeacherSubject("GV002", "SS001", teacher2, subjectSs001);
        seedTeacherSubject("GV002", "SS008", teacher2, subjectSs008);
        seedTeacherSubject("GV002", "SE104", teacher2, subjectSe104);
        seedTeacherSubject("GV003", "IT001", teacher3, subjectIt001);
        seedTeacherSubject("GV003", "SE104", teacher3, subjectSe104);
 
        // ===== 3. SEED STUDENTS =====
        List<Student> students = new ArrayList<>();
        String[][] studentData = {
            {"SV001", "Nguyen Van An", "an.nv@student.edu.vn"},
            {"SV002", "Tran Thi Binh", "binh.tt@student.edu.vn"},
            {"SV003", "Le Van Cuong", "cuong.lv@student.edu.vn"},
            {"SV004", "Pham Thi Dung", "dung.pt@student.edu.vn"},
            {"SV005", "Hoang Van Em", "em.hv@student.edu.vn"}
        };
        for (String[] data : studentData) {
            if (!studentRepository.existsById(data[0])) {
                Student s = Student.builder()
                        .studentId(data[0])
                        .fullName(data[1])
                        .email(data[2])
                        .build();
                studentRepository.save(s);
                students.add(s);
            } else {
                students.add(studentRepository.findById(data[0]).orElse(null));
            }
        }
 
        // ===== 4. SEED QUESTIONS =====
        List<Question> questionsSe104 = new ArrayList<>();
        if (questionRepository.count() == 0) {
            String[][] questionsData = {
                {"Mô hình Waterfall là gì và khi nào nên áp dụng nó?", "Mô hình Waterfall là mô hình tuần tự tuyến tính chia làm các giai đoạn rõ ràng: Phân tích -> Thiết kế -> Code -> Test -> Vận hành. Nên áp dụng khi yêu cầu dự án rất rõ ràng ngay từ đầu và không thay đổi.", "Dễ"},
                {"Phân biệt giữa kiểm thử hộp đen (Black-box testing) và kiểm thử hộp trắng (White-box testing)?", "Kiểm thử hộp đen chỉ tập trung vào đầu vào/đầu ra chức năng của hệ thống mà không quan tâm code bên trong. Kiểm thử hộp trắng đi sâu vào kiểm tra cấu trúc code, vòng lặp, nhánh rẽ của chương trình.", "Trung bình"},
                {"Giải thích các khái niệm Coupling (Độ liên kết) và Cohesion (Độ kết dính) trong thiết kế phần mềm?", "Cohesion đo lường mức độ tập trung chức năng của một module (mong muốn High Cohesion). Coupling đo lường sự phụ thuộc lẫn nhau giữa các module (mong muốn Low Coupling).", "Khó"},
                {"Quy trình phát triển phần mềm theo mô hình Agile có đặc điểm gì?", "Chia nhỏ dự án thành các chu kỳ ngắn (Sprints, thường từ 2-4 tuần). Tập trung vào sự phản hồi từ khách hàng và khả năng thích ứng linh hoạt trước sự thay đổi yêu cầu.", "Trung bình"}
            };
            for (String[] qData : questionsData) {
                Question q = Question.builder()
                        .content(qData[0])
                        .answer(qData[1])
                        .difficulty(qData[2])
                        .subject(subjectSe104)
                        .build();
                questionRepository.save(q);
                questionsSe104.add(q);
            }
        } else {
            questionsSe104 = questionRepository.findAll();
        }
 
        // ===== 5. SEED EXAMS =====
        Exam exam1 = null;
        if (examRepository.count() == 0) {
            exam1 = Exam.builder()
                    .examCode("GK_SE104")
                    .semester("1")
                    .year(2026)
                    .duration(90)
                    .subject(subjectSe104)
                    .teacher(teacher1)
                    .build();
            examRepository.save(exam1);
 
            // Link questions to Exam
            int order = 1;
            for (Question q : questionsSe104) {
                ExamQuestionId eqId = new ExamQuestionId(exam1.getExamId(), q.getQuestionId());
                ExamQuestion eq = ExamQuestion.builder()
                        .id(eqId)
                        .exam(exam1)
                        .question(q)
                        .questionOrder(order++)
                        .build();
                examQuestionRepository.save(eq);
            }
        } else {
            exam1 = examRepository.findAll().get(0);
        }
 
        // ===== 6. SEED CLASSES =====
        Clazz class1 = null;
        if (!clazzRepository.existsById("LH001")) {
            class1 = Clazz.builder()
                    .classId("LH001")
                    .name("Nhập môn CNPM - Nhóm 1")
                    .semester("1")
                    .year(2026)
                    .totalStudent(5)
                    .subject(subjectSe104)
                    .teacher(teacher1)
                    .exam(exam1)
                    .build();
            clazzRepository.save(class1);
        } else {
            class1 = clazzRepository.findById("LH001").orElse(null);
        }
 
        Clazz class2 = null;
        if (!clazzRepository.existsById("LH002")) {
            class2 = Clazz.builder()
                    .classId("LH002")
                    .name("Phương pháp mô hình hóa - Nhóm 1")
                    .semester("1")
                    .year(2026)
                    .totalStudent(3)
                    .subject(subjectSe101)
                    .teacher(teacher1)
                    .build();
            clazzRepository.save(class2);
        } else {
            class2 = clazzRepository.findById("LH002").orElse(null);
        }
 
        // ===== 7. SEED STUDENT-CLASS LINKS =====
        if (studentClassRepository.count() == 0) {
            // Add all 5 students to class1 (LH001)
            for (Student s : students) {
                if (s != null && class1 != null) {
                    StudentClassId scId = new StudentClassId(s.getStudentId(), class1.getClassId());
                    StudentClass sc = StudentClass.builder()
                            .id(scId)
                            .student(s)
                            .clazz(class1)
                            .build();
                    studentClassRepository.save(sc);
                }
            }
            // Add first 3 students to class2 (LH002)
            for (int i = 0; i < 3; i++) {
                Student s = students.get(i);
                if (s != null && class2 != null) {
                    StudentClassId scId = new StudentClassId(s.getStudentId(), class2.getClassId());
                    StudentClass sc = StudentClass.builder()
                            .id(scId)
                            .student(s)
                            .clazz(class2)
                            .build();
                    studentClassRepository.save(sc);
                }
            }
        }
 
        // ===== 8. SEED SUBMISSIONS =====
        if (submissionRepository.count() == 0 && class1 != null && exam1 != null) {
            Object[][] subData = {
                {students.get(0), 8.5f, "Tám phẩy năm", "Bài làm tốt, trình bày rõ ràng.", true},
                {students.get(1), 5.0f, "Năm phẩy không", "Bài làm trung bình, cần chú ý lý thuyết hơn.", true},
                {students.get(2), 9.5f, "Chín phẩy năm", "Bài làm rất xuất sắc, lập luận chặt chẽ.", true},
                {students.get(3), 3.0f, "Ba phẩy không", "Thiếu nhiều ý chính, bài làm quá ngắn.", true},
                {students.get(4), 0.0f, "Chưa chấm", "Đang chờ giảng viên chấm điểm tự luận.", false}
            };
            for (Object[] sData : subData) {
                Student student = (Student) sData[0];
                if (student != null) {
                    Submission sub = Submission.builder()
                            .student(student)
                            .clazz(class1)
                            .exam(exam1)
                            .score((Float) sData[1])
                            .scoreText((String) sData[2])
                            .note((String) sData[3])
                            .status((Boolean) sData[4])
                            .build();
                    submissionRepository.save(sub);
                }
            }
        }
    }
 
    private void seedTeacherSubject(String teacherId, String subjectId, Teacher teacher, Subject subject) {
        TeacherSubjectId id = new TeacherSubjectId(teacherId, subjectId);
        if (!teacherSubjectRepository.existsById(id) && teacher != null && subject != null) {
            TeacherSubject ts = new TeacherSubject(id, teacher, subject);
            teacherSubjectRepository.save(ts);
        }
    }
}