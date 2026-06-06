package com.se104.backend.service;

import com.se104.backend.dto.other.StudentInfoDTO;
import com.se104.backend.dto.request.StudentCreateRequest;
import com.se104.backend.dto.response.ClassStudentResponse;
import com.se104.backend.entity.Clazz;
import com.se104.backend.entity.Student;
import com.se104.backend.entity.StudentClass;
import com.se104.backend.entity.StudentClassId;
import com.se104.backend.repository.ClazzRepository;
import com.se104.backend.repository.StudentClassRepository;
import com.se104.backend.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final ClazzRepository clazzRepository;
    private final StudentClassRepository studentClassRepository;
    private static final Logger logger = LoggerFactory.getLogger(ExamService.class);

    @Transactional
    public List<StudentInfoDTO> createStudents(String classId, StudentCreateRequest request) {
        Clazz clazz = clazzRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        List<StudentInfoDTO> result = new ArrayList<>();
        int dem=0;
        for (StudentInfoDTO dto : request.getStudents()) {

            Student student = studentRepository.findById(dto.getStudentId())
                    .orElseGet(() -> studentRepository.save(
                            Student.builder()
                                    .studentId(dto.getStudentId())
                                    .fullName(dto.getFullName())
                                    .email(dto.getEmail())
                                    .build()
                    ));
            StudentClassId scId = new StudentClassId();
            scId.setClassId(classId);
            scId.setStudentId(dto.getStudentId());
            if (studentClassRepository.existsById(scId)) {
                continue;
            }
            StudentClass sc = buildStudentClass(clazz, student);
            studentClassRepository.save(sc);
            clazz.getStudentClasses().add(sc);
            student.getStudentClasses().add(sc);
            clazzRepository.save(clazz);
            studentRepository.save(student);
            ++dem;
            result.add(StudentInfoDTO.builder()
                    .studentId(student.getStudentId())
                    .fullName(student.getFullName())
                    .email(student.getEmail())
                    .build());
        }
        clazz.setTotalStudent(clazz.getStudentClasses() != null ? clazz.getStudentClasses().size() : 0);
        clazzRepository.save(clazz);
        logger.info("Saved student class for student ID: {}", classId);
        return result;
    }

    private StudentClass buildStudentClass(Clazz clazz, Student student) {
        StudentClass sc = new StudentClass();

        StudentClassId id = new StudentClassId();
        id.setClassId(clazz.getClassId());
        id.setStudentId(student.getStudentId());

        sc.setId(id);
        sc.setClazz(clazz);
        sc.setStudent(student);

        return sc;
    }
}
