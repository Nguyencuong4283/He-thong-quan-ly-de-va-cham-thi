package Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "exam_question")
public class ExamQuestion {

    @EmbeddedId
    private ExamQuestionId id = new ExamQuestionId();

    @ManyToOne
    @MapsId("exam_id")
    @JoinColumn(name = "examId")
    private Exam exam;

    @ManyToOne
    @MapsId("question_id")
    @JoinColumn(name = "questionId")
    private Question question;

    private Float points;
}
