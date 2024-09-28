package com.example.assignment.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.assignment.entity.LoginRequest;
import com.example.assignment.entity.Todo;
import com.example.assignment.entity.User;
import com.example.assignment.repository.UserRepo;
import com.example.assignment.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private UserService userService;
    
    @Autowired
    private UserRepo userrepo;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService; // Ensure this is injected properly
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
    
    @GetMapping
    public List<User> getAllTodos() {
        return userService.getAllUsers();
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws Exception {
    	System.out.println(loginRequest.getUsername());
    	Optional<User> userOpt = userrepo.findByUsername(loginRequest.getUsername());
    	System.out.println(userOpt);
    	if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(user.getRole());  
            } else {
               
                return ResponseEntity.status(401).body("Invalid Credentials");
            }
        } else {
            
            return ResponseEntity.status(404).body("User Not Found");
        }
    }
}
