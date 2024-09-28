package com.example.assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.assignment.entity.User;
import com.example.assignment.repository.UserRepo;
import com.example.assignment.service.UserService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")

public class AdminController {

private UserService userService;
    
    @Autowired
    private UserRepo userrepo;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService; // Ensure this is injected properly
    }
    
    @GetMapping("/records")
    public List<User> getAllRecords() {
        return userrepo.findAll();
    }

    // Add a new record
    @PostMapping("/records")
    public User addRecord(@RequestBody User user) {
        return userrepo.save(user);
    }

    // Update an existing record
    @PutMapping("/records/{id}")
    public User updateRecord(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userrepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userDetails.getName());
        user.setRole(userDetails.getRole());
        user.setEmail(userDetails.getEmail());
        return userrepo.save(user);
    }

    // Delete a record
    @DeleteMapping("/records/{id}")
    public void deleteRecord(@PathVariable Long id) {
        User user = userrepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        userrepo.delete(user);
    }
}


