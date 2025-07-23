import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import { LoginSchema, LoginSchemaType } from '../validation/login.schema';
import { useForm } from 'react-hook-form';
import { createYupResolver } from '../lib/api';
import { useLogin } from '../services/useLogin.services';


export default function LoginPage() {
  const { mutate, isPending, isSuccess, isError, error } = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
    resolver: createYupResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    mutate({ username: data.username, password: data.password });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: 350, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}
      >
        <Typography variant="h5" mb={2} align="center">Login</Typography>

        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(error as any)?.response?.data?.message || 'Login failed'}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Login berhasil! Mengarahkan ke dashboard...
          </Alert>
        )}

        <TextField
          label="Username"
          {...register('username')}
          fullWidth
          margin="normal"
          helperText={errors.username?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register('password')}
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
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Box>
    </Box>
  );
}
