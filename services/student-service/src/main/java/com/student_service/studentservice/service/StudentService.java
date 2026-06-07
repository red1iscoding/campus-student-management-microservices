package com.student_service.studentservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.student_service.studentservice.model.Student;
import com.student_service.studentservice.model.University;
import com.student_service.studentservice.repository.StudentRepository;
import com.student_service.studentservice.repository.UniversityRepository;

import java.util.List;
import java.util.Optional;
import java.util.Objects;

@Service
@Transactional
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UniversityRepository universityRepository;


    // Create a new student
    public Student createStudent(Student student) {
        // Validate email uniqueness
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Student with email '" + student.getEmail() + "' already exists");
        }

        // Validate university exists
        if (student.getUniversity() == null || student.getUniversity().getId() == null) {
            throw new RuntimeException("University must be specified for student");
        }

        Long universityId = Objects.requireNonNull(student.getUniversity().getId());
        University university = universityRepository.findById(universityId)
                .orElseThrow(() -> new RuntimeException("University not found with id: " + universityId));

        student.setUniversity(university);
        return studentRepository.save(student);
    }

    // Get all students
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get all students with university details (optimized for GraphQL)
    @Transactional(readOnly = true)
    public List<Student> getAllStudentsWithUniversity() {
        return studentRepository.findAllWithUniversity();
    }

    // Get student by ID
    @Transactional(readOnly = true)
    public Optional<Student> getStudentById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return studentRepository.findById(id);
    }

    // Get student by ID with university details
    @Transactional(readOnly = true)
    public Optional<Student> getStudentByIdWithUniversity(Long id) {
        return studentRepository.findByIdWithUniversity(id);
    }

    // Get student by email
    @Transactional(readOnly = true)
    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    // Update student
    public Student updateStudent(Long id, Student studentDetails) {
        if (id == null) {
            throw new RuntimeException("Student id cannot be null");
        }
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        // Check if email is being changed and if new email already exists
        if (!student.getEmail().equals(studentDetails.getEmail()) && 
            studentRepository.existsByEmail(studentDetails.getEmail())) {
            throw new RuntimeException("Student with email '" + studentDetails.getEmail() + "' already exists");
        }

        // Update university if provided
        if (studentDetails.getUniversity() != null && studentDetails.getUniversity().getId() != null) {
            Long universityId = Objects.requireNonNull(studentDetails.getUniversity().getId());
            University university = universityRepository.findById(universityId)
                    .orElseThrow(() -> new RuntimeException("University not found with id: " + universityId));
            student.setUniversity(university);
        }

        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setEmail(studentDetails.getEmail());

        return studentRepository.save(student);
    }

    // Delete student
    public void deleteStudent(Long id) {
        if (id == null) {
            throw new RuntimeException("Student id cannot be null");
        }
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        if (student != null) {
            studentRepository.delete(student);
        }
    }

    // Search students by name (first or last name)
    @Transactional(readOnly = true)
    public List<Student> searchStudentsByName(String name) {
        return studentRepository.searchByName(name);
    }

    // Search students by university name
    @Transactional(readOnly = true)
    public List<Student> getStudentsByUniversityName(String universityName) {
        return studentRepository.findByUniversityName(universityName);
    }

    // Search students by name and university
    @Transactional(readOnly = true)
    public List<Student> searchStudentsByNameAndUniversity(String name, String universityName) {
        return studentRepository.searchByNameAndUniversity(name, universityName);
    }

    // Get students by university ID
    @Transactional(readOnly = true)
    public List<Student> getStudentsByUniversityId(Long universityId) {
        return studentRepository.findByUniversityId(universityId);
    }

    // Filter students by first name
    @Transactional(readOnly = true)
    public List<Student> getStudentsByFirstName(String firstName) {
        return studentRepository.findByFirstNameContainingIgnoreCase(firstName);
    }

    // Filter students by last name
    @Transactional(readOnly = true)
    public List<Student> getStudentsByLastName(String lastName) {
        return studentRepository.findByLastNameContainingIgnoreCase(lastName);
    }

    // Count students by university
    @Transactional(readOnly = true)
    public Long countStudentsByUniversity(Long universityId) {
        return studentRepository.countByUniversityId(universityId);
    }

    // Check if student exists
    @Transactional(readOnly = true)
    public boolean studentExists(Long id) {
        if (id == null) {
            return false;
        }
        return studentRepository.existsById(id);
    }
}