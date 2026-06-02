package com.se104.backend.repository;

import com.se104.backend.entity.Clazz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClazzRepository extends JpaRepository<Clazz, String> {
    List<Clazz> findAllByTeacher_TeacherId(String teacherId);
    Integer countByYearAndTeacher_TeacherId(Integer year,String teacherId);
}
