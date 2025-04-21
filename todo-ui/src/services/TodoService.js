import axios from 'axios';
import { getToken } from './AuthService';

const Rest_api_url = "http://localhost:8080/api/todos";

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
}, function(error){
    return Promise.reject(error);
});

export const getAllTodos = () =>  axios.get(Rest_api_url);

export const saveTodo = (todo) => axios.post(Rest_api_url, todo);

export const getTodo = (id) => axios.get(Rest_api_url + '/' + id);

export const updateTodo = (id, todo) => axios.put(Rest_api_url + '/' + id , todo);

export const deleteTodo = (id) => axios.delete(Rest_api_url + '/' + id); 

export const completeTodo = (id) => axios.patch(Rest_api_url + '/' + id +  '/complete');

export const inCompleteTodo = (id) => axios.patch(Rest_api_url + '/' + id +  '/inComplete');