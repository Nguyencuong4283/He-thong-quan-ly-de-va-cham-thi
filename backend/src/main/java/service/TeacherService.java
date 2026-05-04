package service;

import com.se104.backend.entity.Teacher;
import com.se104.backend.exception.ResourceNotFoundException;
import com.se104.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TeacherService {
    @Autowired
    TeacherRepository teacherRepository;

    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }

    public Teacher getById(Long id) {
        return teacherRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TEACHER NOT FOUND WITH ID: " + id));
    }

    public Teacher create(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public Teacher update(Long id, Teacher teacher) {
        Teacher existing = teacherRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TEACHER NOT FOUND WITH ID: " + id));

        existing.setName(teacher.getName());
        existing.setDepartment(teacher.getDepartment());

        return teacherRepository.save(existing);
    }

    public void delete(Long id) {
        Teacher existing = teacherRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TEACHER NOT FOUND WITH ID: " + id));

        teacherRepository.delete(existing);
    }
}