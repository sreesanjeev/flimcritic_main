import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './auth.css';

function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            navigate(`home`)
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Log In</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <a href="/register" className="auth-link">
                    Don't have an account? Register
                </a>
            </div>
        </div>
    );
}

export default Login;
