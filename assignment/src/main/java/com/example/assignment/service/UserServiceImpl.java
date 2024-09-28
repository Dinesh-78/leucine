package com.example.assignment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.assignment.entity.User;

import com.example.assignment.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepo userRepo;
	
	@Autowired
    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo; // Ensure this is injected properly
    }
	
	@Override
	public User createUser(User user) {
		// TODO Auto-generated method stub
		return userRepo.save(user);
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return userRepo.findAll();
	}

}
