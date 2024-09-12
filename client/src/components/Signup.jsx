import React, { useState } from 'react';
import axios from 'axios';
import '../css/signup.css';
import { Navigate, useNavigate } from 'react-router-dom';
function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const Navigate=useNavigate();
    const handleSubmit = () => {
        const url = role === 'admin' ? 'http://localhost:3009/adminsignup' : 'http://localhost:3008/studentsignup';
        
        axios.post(url, { username, password })
            .then(res => {
                if (res.data.success) {
                    console.log("Signup successful", res.data.user);
                    
                    Navigate('/login')
                } else {
                    console.log("Signup failed:", res.data.message);
                }
            })
            .catch(err => console.log("Error:", err));
    };

    return (
        <div className="signup-page">
            <div className='signup-container'>
                <h2>Signup </h2><br/>
                <div className='form-group'>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br/>

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br/>

                    <label htmlFor="role">Role:</label>
                    <select 
                        id="role" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select><br/>
                </div>
                <button className='btn-signup' onClick={handleSubmit}>Signup</button>
            </div>
        </div>
    );
}

export default Signup;
