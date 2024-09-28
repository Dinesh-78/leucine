package com.example.assignment.service;


import java.util.List;

import com.example.assignment.entity.User;

public interface UserService {

	User createUser(User user);

	List<User> getAllUsers();
}
