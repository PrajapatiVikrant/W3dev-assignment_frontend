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
     

     const response = await axios.get('https://green-salesmen-rzdwh.pwskills.app:3000/todo', {
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
      
    const response = await axios.put(`https://green-salesmen-rzdwh.pwskills.app:3000/todo/${editIndex}?updateData=${inputValue}`,{}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
        }
    });
      alert(response.data.message)
      setEditIndex(null);
    }else{
      
      const response = await axios.post(`https://green-salesmen-rzdwh.pwskills.app:3000/todo?newData=${inputValue}`,{}, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
          }
      });
      alert(response.data.message)
    }
    
    
     
    setInputValue('');
  };

  const handleEdit = (index) => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

  const handleDelete = async(index) => {
    
    const response = await axios.delete(`https://green-salesmen-rzdwh.pwskills.app:3000/todo/${index}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
          }
      });
      alert(response.data.message)
  };

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
            {todo}
            <div>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
