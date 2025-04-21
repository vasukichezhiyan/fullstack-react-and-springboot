package net.javaguides.todo.service;


import net.javaguides.todo.dto.TodoDto;

import java.util.List;

public interface TodoService {

    TodoDto addToDo(TodoDto todoDto);

    TodoDto getToDo(Long id);

    List<TodoDto> getAllToDo();

    TodoDto updateToDo(TodoDto todoDto, Long id);

    void deleteToDo(Long id);

    TodoDto completeToDo(Long id);

    TodoDto inCompleteToDo(Long id);

}
