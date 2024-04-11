// SignUp.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Form.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const navigate = useNavigate()
  const handleSubmit = async(event) => {
    event.preventDefault();
    // Perform signup operation with name, email, and password
    const response = await axios.post(`https://green-salesmen-rzdwh.pwskills.app:3000/auth/signUp?name=${name}&email=${email}&password=${password}`);
    localStorage.setItem('token',response.data.token)
    navigate('/todo')
    setName('')
    setEmail('')
    setPassword('');
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
        <p>If you have already account?<Link to='/'>Login</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
