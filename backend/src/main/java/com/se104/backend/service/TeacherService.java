package com.se104.backend.service;

import com.se104.backend.dto.other.TeacherInfoDTO;
import com.se104.backend.dto.request.TeacherLoginRequest;
import com.se104.backend.dto.response.SubjectResponse;
import com.se104.backend.dto.response.TeacherLoginResponse;
import com.se104.backend.entity.Teacher;
import com.se104.backend.repository.TeacherRepository;
import com.se104.backend.repository.SubjectRepository;
import com.se104.backend.util.JwtUtil;
import com.se104.backend.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;

    public TeacherLoginResponse login(TeacherLoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getTeacherId(),
                        request.getPassword()
                )
        );

        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new EntityNotFoundException("Teacher not found"));

        String token = jwtUtil.generateToken(teacher.getTeacherId());

        return TeacherLoginResponse.builder()
                .token(token)
                .teacher(
                        TeacherInfoDTO.builder()
                                .teacherId(teacher.getTeacherId())
                                .fullName(teacher.getFullName())
                                .build()
                )
                .build();
    }
    public List<SubjectResponse> getSubjects() {
        String teacherId= SecurityUtil.getCurrentTeacherId();
        if ("admin".equals(teacherId)) {
            return subjectRepository.findAll().stream()
                    .map(subject -> SubjectResponse.builder()
                            .subjectId(subject.getSubjectId())
                            .subjectName(subject.getSubjectName())
                            .build())
                    .toList();
        }
        Teacher teacher=teacherRepository.findById(teacherId)
                .orElseThrow(()->new EntityNotFoundException("Teacher not found"));
        return teacher.getTeacherSubjects().stream()
                .map(teachersubject->SubjectResponse.builder()
                        .subjectId(teachersubject.getSubject().getSubjectId())
                        .subjectName(teachersubject.getSubject().getSubjectName())
                        .build())
                .toList();
    }
}