import React, { useEffect, useState } from 'react'
import { completeTodo, getAllTodos, inCompleteTodo, updateTodo } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'
import { deleteTodo } from '../services/TodoService'
import { isAdminUser } from '../services/AuthService'

const ListToDoComponent = () => {
const navigate = useNavigate();

const isAdmin = isAdminUser();

console.log("Admin func:",isAdmin);

useEffect(() => {
    listTodos();
}, [])

function listTodos(){
    getAllTodos().then((response) => {
        setTodos(response.data);
    }).catch(error => {
        console.error(error);
    })
}

function addNewTodo(){
    navigate('/add-todo')
}

function updateTodo(id){
    console.log(id);
    navigate(`/update-todo/${id}`);
}

function removeTodo(id){
    deleteTodo(id).then((response) => {
        listTodos();
    }).catch(error => {
        console.error(error);
    })
}

function markCompleteTodo(id){
    completeTodo(id).then((response) => {
        listTodos();
    }).catch(error => {
        console.error(error);
    })
}

function markInCompleteTodo(id){
    inCompleteTodo(id).then((response) => {
        listTodos();
    }).catch(error => {
        console.error(error);
    })
}

const [todos, setTodos] = useState([]);
  return (
    <div className='container'>
        <h2 className='text-center'>List of Todos</h2>
        {
            isAdmin && <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>

        }
        <div>
            <table className='table table-bordered table-stripped'>
                <thead className='text-center'>
                    <tr>
                        <th>Todo Title</th>
                        <th>Todo Description</th>
                        <th>Completed</th>
                        <th> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => 
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed? 'Yes':'No'}</td>
                                <td className='text-center'>
                                {
                                    isAdmin && <button className='btn btn-info' onClick={(e) => updateTodo(todo.id)}>Update</button>
                                }
                                {
                                    isAdmin && <button className='btn btn-danger' onClick={(e) => removeTodo(todo.id)} style={{marginLeft:"10px"}}>Delete</button>
                                }                                
                                <button className='btn btn-success' onClick={(e) => markCompleteTodo(todo.id)} style={{marginLeft:"10px"}}>Complete</button>
                                <button className='btn btn-info' onClick={(e) => markInCompleteTodo(todo.id)} style={{marginLeft:"10px"}}>InComplete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default ListToDoComponent