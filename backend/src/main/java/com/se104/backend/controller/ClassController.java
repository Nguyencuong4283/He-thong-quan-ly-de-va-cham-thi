package com.se104.backend.controller;

import com.se104.backend.dto.other.StudentInfoDTO;
import com.se104.backend.dto.request.ClassCreateRequest;
import com.se104.backend.dto.request.StudentCreateRequest;
import com.se104.backend.dto.response.*;
import com.se104.backend.service.ClazzService;
import com.se104.backend.service.StudentService;
import com.se104.backend.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClassController {
    private final ClazzService clazzService;
    private final StudentService studentService;
    @GetMapping
    public ResponseEntity<ApiResponse<List<ClassListResponse>>> getAllClass()
    {
        List<ClassListResponse> classes=clazzService.getAllClass();
        int totalstu=classes.stream().map(c->c.getTotalStudent()).reduce(0,Integer::sum);
        ClassListMeta classmeta=ClassListMeta.builder()
                .totalClass(classes.size())
                .totalStudent(totalstu)
                .build();
        return ResponseEntity.ok(ApiResponse.<List<ClassListResponse>>builder()
                .success(true)
                .data(classes)
                .meta(classmeta)
                .build());
    }
    @GetMapping("/{classId}/students")
    public ResponseEntity<ApiResponse<ClassStudentResponse>> getClassStudent(@PathVariable String classId)
    {
        ClassStudentResponse classStudent=clazzService.getClassStudent(classId);
        return ResponseEntity.ok(ApiResponse.<ClassStudentResponse>builder()
                .success(true)
                .data(classStudent)
                .build());
    }
    @PostMapping
    public ResponseEntity<ApiResponse<ClassListResponse>> createClass(@Valid @RequestBody ClassCreateRequest classCreateRequest)
    {
        ClassListResponse newClass=clazzService.createClass(classCreateRequest);
        return ResponseEntity.ok(ApiResponse.<ClassListResponse>builder()
                .success(true)
                .message("Create class successfully")
                .data(newClass)
                .build());
    }
    @PostMapping("/{classId}/students")
    public ResponseEntity<ApiResponse<List<StudentInfoDTO>>> addStudentToClass(@PathVariable String classId,
                                                                               @Valid @RequestBody StudentCreateRequest studentCreateRequest)
    {
        List<StudentInfoDTO> classStudent=studentService.createStudents(classId,studentCreateRequest);
        return ResponseEntity.ok(ApiResponse.<List<StudentInfoDTO>>builder()
                .success(true)
                .data(classStudent)
                .build());
    }
    @PutMapping("/{classId}/assign-exam/{examId}")
    public ResponseEntity<ApiResponse<ClassUpdateResponse>> assignExam(@PathVariable String classId,
                                                                       @PathVariable int examId)
    {
        ClassUpdateResponse updatedClass=clazzService.assignExam(classId,examId);
        return ResponseEntity.ok(ApiResponse.<ClassUpdateResponse>builder()
                .success(true)
                .data(updatedClass)
                .build());
    }
}
