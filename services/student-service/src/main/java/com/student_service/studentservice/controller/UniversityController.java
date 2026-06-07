package com.student_service.studentservice.controller;

import com.student_service.studentservice.model.University;
import com.student_service.studentservice.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/universities")
@CrossOrigin(origins = "http://localhost:3000")
public class UniversityController {

    @Autowired
    private UniversityService universityService;

    // Create a new university
    @PostMapping
    public ResponseEntity<?> createUniversity(@RequestBody University university) {
        try {
            University savedUniversity = universityService.createUniversity(university);
            return new ResponseEntity<>(savedUniversity, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Get all universities
    @GetMapping
    public ResponseEntity<List<University>> getAllUniversities() {
        List<University> universities = universityService.getAllUniversities();
        return new ResponseEntity<>(universities, HttpStatus.OK);
    }

    // Get university by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUniversityById(@PathVariable Long id) {
        Optional<University> university = universityService.getUniversityById(id);
        if (university.isPresent()) {
            return new ResponseEntity<>(university.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("University not found with id: " + id, HttpStatus.NOT_FOUND);
        }
    }

    // Get university by name
    @GetMapping("/name/{name}")
    public ResponseEntity<?> getUniversityByName(@PathVariable String name) {
        Optional<University> university = universityService.getUniversityByName(name);
        if (university.isPresent()) {
            return new ResponseEntity<>(university.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("University not found with name: " + name, HttpStatus.NOT_FOUND);
        }
    }

    // Update university
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUniversity(@PathVariable Long id, @RequestBody University universityDetails) {
        try {
            University updatedUniversity = universityService.updateUniversity(id, universityDetails);
            return new ResponseEntity<>(updatedUniversity, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete university
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUniversity(@PathVariable Long id) {
        try {
            universityService.deleteUniversity(id);
            return new ResponseEntity<>("University deleted successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Search universities by location
    @GetMapping("/search/location")
    public ResponseEntity<List<University>> searchUniversitiesByLocation(@RequestParam String location) {
        List<University> universities = universityService.searchUniversitiesByLocation(location);
        return new ResponseEntity<>(universities, HttpStatus.OK);
    }

    // Search universities by name
    @GetMapping("/search/name")
    public ResponseEntity<List<University>> searchUniversitiesByName(@RequestParam String name) {
        List<University> universities = universityService.searchUniversitiesByName(name);
        return new ResponseEntity<>(universities, HttpStatus.OK);
    }

    // Get universities with student count
    @GetMapping("/analytics/student-count")
    public ResponseEntity<List<Object[]>> getUniversitiesWithStudentCount() {
        List<Object[]> universitiesWithCount = universityService.getUniversitiesWithStudentCount();
        return new ResponseEntity<>(universitiesWithCount, HttpStatus.OK);
    }
}