package com.se104.backend.controller;

import com.se104.backend.dto.response.ApiResponse;
import com.se104.backend.entity.*;
import com.se104.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;
    private final PasswordEncoder passwordEncoder;

    // ==================== TEACHERS MANAGEMENT ====================

    @GetMapping("/teachers")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Teacher t : teachers) {
            if ("admin".equals(t.getTeacherId())) {
                continue; // Skip admin account
            }
            Map<String, Object> map = new HashMap<>();
            map.put("teacherId", t.getTeacherId());
            map.put("fullName", t.getFullName());

            List<Map<String, String>> subjects = new ArrayList<>();
            if (t.getTeacherSubjects() != null) {
                for (TeacherSubject ts : t.getTeacherSubjects()) {
                    Map<String, String> subMap = new HashMap<>();
                    subMap.put("subjectId", ts.getSubject().getSubjectId());
                    subMap.put("subjectName", ts.getSubject().getSubjectName());
                    subjects.add(subMap);
                }
            }
            map.put("subjects", subjects);
            result.add(map);
        }
        return ResponseEntity.ok(ApiResponse.<List<Map<String, Object>>>builder()
                .success(true)
                .data(result)
                .build());
    }

    @PostMapping("/teachers")
    public ResponseEntity<ApiResponse<String>> createTeacher(@RequestBody Map<String, String> payload) {
        String teacherId = payload.get("teacherId");
        String fullName = payload.get("fullName");
        String password = payload.get("password");

        if (teacherId == null || teacherId.trim().isEmpty() ||
            fullName == null || fullName.trim().isEmpty() ||
            password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message("Vui lòng điền đầy đủ thông tin giáo viên!")
                    .build());
        }

        if (teacherRepository.existsById(teacherId)) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message("Mã giáo viên đã tồn tại!")
                    .build());
        }

        Teacher teacher = Teacher.builder()
                .teacherId(teacherId)
                .fullName(fullName)
                .password(passwordEncoder.encode(password))
                .build();
        teacherRepository.save(teacher);

        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Thêm giáo viên thành công!")
                .build());
    }

    @PutMapping("/teachers/{id}")
    public ResponseEntity<ApiResponse<String>> updateTeacher(@PathVariable String id, @RequestBody Map<String, String> payload) {
        Teacher teacher = teacherRepository.findById(id).orElse(null);
        if (teacher == null) {
            return ResponseEntity.notFound().build();
        }

        String fullName = payload.get("fullName");
        if (fullName == null || fullName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message("Tên giáo viên không được để trống!")
                    .build());
        }

        teacher.setFullName(fullName);

        String password = payload.get("password");
        if (password != null && !password.trim().isEmpty()) {
            teacher.setPassword(passwordEncoder.encode(password));
        }

        teacherRepository.save(teacher);

        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Cập nhật thông tin giáo viên thành công!")
                .build());
    }

    @DeleteMapping("/teachers/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTeacher(@PathVariable String id) {
        if (!teacherRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        teacherRepository.deleteById(id);

        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Xóa giáo viên thành công!")
                .build());
    }

    // ==================== SUBJECTS MANAGEMENT ====================

    @GetMapping("/subjects")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Subject s : subjects) {
            Map<String, Object> map = new HashMap<>();
            map.put("subjectId", s.getSubjectId());
            map.put("subjectName", s.getSubjectName());
            result.add(map);
        }
        return ResponseEntity.ok(ApiResponse.<List<Map<String, Object>>>builder()
                .success(true)
                .data(result)
                .build());
    }

    @PostMapping("/subjects")
    public ResponseEntity<ApiResponse<String>> createSubject(@RequestBody Map<String, String> payload) {
        String subjectId = payload.get("subjectId");
        String subjectName = payload.get("subjectName");

        if (subjectId == null || subjectId.trim().isEmpty() ||
            subjectName == null || subjectName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message("Vui lòng điền đầy đủ thông tin môn học!")
                    .build());
        }

        if (subjectRepository.existsById(subjectId)) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message("Mã môn học đã tồn tại!")
                    .build());
        }

        Subject subject = Subject.builder()
                .subjectId(subjectId)
                .subjectName(subjectName)
                .build();
        subjectRepository.save(subject);

        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Thêm môn học thành công!")
                .build());
    }

    @PutMapping("/subjects/{id}")
    public ResponseEntity<ApiResponse<String>> updateSubject(@PathVariable String id, @RequestBody Map<String, String> payload) {
        Subject subject = subjectRepository.findById(id).orElse(null);
        if (subject == null) {
            return ResponseEntity.notFound().build();
        }

        String subjectName = payload.get("subjectName");
        if (subjectName == null || subjectName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message("Tên môn học không được để trống!")
                    .build());
        }

        subject.setSubjectName(subjectName);
        subjectRepository.save(subject);

        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Cập nhật môn học thành công!")
                .build());
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<ApiResponse<String>> deleteSubject(@PathVariable String id) {
        if (!subjectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        subjectRepository.deleteById(id);

        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Xóa môn học thành công!")
                .build());
    }

    // ==================== TEACHER-SUBJECT LINKS ====================

    @PostMapping("/teacher-subjects")
    public ResponseEntity<ApiResponse<String>> assignSubject(@RequestBody Map<String, String> payload) {
        String teacherId = payload.get("teacherId");
        String subjectId = payload.get("subjectId");

        Teacher teacher = teacherRepository.findById(teacherId).orElse(null);
        Subject subject = subjectRepository.findById(subjectId).orElse(null);

        if (teacher == null || subject == null) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message("Giáo viên hoặc môn học không tồn tại!")
                    .build());
        }

        TeacherSubjectId id = new TeacherSubjectId(teacherId, subjectId);
        if (teacherSubjectRepository.existsById(id)) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .success(false)
                    .message("Giáo viên đã được phân công dạy môn này rồi!")
                    .build());
        }

        TeacherSubject ts = TeacherSubject.builder()
                .id(id)
                .teacher(teacher)
                .subject(subject)
                .build();
        teacherSubjectRepository.save(ts);

        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Phân công dạy học thành công!")
                .build());
    }

    @DeleteMapping("/teacher-subjects/{teacherId}/{subjectId}")
    public ResponseEntity<ApiResponse<String>> unassignSubject(@PathVariable String teacherId, @PathVariable String subjectId) {
        TeacherSubjectId id = new TeacherSubjectId(teacherId, subjectId);
        if (!teacherSubjectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        teacherSubjectRepository.deleteById(id);

        return ResponseEntity.ok(ApiResponse.<String>builder()
                .success(true)
                .message("Hủy phân công dạy học thành công!")
                .build());
    }
}
