package service;

import com.se104.backend.entity.Student;
import com.se104.backend.exception.ResourceNotFoundException;
import com.se104.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    public Student getById(Long id) {
        return studentRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("STUDENT NOT FOUND WITH ID: " + id));
    }

    public Student create(Student student) {
        return studentRepository.save(student);
    }

    public Student update(Long id, Student student) {
        Student existing = studentRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("STUDENT NOT FOUND WITH ID: " + id));

        existing.setMssv(student.getMssv());
        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setPhone(student.getPhone());
        existing.setClassroom(student.getClassroom());

        return studentRepository.save(existing);
    }

    public void delete(Long id) {
        Student existing = studentRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("STUDENT NOT FOUND WITH ID: " + id));

        studentRepository.delete(existing);
    }
}