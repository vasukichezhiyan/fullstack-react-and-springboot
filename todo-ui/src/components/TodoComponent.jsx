import React, { useEffect, useState } from 'react'
import { getTodo, saveTodo, updateTodo } from '../services/TodoService';
import { useNavigate, useParams } from 'react-router-dom'


const TodoComponent = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription ] = useState('');
    const [completed, setCompleted] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if(id){
            getTodo(id).then((response) => {
                console.log(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setCompleted(response.data.completed);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id])
    

    function saveorUpdateTodo(e)
    {
        e.preventDefault();

        const todo = {title,description,completed}
        console.log(todo);

        if(id){
            updateTodo(id, todo).then((response) => {
                navigate('/todos')
            }).catch(error => {
                console.error(error);
            })
        }else{
            saveTodo(todo).then((response) => {
                console.log(response.data);
                navigate('/todos')
            }).catch(error => {
                console.error(error);
            })
        }        
    }
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Todo</h2>
        }else{
            return <h2 className='text-center'>Add Todo</h2>
        }
    }

  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                { pageTitle() }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Title:</label>
                            <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter Todo title'
                            name='title'
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}></input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Description:</label>
                            <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter Todo description'
                            name='description'
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}></input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Todo Completed:</label>
                            <select 
                                className='form-control'
                                value={completed}
                                onChange={(e)=>setCompleted(e.target.value === 'true')}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <button className='btn btn-success mb-2' onClick={(e) => saveorUpdateTodo(e)}>Submit</button>
                    </form>
                </div>

            </div>

        </div>

    </div>
  )
}

export default TodoComponent