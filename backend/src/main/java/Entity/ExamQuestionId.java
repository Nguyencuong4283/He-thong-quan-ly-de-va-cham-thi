package Entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class ExamQuestionId implements Serializable {
    private Long examId;
    private Long questionId;

    public ExamQuestionId() {
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public Long getExamId() {
        return examId;
    }
}
