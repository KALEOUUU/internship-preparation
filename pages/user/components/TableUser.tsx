import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

interface TableUserProps {
  users: User[];
  loading: boolean;
  onViewProfile: (user: User) => void;
  page?: number;
}

const columns = (onViewProfile: (user: User) => void): GridColDef[] => [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'username', headerName: 'Username', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<User>) => (
      <Button variant="outlined" size="small" onClick={() => onViewProfile(params.row)}>
        View Profile
      </Button>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function TableUser({ users, loading, onViewProfile, page }: TableUserProps) {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns(onViewProfile)}
        page={page}
        rowsPerPageOptions={[10]}
        loading={loading}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}
