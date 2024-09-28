package com.example.assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.assignment.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo,Long> {
	
}