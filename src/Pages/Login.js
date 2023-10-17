import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8005/auth/login', {
        email,
        password,
        role: 'user', // You can set the default role here or dynamically based on user selection
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

    } catch (error) {
      setError('Invalid Credentials. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          color="primary"
          InputLabelProps={{ style: { color: '#fff' } }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          color="primary"
          InputLabelProps={{ style: { color: '#fff' } }}
        />
        <Button type="submit" variant="contained" fullWidth style={{ marginTop: '20px' }}>
          Login
        </Button>
        {error && <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
      </form>
    </Container>
  );
};

export default LoginForm;
