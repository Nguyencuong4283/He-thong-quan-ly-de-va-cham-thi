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
        // ===== 0. SEED ADMIN =====
        if (!teacherRepository.existsById("admin")) {
            Teacher admin = Teacher.builder()
                    .teacherId("admin")
                    .fullName("Hệ thống Admin")
                    .password(passwordEncoder.encode("admin123"))
                    .build();
            teacherRepository.save(admin);
        }

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

        Subject subjectIt002 = null;
        if (!subjectRepository.existsById("IT002")) {
            subjectIt002 = Subject.builder()
                    .subjectId("IT002")
                    .subjectName("Lập trình hướng đối tượng")
                    .build();
            subjectRepository.save(subjectIt002);
            questionRepository.save(Question.builder().content("Trình bày khái niệm Tính đóng gói (Encapsulation) trong OOP và cho ví dụ?").answer("Tính đóng gói là việc che giấu thông tin chi tiết của đối tượng, chỉ cung cấp các phương thức public để truy cập. Ví dụ sử dụng private fields và public getter/setter.").difficulty("Dễ").subject(subjectIt002).build());
            questionRepository.save(Question.builder().content("Phân biệt Class và Object trong lập trình hướng đối tượng?").answer("Class là khuôn mẫu thiết kế (blueprint) định nghĩa các thuộc tính và phương thức. Object là một thực thể cụ thể (instance) được tạo ra từ Class.").difficulty("Dễ").subject(subjectIt002).build());
            questionRepository.save(Question.builder().content("Giải thích khái niệm Đa hình (Polymorphism) và sự khác biệt giữa Overloading và Overriding?").answer("Đa hình cho phép một đối tượng đóng vai trò dưới nhiều hình thức khác nhau. Overloading xảy ra trong cùng một Class (nhiều phương thức cùng tên khác tham số). Overriding xảy ra giữa Class cha và Class con (phương thức ở Class con ghi đè phương thức Class cha cùng tên và tham số).").difficulty("Trung bình").subject(subjectIt002).build());
        } else {
            subjectIt002 = subjectRepository.findById("IT002").orElse(null);
        }

        Subject subjectIt003 = null;
        if (!subjectRepository.existsById("IT003")) {
            subjectIt003 = Subject.builder()
                    .subjectId("IT003")
                    .subjectName("Cấu trúc dữ liệu và giải thuật")
                    .build();
            subjectRepository.save(subjectIt003);
            questionRepository.save(Question.builder().content("Độ phức tạp thời gian (Time Complexity) của thuật toán sắp xếp nhanh (Quick Sort) trong trường hợp tốt nhất và tệ nhất là bao nhiêu?").answer("Tốt nhất là O(n log n) khi phân hoạch đều ở mỗi bước. Tệ nhất là O(n^2) khi mảng đã được sắp xếp tăng/giảm dần và chọn phần tử chốt đầu/cuối.").difficulty("Trung bình").subject(subjectIt003).build());
            questionRepository.save(Question.builder().content("Trình bày sự khác biệt cơ bản giữa cấu trúc dữ liệu Stack (Ngăn xếp) và Queue (Hàng đợi)?").answer("Stack hoạt động theo cơ chế LIFO (Last In First Out - Vào sau ra trước), hỗ trợ thao tác push/pop. Queue hoạt động theo cơ chế FIFO (First In First Out - Vào trước ra trước), hỗ trợ thao tác enqueue/dequeue.").difficulty("Dễ").subject(subjectIt003).build());
            questionRepository.save(Question.builder().content("Giải thuật duyệt đồ thị theo chiều rộng (BFS) sử dụng cấu trúc dữ liệu bổ trợ nào?").answer("Sử dụng cấu trúc dữ liệu Hàng đợi (Queue) để lưu trữ các đỉnh kề chuẩn bị duyệt.").difficulty("Dễ").subject(subjectIt003).build());
        } else {
            subjectIt003 = subjectRepository.findById("IT003").orElse(null);
        }

        Subject subjectIt004 = null;
        if (!subjectRepository.existsById("IT004")) {
            subjectIt004 = Subject.builder()
                    .subjectId("IT004")
                    .subjectName("Cơ sở dữ liệu")
                    .build();
            subjectRepository.save(subjectIt004);
            questionRepository.save(Question.builder().content("Phân biệt giữa khóa chính (Primary Key) và khóa ngoại (Foreign Key) trong RDBMS?").answer("Khóa chính dùng để định danh duy nhất một bản ghi trong bảng, không được phép rỗng. Khóa ngoại là một trường trong bảng liên kết đến khóa chính của bảng khác nhằm ràng buộc dữ liệu.").difficulty("Dễ").subject(subjectIt004).build());
            questionRepository.save(Question.builder().content("Trình bày các mức chuẩn hóa dữ liệu 1NF, 2NF và 3NF trong thiết kế cơ sở dữ liệu?").answer("1NF: Các thuộc tính đều là thuộc tính đơn. 2NF: Đạt 1NF và mọi thuộc tính phi khóa phải phụ thuộc hàm đầy đủ vào khóa chính. 3NF: Đạt 2NF và không có thuộc tính phi khóa nào phụ thuộc bắc cầu vào khóa chính.").difficulty("Trung bình").subject(subjectIt004).build());
            questionRepository.save(Question.builder().content("Mục đích của việc sử dụng Transaction trong hệ quản trị cơ sở dữ liệu là gì?").answer("Đảm bảo tính nhất quán và toàn vẹn dữ liệu khi thực hiện một nhóm các thao tác cơ sở dữ liệu thông qua tính chất ACID (Atomicity, Consistency, Isolation, Durability).").difficulty("Khó").subject(subjectIt004).build());
        } else {
            subjectIt004 = subjectRepository.findById("IT004").orElse(null);
        }

        Subject subjectIt005 = null;
        if (!subjectRepository.existsById("IT005")) {
            subjectIt005 = Subject.builder()
                    .subjectId("IT005")
                    .subjectName("Mạng máy tính")
                    .build();
            subjectRepository.save(subjectIt005);
            questionRepository.save(Question.builder().content("Mô hình OSI gồm có mấy tầng? Kể tên các tầng theo thứ tự từ thấp đến cao?").answer("Gồm 7 tầng: Vật lý (Physical), Liên kết dữ liệu (Data Link), Mạng (Network), Giao vận (Transport), Phiên (Session), Trình diễn (Presentation), Ứng dụng (Application).").difficulty("Dễ").subject(subjectIt005).build());
            questionRepository.save(Question.builder().content("Phân biệt giao thức TCP và UDP?").answer("TCP hướng kết nối, truyền dữ liệu tin cậy, truyền tuần tự và có kiểm soát luồng. UDP không hướng kết nối, truyền dữ liệu nhanh, tốn ít băng thông hơn nhưng không đảm bảo tin cậy.").difficulty("Trung bình").subject(subjectIt005).build());
        } else {
            subjectIt005 = subjectRepository.findById("IT005").orElse(null);
        }

        Subject subjectSe114 = null;
        if (!subjectRepository.existsById("SE114")) {
            subjectSe114 = Subject.builder()
                    .subjectId("SE114")
                    .subjectName("Thiết kế phần mềm")
                    .build();
            subjectRepository.save(subjectSe114);
            questionRepository.save(Question.builder().content("Design Pattern là gì? Kể tên 3 nhóm chính của Design Pattern?").answer("Design Pattern là các giải pháp mẫu cho các vấn đề phổ biến trong thiết kế phần mềm. 3 nhóm chính: Creational (Khởi tạo), Structural (Cấu trúc), Behavioral (Hành vi).").difficulty("Dễ").subject(subjectSe114).build());
            questionRepository.save(Question.builder().content("Trình bày nguyên lý hoạt động của Singleton Pattern và cho ví dụ khi nào nên dùng?").answer("Singleton đảm bảo một lớp chỉ có duy nhất một đối tượng và cung cấp điểm truy cập toàn cục cho đối tượng đó. Thường dùng cho Database Connection Pool, Logger, Configuration Manager.").difficulty("Trung bình").subject(subjectSe114).build());
        } else {
            subjectSe114 = subjectRepository.findById("SE114").orElse(null);
        }

        Subject subjectSe320 = null;
        if (!subjectRepository.existsById("SE320")) {
            subjectSe320 = Subject.builder()
                    .subjectId("SE320")
                    .subjectName("Kiểm thử và đảm bảo chất lượng phần mềm")
                    .build();
            subjectRepository.save(subjectSe320);
            questionRepository.save(Question.builder().content("Kiểm thử hồi quy (Regression Testing) là gì và tại sao nó lại quan trọng?").answer("Là việc kiểm thử lại phần mềm sau khi có sự thay đổi (sửa bug, thêm tính năng) để đảm bảo các chức năng cũ vẫn hoạt động bình thường, không bị lỗi mới phát sinh.").difficulty("Trung bình").subject(subjectSe320).build());
            questionRepository.save(Question.builder().content("Phân biệt giữa Verification (Thẩm định) và Validation (Xác nhận) trong QA?").answer("Verification tập trung vào việc quy trình xây dựng phần mềm có đúng thiết kế không (Are we building the product right?). Validation tập trung vào việc sản phẩm phần mềm có đáp ứng đúng nhu cầu khách hàng không (Are we building the right product?).").difficulty("Trung bình").subject(subjectSe320).build());
        } else {
            subjectSe320 = subjectRepository.findById("SE320").orElse(null);
        }
 
        // ===== 2. SEED TEACHER-SUBJECT LINKS =====
        seedTeacherSubject("GV001", "SE104", teacher1, subjectSe104);
        seedTeacherSubject("GV001", "SE101", teacher1, subjectSe101);
        seedTeacherSubject("GV001", "IT001", teacher1, subjectIt001);
        seedTeacherSubject("GV001", "IT002", teacher1, subjectIt002);
        seedTeacherSubject("GV001", "IT003", teacher1, subjectIt003);

        seedTeacherSubject("GV002", "SS001", teacher2, subjectSs001);
        seedTeacherSubject("GV002", "SS008", teacher2, subjectSs008);
        seedTeacherSubject("GV002", "SE104", teacher2, subjectSe104);
        seedTeacherSubject("GV002", "IT004", teacher2, subjectIt004);
        seedTeacherSubject("GV002", "IT005", teacher2, subjectIt005);

        seedTeacherSubject("GV003", "IT001", teacher3, subjectIt001);
        seedTeacherSubject("GV003", "SE104", teacher3, subjectSe104);
        seedTeacherSubject("GV003", "SE114", teacher3, subjectSe114);
        seedTeacherSubject("GV003", "SE320", teacher3, subjectSe320);
 
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
        List<Question> allDbQuestions = questionRepository.findAll();

        Exam exam1 = null;
        if (!examRepository.existsByExamCode("GK_SE104")) {
            List<Question> questionsForSe104 = allDbQuestions.stream()
                    .filter(q -> "SE104".equals(q.getSubject().getSubjectId()))
                    .toList();
            exam1 = Exam.builder()
                    .examCode("GK_SE104")
                    .semester("1")
                    .year(2026)
                    .duration(90)
                    .subject(subjectSe104)
                    .teacher(teacher1)
                    .build();
            examRepository.save(exam1);

            int order = 1;
            for (Question q : questionsForSe104) {
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
            exam1 = examRepository.findByExamCode("GK_SE104").orElse(null);
        }

        // Seed CK_IT002 (OOP Exam)
        if (!examRepository.existsByExamCode("CK_IT002") && subjectIt002 != null) {
            List<Question> questionsIt002 = allDbQuestions.stream()
                    .filter(q -> "IT002".equals(q.getSubject().getSubjectId()))
                    .toList();
            Exam exam2 = Exam.builder()
                    .examCode("CK_IT002")
                    .semester("1")
                    .year(2026)
                    .duration(90)
                    .subject(subjectIt002)
                    .teacher(teacher1)
                    .build();
            examRepository.save(exam2);

            int order = 1;
            for (Question q : questionsIt002) {
                ExamQuestionId eqId = new ExamQuestionId(exam2.getExamId(), q.getQuestionId());
                ExamQuestion eq = ExamQuestion.builder()
                        .id(eqId)
                        .exam(exam2)
                        .question(q)
                        .questionOrder(order++)
                        .build();
                examQuestionRepository.save(eq);
            }
        }

        // Seed GK_IT003 (DSA Exam)
        if (!examRepository.existsByExamCode("GK_IT003") && subjectIt003 != null) {
            List<Question> questionsIt003 = allDbQuestions.stream()
                    .filter(q -> "IT003".equals(q.getSubject().getSubjectId()))
                    .toList();
            Exam exam3 = Exam.builder()
                    .examCode("GK_IT003")
                    .semester("1")
                    .year(2026)
                    .duration(90)
                    .subject(subjectIt003)
                    .teacher(teacher1)
                    .build();
            examRepository.save(exam3);

            int order = 1;
            for (Question q : questionsIt003) {
                ExamQuestionId eqId = new ExamQuestionId(exam3.getExamId(), q.getQuestionId());
                ExamQuestion eq = ExamQuestion.builder()
                        .id(eqId)
                        .exam(exam3)
                        .question(q)
                        .questionOrder(order++)
                        .build();
                examQuestionRepository.save(eq);
            }
        }

        // Seed CK_IT004 (DB Exam)
        if (!examRepository.existsByExamCode("CK_IT004") && subjectIt004 != null) {
            List<Question> questionsIt004 = allDbQuestions.stream()
                    .filter(q -> "IT004".equals(q.getSubject().getSubjectId()))
                    .toList();
            Exam exam4 = Exam.builder()
                    .examCode("CK_IT004")
                    .semester("1")
                    .year(2026)
                    .duration(90)
                    .subject(subjectIt004)
                    .teacher(teacher2)
                    .build();
            examRepository.save(exam4);

            int order = 1;
            for (Question q : questionsIt004) {
                ExamQuestionId eqId = new ExamQuestionId(exam4.getExamId(), q.getQuestionId());
                ExamQuestion eq = ExamQuestion.builder()
                        .id(eqId)
                        .exam(exam4)
                        .question(q)
                        .questionOrder(order++)
                        .build();
                examQuestionRepository.save(eq);
            }
        }

        // Seed CK_IT005 (Network Exam)
        if (!examRepository.existsByExamCode("CK_IT005") && subjectIt005 != null) {
            List<Question> questionsIt005 = allDbQuestions.stream()
                    .filter(q -> "IT005".equals(q.getSubject().getSubjectId()))
                    .toList();
            Exam exam5 = Exam.builder()
                    .examCode("CK_IT005")
                    .semester("1")
                    .year(2026)
                    .duration(90)
                    .subject(subjectIt005)
                    .teacher(teacher2)
                    .build();
            examRepository.save(exam5);

            int order = 1;
            for (Question q : questionsIt005) {
                ExamQuestionId eqId = new ExamQuestionId(exam5.getExamId(), q.getQuestionId());
                ExamQuestion eq = ExamQuestion.builder()
                        .id(eqId)
                        .exam(exam5)
                        .question(q)
                        .questionOrder(order++)
                        .build();
                examQuestionRepository.save(eq);
            }
        }

        // Seed CK_SE114 (Software Design Exam)
        if (!examRepository.existsByExamCode("CK_SE114") && subjectSe114 != null) {
            List<Question> questionsSe114 = allDbQuestions.stream()
                    .filter(q -> "SE114".equals(q.getSubject().getSubjectId()))
                    .toList();
            Exam exam6 = Exam.builder()
                    .examCode("CK_SE114")
                    .semester("1")
                    .year(2026)
                    .duration(90)
                    .subject(subjectSe114)
                    .teacher(teacher3)
                    .build();
            examRepository.save(exam6);

            int order = 1;
            for (Question q : questionsSe114) {
                ExamQuestionId eqId = new ExamQuestionId(exam6.getExamId(), q.getQuestionId());
                ExamQuestion eq = ExamQuestion.builder()
                        .id(eqId)
                        .exam(exam6)
                        .question(q)
                        .questionOrder(order++)
                        .build();
                examQuestionRepository.save(eq);
            }
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