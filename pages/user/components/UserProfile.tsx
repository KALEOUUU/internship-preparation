import React from 'react';
import { Card, CardContent, Typography, Avatar, IconButton, Box, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface UserProfileProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    image?: string;
    gender?: string;
    phone?: string;
    address?: { address: string; city: string };
    [key: string]: any;
  };
  onClose: () => void;
}

export default function UserProfile({ user, onClose }: UserProfileProps) {
  return (
    <Card sx={{ maxWidth: 400, position: 'relative', p: 2 }}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar src={user.image} sx={{ width: 80, height: 80, mb: 1 }} />
        <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
        <Typography variant="body2" color="text.secondary">@{user.username}</Typography>
      </Box>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={5}><Typography variant="body2">Email:</Typography></Grid>
          <Grid item xs={7}><Typography variant="body2">{user.email}</Typography></Grid>
          {user.gender && (
            <>
              <Grid item xs={5}><Typography variant="body2">Gender:</Typography></Grid>
              <Grid item xs={7}><Typography variant="body2">{user.gender}</Typography></Grid>
            </>
          )}
          {user.phone && (
            <>
              <Grid item xs={5}><Typography variant="body2">Phone:</Typography></Grid>
              <Grid item xs={7}><Typography variant="body2">{user.phone}</Typography></Grid>
            </>
          )}
          {user.address && (
            <>
              <Grid item xs={5}><Typography variant="body2">Address:</Typography></Grid>
              <Grid item xs={7}><Typography variant="body2">{user.address.address}, {user.address.city}</Typography></Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
