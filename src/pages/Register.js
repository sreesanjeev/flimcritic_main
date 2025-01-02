import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null); // Reset any previous error

        try {
            // Make sure the URL points to the correct backend server (usually on port 5000)
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            alert('Registration successful');
            window.location.href = '/login';  // Redirect to login after success
        } catch (error) {
            // Set the error message from response, or use a default message
            setError(error.response?.data?.error || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
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
                    <button type="submit">Sign Up</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <a href="/" className="auth-link">
                    Already have an account? Log in
                </a>
            </div>
        </div>
    );
}

export default Register;
