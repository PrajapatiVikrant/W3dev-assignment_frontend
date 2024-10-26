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
     
   console.log(response.data.message)
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

  const handleEdit = (text,id) => {
    setInputValue(text);
    setEditIndex(id);
  };
  const handleCheck = (id,checkstatus)=>{
    const response = await axios.put(`https://w3dev-assignment-backend.vercel.app/todo/check/${id}/${checkstatus}`)
    alert(response.data.message)
  }
  const handleDelete = async(id) => {
    
    const response = await axios.delete(`https://w3dev-assignment-backend.vercel.app/todo/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
          }
      });
      alert(response.data.message)
  };

  return (
    
  );
};

export default TodoList;
