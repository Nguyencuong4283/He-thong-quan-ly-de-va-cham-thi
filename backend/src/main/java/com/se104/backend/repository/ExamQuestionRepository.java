package com.se104.backend.repository;

import com.se104.backend.entity.ExamQuestion;
import com.se104.backend.entity.ExamQuestionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamQuestionRepository extends JpaRepository<ExamQuestion, ExamQuestionId> {
}