package com.se104.backend.service;

import com.se104.backend.dto.other.StudentInfoDTO;
import com.se104.backend.dto.request.ClassCreateRequest;
import com.se104.backend.dto.response.ClassListResponse;
import com.se104.backend.dto.response.ClassStudentResponse;
import com.se104.backend.dto.response.ClassUpdateResponse;
import com.se104.backend.entity.*;
import com.se104.backend.exception.BusinessException;
import com.se104.backend.repository.ClazzRepository;
import com.se104.backend.repository.ExamRepository;
import com.se104.backend.repository.SubjectRepository;
import com.se104.backend.repository.TeacherRepository;
import com.se104.backend.repository.SubmissionRepository; // Import SubmissionRepository
import com.se104.backend.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import Transactional

import java.util.List;

@Service
public class ClazzService {
    @Autowired
    private ClazzRepository classRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ExamRepository examRepository;
    @Autowired
    private SubmissionRepository submissionRepository; // Inject SubmissionRepository

    public List<ClassListResponse> getAllClass()
    {
        String teacherId= SecurityUtil.getCurrentTeacherId();
        return classRepository.findAllByTeacher_TeacherId(teacherId).stream()
                .map(this::classToClassListResponse)
                .toList();

    }
    public ClassStudentResponse getClassStudent(String classId)
    {   String teacherId=SecurityUtil.getCurrentTeacherId();
        Clazz clazz=classRepository.findById(classId)
                .orElseThrow(()->new EntityNotFoundException("Class not found"));
        if (!clazz.getTeacher().getTeacherId().equals(teacherId))
            throw new BusinessException("Unauthorized access to class");
        List<StudentInfoDTO> studentList=clazz.getStudentClasses().stream()
                .map(sc->studentToStudentInfoDTO(sc.getStudent()))
                .toList();
        return ClassStudentResponse.builder()
                .classId(clazz.getClassId())
                .name(clazz.getName())
                .subjectName(clazz.getSubject().getSubjectName())
                .semester(clazz.getSemester())
                .year(clazz.getYear())
                .examId(clazz.getExam()!=null? clazz.getExam().getExamId():null)
                .examCode(clazz.getExam()!=null? clazz.getExam().getExamCode():null)
                .students(studentList)
                .build();
    }
    public ClassListResponse createClass(ClassCreateRequest classCreateRequest) {
        String teacherId=SecurityUtil.getCurrentTeacherId();
        Teacher teacher=teacherRepository.findById(teacherId)
                .orElseThrow(()->new EntityNotFoundException("Teacher not found"));
        Subject subject=subjectRepository.findById(classCreateRequest.getSubjectId())
                .orElseThrow(()->new EntityNotFoundException("Subject not found"));
        Exam exam=null;
        if (classCreateRequest.getExamId()!=null)
        {
            exam=examRepository.findById(classCreateRequest.getExamId())
                    .orElseThrow(()->new EntityNotFoundException("Exam not found"));
        }
        Clazz clazz=Clazz.builder()
                .classId(classCreateRequest.getClassId())
                .name(classCreateRequest.getName())
                .semester(classCreateRequest.getSemester())
                .year(classCreateRequest.getYear())
                .subject(subject)
                .teacher(teacher)
                .exam(exam)
                .totalStudent(0)
                .build();
        return classToClassListResponse(classRepository.save(clazz));
    }

    @Transactional // Ensure all operations are part of a single transaction
    public ClassUpdateResponse assignExam(String classId, int examId) {
        Clazz clazz = classRepository.findById(classId)
                .orElseThrow(() -> new EntityNotFoundException("Class not found"));
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new EntityNotFoundException("Exam not found"));

        // Update the exam for the Clazz
        clazz.setExam(exam);
        classRepository.save(clazz);

        // Find all submissions for this class and update their exam
        List<Submission> submissions = submissionRepository.findByClazz_ClassId(classId);
        for (Submission submission : submissions) {
            submission.setExam(exam);
        }
        submissionRepository.saveAll(submissions); // Save all updated submissions

        return ClassUpdateResponse.builder()
                .classId(clazz.getClassId())
                .examCode(clazz.getExam().getExamCode())
                .build();
    }
    private StudentInfoDTO studentToStudentInfoDTO(Student student) {
        return StudentInfoDTO.builder()
                .studentId(student.getStudentId())
                .fullName(student.getFullName())
                .email(student.getEmail())
                .build();
    }
    private ClassListResponse classToClassListResponse(Clazz clazz) {
        return ClassListResponse.builder()
                .classId(clazz.getClassId())
                .name(clazz.getName())
                .subjectName(clazz.getSubject().getSubjectName())
                .semester(clazz.getSemester())
                .year(clazz.getYear())
                .teacherId(clazz.getTeacher().getTeacherId())
                .examCode(clazz.getExam()!=null? clazz.getExam().getExamCode():null)
                .totalStudent(clazz.getTotalStudent())
                .build();
    }
}