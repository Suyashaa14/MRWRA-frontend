import React, { useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is set to 'user'
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend API endpoint for signup
      const response = await axios.post('http://localhost:8005/auth/register', {
        firstName,
        lastName,
        email,
        password,
        role,
      });

      // Handle successful signup response (if needed)
      console.log(response.data);

      // Optionally, you can redirect the user to a login page after successful signup
      // Example: history.push('/login');
    } catch (error) {
      setError('Signup failed. Please try again.'); // Handle signup failure
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          InputLabelProps={{ style: { color: '#fff' } }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          InputLabelProps={{ style: { color: '#fff' } }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          InputLabelProps={{ style: { color: '#fff' } }}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="role-label" style={{ color: '#fff' }}>Role</InputLabel>
          <Select
            labelId="role-label"
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Signup
        </Button>
        {error && <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
      </form>
    </Container>
  );
};

export default Signup;
