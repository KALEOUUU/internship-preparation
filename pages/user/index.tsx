import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Modal, CircularProgress } from '@mui/material';
import TableUser from './components/TableUser';
import UserProfile from './components/UserProfile';
import { getAllUser, getSearchUser } from './lib/api';

const UserPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUser();
      setUsers(res.data.users);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchUsers = async (query: string) => {
    setLoading(true);
    try {
      const res = await getSearchUser(query, 0, 100);
      setUsers(res.data.users);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim() === '') fetchUsers();
    else fetchSearchUsers(search);
    // eslint-disable-next-line
  }, [search]);

  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>User Management</Typography>
      <TextField
        label="Search user by name, username, or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <TableUser users={users} loading={loading} onViewProfile={handleViewProfile} />
      )}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          {selectedUser && <UserProfile user={selectedUser} onClose={handleCloseModal} />}
        </Box>
      </Modal>
    </Box>
  );
};

export default UserPage;
