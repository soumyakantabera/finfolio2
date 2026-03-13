import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';

export default function AdminLogin() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'Soumya01';
    if (passcode === adminPasscode) {
      sessionStorage.setItem('finfolio_admin', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect passcode. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | FinFolio</title>
      </Head>
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
    </>
  );
}

export function getStaticProps() {
  return { props: {} };
}
