import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3009/login', { username, password, role })
            .then(res => {
                if (res.data.success) {
                    console.log("Login successful", res.data.user);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    navigate('/');
                } else {
                    console.log("Login failed:", res.data.message);
                }
            })
            .catch(err => console.log("Error:", err));
    };

    return (
        <div className="login-page">
            <div className='login-container'>
                <h2>Login Page</h2><br/>
                <form onSubmit={handleSubmit}>
                    <div className='form-grp'>
                        <label htmlFor="username">Username:</label><br/>
                        <input 
                            type="text" 
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        /><br/>

                        <label htmlFor="password">Password:</label><br/>
                        <input 
                            type="password" 
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /><br/>

                        <label htmlFor="role">Role:</label><br/>
                        <select 
                            id="role" 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select><br/>
                    </div>
                    <button className='btn-login' type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
