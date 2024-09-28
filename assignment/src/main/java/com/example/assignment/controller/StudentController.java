package com.example.assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.assignment.entity.User;
import com.example.assignment.repository.UserRepo;
import com.example.assignment.service.UserService;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
	
private UserService userService;
    
    @Autowired
    private UserRepo userrepo;

    @Autowired
    public StudentController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping
    public List<User> getAllTodos() {
        return userService.getAllUsers();
    }

 
}
