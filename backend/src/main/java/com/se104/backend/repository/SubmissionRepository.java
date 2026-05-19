package com.se104.backend.repository;

import com.se104.backend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Integer> {
    List<Submission> findByClazz_ClassId(String classId);
    List<Submission> findByClazz_Year(Integer year);
    boolean existsByClazz_ClassIdAndStudent_StudentId(String classId, String studentId);
}