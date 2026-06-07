package com.student_service.studentservice.repository;

import com.student_service.studentservice.model.Student;
import com.student_service.studentservice.model.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // Basic CRUD operations are inherited from JpaRepository
    
    // Find student by email
    Optional<Student> findByEmail(String email);
    
    // Find students by first name
    List<Student> findByFirstName(String firstName);
    
    // Find students by last name
    List<Student> findByLastName(String lastName);
    
    // Find students by first name containing (case-insensitive)
    List<Student> findByFirstNameContainingIgnoreCase(String firstName);
    
    // Find students by last name containing (case-insensitive)
    List<Student> findByLastNameContainingIgnoreCase(String lastName);
    
    // Find students by university
    List<Student> findByUniversity(University university);
    
    // Find students by university ID
    List<Student> findByUniversityId(Long universityId);
    
    // Find students by university name
    @Query("SELECT s FROM Student s WHERE s.university.name = :universityName")
    List<Student> findByUniversityName(@Param("universityName") String universityName);
    
    // Search students by name (first or last name)
    @Query("SELECT s FROM Student s WHERE LOWER(s.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Student> searchByName(@Param("name") String name);
    
    // Search students by name and university
    @Query("SELECT s FROM Student s WHERE (LOWER(s.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :name, '%'))) AND s.university.name = :universityName")
    List<Student> searchByNameAndUniversity(@Param("name") String name, @Param("universityName") String universityName);
    
    // Get all students with university details (for GraphQL optimization)
    @Query("SELECT s FROM Student s JOIN FETCH s.university")
    List<Student> findAllWithUniversity();
    
    // Get student by ID with university details
    @Query("SELECT s FROM Student s JOIN FETCH s.university WHERE s.id = :id")
    Optional<Student> findByIdWithUniversity(@Param("id") Long id);
    
    // Check if email exists (for validation)
    boolean existsByEmail(String email);
    
    // Count students by university
    @Query("SELECT COUNT(s) FROM Student s WHERE s.university.id = :universityId")
    Long countByUniversityId(@Param("universityId") Long universityId);
}
