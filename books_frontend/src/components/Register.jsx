import React, { useState } from "react"
import { Box, Typography, TextField, Button, Paper, Link} from '@mui/material'
import {API_URL} from '../constants/env'
import axios from 'axios'
import { Link as RouterLink } from "react-router-dom";


export const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setMessage("Passwords is not the same");
      return;
    }

    try {
       await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password

      });
      setMessage('Successful registration')
      setUsername('')
      setPassword('')
      setRepeatPassword('')
      setEmail('')
    } catch (error) {
        setMessage('Registration error. Seems that this user is existed')
        console.error(error)      
    }
  }
    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
          <Typography variant="h5" mb={2}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
            <TextField
            fullWidth
            label="Repeat Password"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            margin="normal"
            required
          />
            <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor:'#2c3755' }}>
            Register
          </Button>
        </form>
        {message && (
          <Typography variant="body2" mt={2} color="secondary">
            {message}
          </Typography>
        )}
        <Typography variant="body2" mt={3}>
          Do you already have account?{" "}
          <Link component={RouterLink} to="/login">
            Sign In
          </Link>
        </Typography>
        </Paper>
      </Box>
    )
}

export default Register