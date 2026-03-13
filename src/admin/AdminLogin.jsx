import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';

export default function AdminLogin({ setIsAdmin }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode === 'Soumya01') {
      setIsAdmin(true);
      sessionStorage.setItem('finfolio_admin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect passcode. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', p: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={1} textAlign="center">
          Admin Login
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
          Enter the admin passcode to continue.
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Passcode"
            type="password"
            fullWidth
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value);
              setError('');
            }}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth size="large">
            Login
          </Button>
        </form>
      </Card>
    </Box>
  );
}
