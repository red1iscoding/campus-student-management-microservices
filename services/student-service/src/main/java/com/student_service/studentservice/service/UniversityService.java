package com.student_service.studentservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.student_service.studentservice.model.University;
import com.student_service.studentservice.repository.UniversityRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UniversityService {

    @Autowired
    private UniversityRepository universityRepository;

    // Create a new university
    public University createUniversity(University university) {
        // Validate university name is provided
        if (university.getName() == null || university.getName().trim().isEmpty()) {
            throw new RuntimeException("University name cannot be null or empty");
        }
        
        // Check if university with same name already exists
        if (universityRepository.existsByName(university.getName())) {
            throw new RuntimeException("University with name '" + university.getName() + "' already exists");
        }
        return universityRepository.save(university);
    }

    // Get all universities
    @Transactional(readOnly = true)
    public List<University> getAllUniversities() {
        return universityRepository.findAll();
    }

    // Get university by ID
    @Transactional(readOnly = true)
    public Optional<University> getUniversityById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return universityRepository.findById(id);
    }

    // Get university by name
    @Transactional(readOnly = true)
    public Optional<University> getUniversityByName(String name) {
        if (name == null || name.trim().isEmpty()) {
            return Optional.empty();
        }
        return universityRepository.findByName(name);
    }

    // Update university
    public University updateUniversity(Long id, University universityDetails) {
        if (id == null) {
            throw new RuntimeException("University id cannot be null");
        }
        
        // Validate university name is provided
        if (universityDetails.getName() == null || universityDetails.getName().trim().isEmpty()) {
            throw new RuntimeException("University name cannot be null or empty");
        }

        University university = universityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("University not found with id: " + id));

        // Check if name is being changed and if new name already exists
        if (!university.getName().equals(universityDetails.getName()) && 
            universityRepository.existsByName(universityDetails.getName())) {
            throw new RuntimeException("University with name '" + universityDetails.getName() + "' already exists");
        }

        university.setName(universityDetails.getName());
        university.setLocation(universityDetails.getLocation());

        return universityRepository.save(university);
    }

    // Delete university
    public void deleteUniversity(Long id) {
        if (id == null) {
            throw new RuntimeException("University id cannot be null");
        }
        
        University university = universityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("University not found with id: " + id));
        
        // Check if university has students
        if (!university.getStudents().isEmpty()) {
            throw new RuntimeException("Cannot delete university with existing students. Please reassign or delete students first.");
        }
        
        universityRepository.delete(university);
    }

    // Search universities by location
    @Transactional(readOnly = true)
    public List<University> searchUniversitiesByLocation(String location) {
        if (location == null || location.trim().isEmpty()) {
            return List.of(); // Return empty list instead of null
        }
        return universityRepository.findByLocation(location);
    }

    // Search universities by name containing
    @Transactional(readOnly = true)
    public List<University> searchUniversitiesByName(String name) {
        if (name == null || name.trim().isEmpty()) {
            return List.of(); // Return empty list instead of null
        }
        return universityRepository.findByNameContainingIgnoreCase(name);
    }

    // Get universities with student count (for analytics)
    @Transactional(readOnly = true)
    public List<Object[]> getUniversitiesWithStudentCount() {
        return universityRepository.findUniversitiesWithStudentCount();
    }

    // Check if university exists
    @Transactional(readOnly = true)
    public boolean universityExists(Long id) {
        if (id == null) {
            return false;
        }
        return universityRepository.existsById(id);
    }
}