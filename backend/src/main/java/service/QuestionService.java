package service;

import com.se104.backend.entity.Question;
import com.se104.backend.exception.ResourceNotFoundException;
import com.se104.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;

    public List<Question> getAll() {
        return questionRepository.findAll();
    }

    public Question getById(Long id) {
        return questionRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("QUESTION NOT FOUND WITH ID: " + id));
    }

    public Question create(Question question) {
        return questionRepository.save(question);
    }

    public Question update(Long id, Question question) {
        Question existing = questionRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("QUESTION NOT FOUND WITH ID: " + id));

        existing.setContent(question.getContent());
        existing.setType(question.getType());
        existing.setDifficulty(question.getDifficulty());
        existing.setSubject(question.getSubject());
        existing.setAnswers(question.getAnswers());
        existing.setCorrectAnswer(question.getCorrect_answer());

        return questionRepository.save(existing);
    }

    public void delete(Long id) {
        Question existing = questionRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("QUESTION NOT FOUND WITH ID: " + id));

        questionRepository.delete(existing);
    }
}