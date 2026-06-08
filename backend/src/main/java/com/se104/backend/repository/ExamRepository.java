package com.se104.backend.repository;

import com.se104.backend.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer>, JpaSpecificationExecutor<Exam> {
    Integer countByYearAndTeacher_TeacherId(
            Integer year,
            String teacherId
    );
    java.util.Optional<Exam> findByExamCode(String examCode);
    boolean existsByExamCode(String examCode);
}
