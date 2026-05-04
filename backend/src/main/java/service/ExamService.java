package service;

import com.se104.backend.entity.Exam;
import com.se104.backend.exception.ResourceNotFoundException;
import com.se104.backend.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExamService {
    @Autowired
    ExamRepository examRepository;

    public List<Exam> getAll(){
        return examRepository.findAll();
    }

    public Exam getById(Long id){
        return examRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EXAM NOT FOUND WITH ID: "+id));
    }

    public Exam update(Long id, Exam exam){
        Exam existing = examRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EXAM NOT FOUND WITH ID: " + id));

        existing.setTitle(exam.getTitle());
        existing.setSubject(exam.getSubject());
        existing.setSemester(exam.getSemester());
        existing.setYear(exam.getYear());
        existing.setDuration(exam.getDuration());
        existing.setStatus(exam.getStatus());
        existing.setTeacher(exam.getTeacher());

        return examRepository.save(existing);
    }

    public void delete(Long id) {
        Exam existing = examRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EXAM NOT FOUND WITH ID: " + id));

        examRepository.delete(existing);
    }
}
