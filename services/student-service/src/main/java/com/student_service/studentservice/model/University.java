package com.student_service.studentservice.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "university")
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "university", cascade = CascadeType.ALL, fetch = FetchType.LAZY)

    @JsonIgnore // ← ADD THIS LINE
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // ← ADD THIS LINE

    private List<Student> students = new ArrayList<>();

    public University() {}

    public University(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public List<Student> getStudents() { return students; }
    public void setStudents(List<Student> students) { this.students = students; }

    public void addStudent(Student student) {
        students.add(student);
        student.setUniversity(this);
    }

    public void removeStudent(Student student) {
        students.remove(student);
        student.setUniversity(null);
    }

    public String toString() {
        return "University^{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}
