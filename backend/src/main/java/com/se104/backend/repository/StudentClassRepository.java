package com.se104.backend.repository;

import com.se104.backend.entity.StudentClass;
import com.se104.backend.entity.StudentClassId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentClassRepository extends JpaRepository<StudentClass, StudentClassId> {
}