package com.se104.backend.service;

import com.se104.backend.dto.other.TeacherInfoDTO;
import com.se104.backend.dto.request.TeacherLoginRequest;
import com.se104.backend.dto.request.UpdateProfileRequest;
import com.se104.backend.dto.request.ChangePasswordRequest;
import com.se104.backend.dto.response.SubjectResponse;
import com.se104.backend.dto.response.TeacherLoginResponse;
import com.se104.backend.dto.response.TeacherProfileResponse;
import com.se104.backend.entity.Teacher;
import com.se104.backend.repository.TeacherRepository;
import com.se104.backend.util.JwtUtil;
import com.se104.backend.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;

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
        Teacher teacher=teacherRepository.findById(teacherId)
                .orElseThrow(()->new EntityNotFoundException("Teacher not found"));
        return teacher.getTeacherSubjects().stream()
                .map(teachersubject->SubjectResponse.builder()
                        .subjectId(teachersubject.getSubject().getSubjectId())
                        .subjectName(teachersubject.getSubject().getSubjectName())
                        .build())
                .toList();
    }

    public TeacherProfileResponse getProfile() {
        String teacherId = SecurityUtil.getCurrentTeacherId();
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new EntityNotFoundException("Teacher not found"));
        return TeacherProfileResponse.builder()
                .teacherId(teacher.getTeacherId())
                .fullName(teacher.getFullName())
                .email(teacher.getEmail())
                .academicRank(teacher.getAcademicRank())
                .department(teacher.getDepartment())
                .build();
    }

    public TeacherProfileResponse updateProfile(UpdateProfileRequest request) {
        String teacherId = SecurityUtil.getCurrentTeacherId();
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new EntityNotFoundException("Teacher not found"));
        
        teacher.setFullName(request.getFullName());
        teacher.setEmail(request.getEmail());
        teacher.setAcademicRank(request.getAcademicRank());
        teacher.setDepartment(request.getDepartment());
        
        teacherRepository.save(teacher);
        
        return TeacherProfileResponse.builder()
                .teacherId(teacher.getTeacherId())
                .fullName(teacher.getFullName())
                .email(teacher.getEmail())
                .academicRank(teacher.getAcademicRank())
                .department(teacher.getDepartment())
                .build();
    }

    public void changePassword(ChangePasswordRequest request) {
        String teacherId = SecurityUtil.getCurrentTeacherId();
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new EntityNotFoundException("Teacher not found"));
        
        if (!passwordEncoder.matches(request.getCurrentPassword(), teacher.getPassword())) {
            throw new IllegalArgumentException("Mật khẩu hiện tại không chính xác");
        }
        
        teacher.setPassword(passwordEncoder.encode(request.getNewPassword()));
        teacherRepository.save(teacher);
    }
}