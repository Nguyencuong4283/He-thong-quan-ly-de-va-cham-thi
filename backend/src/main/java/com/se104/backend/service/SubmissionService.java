package com.se104.backend.service;

import com.se104.backend.dto.request.SubmissionCreateRequest;
import com.se104.backend.dto.request.SubmissionUpdateRequest;
import com.se104.backend.dto.response.SubmissionDetaiResponse;
import com.se104.backend.dto.response.SubmissionListResponse;
import com.se104.backend.entity.Clazz;
import com.se104.backend.entity.Exam;
import com.se104.backend.entity.Student;
import com.se104.backend.entity.Submission;
import com.se104.backend.exception.BusinessException;
import com.se104.backend.repository.ClazzRepository;
import com.se104.backend.repository.ExamRepository;
import com.se104.backend.repository.StudentRepository;
import com.se104.backend.repository.SubmissionRepository;
import com.se104.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final StudentRepository studentRepository;
    private final ClazzRepository clazzRepository;
    private final ExamRepository examRepository;

    public List<SubmissionListResponse> getSubmissionsByClass(
            String classId, String search, Boolean statusFilter) {
        List<Submission> submissions = submissionRepository.findByClazz_ClassId(classId);
        return submissions.stream()
                .filter(s -> search == null ||
                        s.getStudent().getStudentId().contains(search) ||
                        s.getStudent().getFullName()
                                .toLowerCase()
                                .contains(search.toLowerCase()))
                .filter(s -> statusFilter == null ||
                        s.isStatus()==statusFilter)
                .map(s -> new SubmissionListResponse(
                        s.getSubmissionId(),
                        s.getStudent().getStudentId(),
                        s.getStudent().getFullName(),
                        s.getScore(),
                        s.isStatus()
                ))
                .collect(Collectors.toList());
    }

    public SubmissionDetaiResponse getSubmissionDetail(Integer submissionId) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        return mapToDetailResponse(submission);
    }

    public SubmissionDetaiResponse createSubmission(
            String classId, String studentId, SubmissionCreateRequest request) {
        String teacherId = SecurityUtil.getCurrentTeacherId();
        if (submissionRepository.existsByClazz_ClassIdAndStudent_StudentId(classId, studentId)) {
            throw new RuntimeException("Submission already exists");
        }
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Clazz clazz = clazzRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        Exam exam = examRepository.findById(request.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        if (!clazz.getTeacher().getTeacherId().equals(teacherId))
            throw new BusinessException("Unauthorized to create submission for this class");
        Submission submission = new Submission();

        submission.setStudent(student);
        submission.setClazz(clazz);
        submission.setExam(exam);
        submission.setScore(request.getScore());
        submission.setScoreText(request.getScoreText());
        submission.setNote(request.getNote());
        submission.setStatus(request.getStatus());

        Submission saved = submissionRepository.save(submission);

        return mapToDetailResponse(saved);
    }

    public SubmissionDetaiResponse updateSubmission(
            Integer submissionId, SubmissionUpdateRequest request) {
        String teacherId = SecurityUtil.getCurrentTeacherId();
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        if (!submission.getClazz().getTeacher().getTeacherId().equals(teacherId))
            throw new BusinessException("Unauthorized to update submission for this class");
        submission.setScore(request.getScore());
        submission.setScoreText(request.getScoreText());
        submission.setNote(request.getNote());
        submission.setStatus(request.getStatus());
        Submission updated = submissionRepository.save(submission);

        return mapToDetailResponse(updated);
    }

    private SubmissionDetaiResponse mapToDetailResponse(Submission submission) {
        return SubmissionDetaiResponse.builder()
                .submissionId(submission.getSubmissionId())
                .studentId(submission.getStudent().getStudentId())
                .studentName(submission.getStudent().getFullName())
                .classId(submission.getClazz().getClassId())
                .score(submission.getScore())
                .scoreText(submission.getScoreText())
                .note(submission.getNote())
                .status(submission.isStatus())
                .build();
    }
}