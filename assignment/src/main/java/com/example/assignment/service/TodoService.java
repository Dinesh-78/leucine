package com.example.assignment.service;




import java.util.List;

import com.example.assignment.entity.Todo;

public interface TodoService {
    List<Todo> getAllTodos();
    Todo getTodoById(Long id) throws Exception;
    Todo createTodo(Todo todo);
    Todo updateTodo(Long id, Todo todo) throws Exception;
    void deleteTodo(Long id);

    Todo updateStatus(Long id) throws Exception;
}