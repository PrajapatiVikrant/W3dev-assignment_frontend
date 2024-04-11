// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Form.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Perform login operation with email and password
    const response = await axios.post(`https://green-salesmen-rzdwh.pwskills.app:3000/auth/login?email=${email}&password=${password}`);
    console.log(response)
    
    localStorage.setItem('token',response.data.token)
    alert(response.data.message)
    if(response.data.message === "Login successfully"){
      navigate('/todo')
    }
   
   
    
    setEmail('')
    setPassword('');
  };

  return (
    
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>If you have not account?<Link to='/signup'>SignUp</Link></p>
      </form>
    </div>
  );
};

export default Login;
