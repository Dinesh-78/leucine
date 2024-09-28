package com.example.assignment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @OneToMany(mappedBy = "department")
    private List<StudentProfile> students;

    @OneToMany(mappedBy = "department")
    private List<FacultyProfile> facultyMembers;

    @OneToMany(mappedBy = "department")
    private List<AdministratorProfile> administrators;

    @OneToMany(mappedBy = "department")
    private List<Course> courses;
}
