package com.se104.backend.repository;

import com.se104.backend.entity.TeacherSubject;
import com.se104.backend.entity.TeacherSubjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherSubjectRepository extends JpaRepository<TeacherSubject, TeacherSubjectId> {
}