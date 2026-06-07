package com.student_service.studentservice.repository;

import com.student_service.studentservice.model.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {
    
    // Find university by name
    Optional<University> findByName(String name);
    
    // Find universities by location
    List<University> findByLocation(String location);
    
    // Find universities by name containing (case-insensitive)
    List<University> findByNameContainingIgnoreCase(String name);
    
    // Custom query to find universities with student count
    @Query("SELECT u.name, COUNT(s) FROM University u LEFT JOIN u.students s GROUP BY u.id, u.name")
    List<Object[]> findUniversitiesWithStudentCount();
    
    // Check if university exists by name
    boolean existsByName(String name);
}
