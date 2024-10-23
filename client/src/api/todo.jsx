import axios from "axios"

export const addTodo = async (form) =>{
    return axios.post('http://localhost:5002/tasks',form)
}

export const listTodo = async (form) =>{
    return axios.get('http://localhost:5002/tasks',form)
}

export const removeTodo = async (id) =>{
    return axios.delete('http://localhost:5002/tasks/'+id)
}

export const checkedTodo = async (id,is_checked) =>{
    return axios.patch('http://localhost:5002/tasks/'+id, is_checked )
}