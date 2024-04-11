// App.js
import React from 'react';
import TodoList from './Component/Todolist';
import { Route, Routes } from 'react-router-dom'

import "./App.css"
import Login from './Component/Login';
import SignUp from './Component/SignUp';


const App = () => {
  return (
    <div>
     <Routes>
      <Route path='/' Component={Login}/>
      <Route path='/signup' Component={SignUp}/>
      <Route path='/todo' Component={TodoList}/>
     </Routes>
     
      
    
    </div>
  );
};

export default App;
