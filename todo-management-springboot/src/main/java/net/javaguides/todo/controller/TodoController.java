package net.javaguides.todo.controller;

import lombok.AllArgsConstructor;
import net.javaguides.todo.dto.TodoDto;
import net.javaguides.todo.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
public class TodoController {

    private TodoService todoService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping()
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto)
    {
        TodoDto savedTodoDto = todoService.addToDo(todoDto);
        return new ResponseEntity<>(savedTodoDto, HttpStatus.CREATED);

    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable("id") Long todoId)
    {
        TodoDto savedTodoDto = todoService.getToDo(todoId);
        return new ResponseEntity<>(savedTodoDto, HttpStatus.OK);

    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping()
    public ResponseEntity<List<TodoDto>> getAllTodos(){
        List<TodoDto> todos = todoService.getAllToDo();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<TodoDto> updateToDo(@RequestBody TodoDto todoDto, @PathVariable Long id){
        TodoDto savedTodo = todoService.updateToDo(todoDto, id);
        return new ResponseEntity<>(savedTodo, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteToDo(@PathVariable("id") Long todoId)
    {
        todoService.deleteToDo(todoId);
        return new ResponseEntity<>("ToDo deleted successfully", HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/complete")
    public ResponseEntity<TodoDto> completeToDo(@PathVariable("id") Long todoId){
        TodoDto updatedTodoDto = todoService.completeToDo(todoId);
        return new ResponseEntity<>(updatedTodoDto, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/inComplete")
    public ResponseEntity<TodoDto> inCompleteToDo(@PathVariable("id") Long todoId){
        TodoDto updatedTodoDto = todoService.inCompleteToDo(todoId);
        return new ResponseEntity<>(updatedTodoDto, HttpStatus.OK);
    }

}
