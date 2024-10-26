// TodoList.js
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  useEffect(()=>{
    getData();
  })
  const getData = async()=>{
     

     const response = await axios.get('https://w3dev-assignment-backend.vercel.app/todo', {
         headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
         }
         
     });

     
 
   setTodos(response.data.message)
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (editIndex !== null) {
      
    const response = await axios.put(`https://w3dev-assignment-backend.vercel.app/todo/${editIndex}?updateData=${inputValue}`,{}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
        }
    });
      alert(response.data.message)
      setEditIndex(null);
    }else{
      
      const response = await axios.post(`https://w3dev-assignment-backend.vercel.app/todo?newData=${inputValue}`,{}, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
          }
      });
      alert(response.data.message)
    }
    
    
     
    setInputValue('');
  };

  // const handleEdit = (text,id) => {
  //   setInputValue(text);
  //   setEditIndex(id);
  // };
  // const handleCheck = (id,checkstatus)=>{
  //   const response = await axios.put(`https://w3dev-assignment-backend.vercel.app/todo/check/${id}/${checkstatus}`)
  //   alert(response.data.message)
  // }
  // const handleDelete = async(id) => {
    
  //   const response = await axios.delete(`https://w3dev-assignment-backend.vercel.app/todo/${id}`, {
  //         headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
  //         }
  //     });
  //     alert(response.data.message)
  // };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your todo..."
        />
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
           <input type="checkbox" onClick={()=>handleCheck(todo._id)}/> {todo.text}
            <div>
              <button onClick={() => handleEdit(todo._id,todo.text)}>Edit</button>
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
