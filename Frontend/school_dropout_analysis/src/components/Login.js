import React, { useState } from 'react';
import { TextField, Button, FormControl, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here
    // You can send the email and password to your backend for authentication
    if (email === 'admin@example.com' && password === 'password123') {
      // Successful login
      console.log('Login successful!');
    } else {
      // Login failed
      setError('Invalid email or password');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <FormControl fullWidth>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            className="form-input"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            className="form-input"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        {error && <div className="error-message">{error}</div>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="login-btn"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;