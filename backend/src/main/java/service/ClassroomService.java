package service;

import com.se104.backend.entity.Classroom;
import com.se104.backend.exception.ResourceNotFoundException;
import com.se104.backend.repository.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClassroomService {
    @Autowired
    ClassroomRepository classroomRepository;

    public List<Classroom> getAll() {
        return classroomRepository.findAll();
    }

    public Classroom getById(Long id) {
        return classroomRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CLASSROOM NOT FOUND WITH ID: " + id));
    }

    public Classroom create(Classroom classroom) {
        return classroomRepository.save(classroom);
    }

    public Classroom update(Long id, Classroom classroom) {
        Classroom existing = classroomRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CLASSROOM NOT FOUND WITH ID: " + id));

        existing.setName(classroom.getName());
        existing.setTeacher(classroom.getTeacher());

        return classroomRepository.save(existing);
    }

    public void delete(Long id) {
        Classroom existing = classroomRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CLASSROOM NOT FOUND WITH ID: " + id));

        classroomRepository.delete(existing);
    }
}