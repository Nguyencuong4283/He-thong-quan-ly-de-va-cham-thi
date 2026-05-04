package service;

import com.se104.backend.entity.Submission;
import com.se104.backend.exception.ResourceNotFoundException;
import com.se104.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubmissionService {

    @Autowired
    SubmissionRepository submissionRepository;

    public List<Submission> getAll() {
        return submissionRepository.findAll();
    }

    public Submission getById(Long id) {
        return submissionRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SUBMISSION NOT FOUND WITH ID: " + id));
    }

    public Submission create(Submission submission) {
        return submissionRepository.save(submission);
    }

    public Submission update(Long id, Submission submission) {
        Submission existing = submissionRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SUBMISSION NOT FOUND WITH ID: " + id));

        existing.setAnswers(submission.getAnswers());
        existing.setScore(submission.getScore());
        existing.setStatus(submission.getStatus());
        existing.setSubmittedAt(submission.getSubmittedAt());
        existing.setStudent(submission.getStudent());
        existing.setExam(submission.getExam());

        return submissionRepository.save(existing);
    }

    public void delete(Long id) {
        Submission existing = submissionRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SUBMISSION NOT FOUND WITH ID: " + id));

        submissionRepository.delete(existing);
    }
}