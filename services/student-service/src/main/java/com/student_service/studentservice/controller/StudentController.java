package com.student_service.studentservice.controller;

import com.student_service.studentservice.model.Student;
import com.student_service.studentservice.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Create a new student
    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        try {
            Student savedStudent = studentService.createStudent(student);
            return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Get all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // Get all students with university details
    @GetMapping("/with-university")
    public ResponseEntity<List<Student>> getAllStudentsWithUniversity() {
        List<Student> students = studentService.getAllStudentsWithUniversity();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentById(id);
        if (student.isPresent()) {
            return new ResponseEntity<>(student.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Student not found with id: " + id, HttpStatus.NOT_FOUND);
        }
    }

    // Get student by ID with university details
    @GetMapping("/{id}/with-university")
    public ResponseEntity<?> getStudentByIdWithUniversity(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentByIdWithUniversity(id);
        if (student.isPresent()) {
            return new ResponseEntity<>(student.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Student not found with id: " + id, HttpStatus.NOT_FOUND);
        }
    }

    // Get student by email
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getStudentByEmail(@PathVariable String email) {
        Optional<Student> student = studentService.getStudentByEmail(email);
        if (student.isPresent()) {
            return new ResponseEntity<>(student.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Student not found with email: " + email, HttpStatus.NOT_FOUND);
        }
    }

    // Update student
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        try {
            Student updatedStudent = studentService.updateStudent(id, studentDetails);
            return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        try {
            studentService.deleteStudent(id);
            return new ResponseEntity<>("Student deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Search students by name
    @GetMapping("/search/name")
    public ResponseEntity<List<Student>> searchStudentsByName(@RequestParam String name) {
        List<Student> students = studentService.searchStudentsByName(name);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // Search students by university name
    @GetMapping("/search/university")
    public ResponseEntity<List<Student>> getStudentsByUniversityName(@RequestParam String universityName) {
        List<Student> students = studentService.getStudentsByUniversityName(universityName);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // Search students by name and university
    @GetMapping("/search/name-and-university")
    public ResponseEntity<List<Student>> searchStudentsByNameAndUniversity(
            @RequestParam String name, 
            @RequestParam String universityName) {
        List<Student> students = studentService.searchStudentsByNameAndUniversity(name, universityName);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // Get students by university ID
    @GetMapping("/university/{universityId}")
    public ResponseEntity<List<Student>> getStudentsByUniversityId(@PathVariable Long universityId) {
        List<Student> students = studentService.getStudentsByUniversityId(universityId);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // Filter students by first name
    @GetMapping("/filter/first-name")
    public ResponseEntity<List<Student>> getStudentsByFirstName(@RequestParam String firstName) {
        List<Student> students = studentService.getStudentsByFirstName(firstName);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // Filter students by last name
    @GetMapping("/filter/last-name")
    public ResponseEntity<List<Student>> getStudentsByLastName(@RequestParam String lastName) {
        List<Student> students = studentService.getStudentsByLastName(lastName);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // Count students by university
    @GetMapping("/count/university/{universityId}")
    public ResponseEntity<Long> countStudentsByUniversity(@PathVariable Long universityId) {
        Long count = studentService.countStudentsByUniversity(universityId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}