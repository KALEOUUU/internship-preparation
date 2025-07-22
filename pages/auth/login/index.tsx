import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import { LoginSchema, LoginSchemaType } from '../validation/login.schema';
import { useForm } from 'react-hook-form';
import { createYupResolver } from '../lib/api';
import { login } from '../lib/api';

import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
    resolver: createYupResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await login(data.username, data.password);
      setSuccess('Login successful!');
      router.push('/user');
      console.log(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: 350, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h5" mb={2} align="center">Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <TextField
          label="Username"
          value={username}
          {...register('username', { required: true })}
          onChange={e => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          helperText={errors.username?.message}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          {...register('password', { required: true })}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Box>
    </Box>
  );
};
