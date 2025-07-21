"use client"

import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Box, Button, TablePagination } from "@mui/material"
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid"
import { useState } from "react"

// Definisikan tipe data User (ganti dengan tipe data yang sesuai)
interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
}

interface TableUserProps {
  users: User[]
  loading: boolean
  onViewProfile: (user: User) => void
  onEditUser: (user: User) => void
  onDeleteUser: (user: User) => void
  page?: number
}

const columns = (
  onViewProfile: (user: User) => void,
  onEditUser: (user: User) => void,
  onDelete: (user: User) => void
): GridColDef[] => [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params: GridRenderCellParams<User>) => (
      <Box display="flex" gap={1}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={() => onViewProfile(params.row)}
        >
          View
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onEditUser(params.row)}
          color="primary"
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(params.row)}
          color="error"
        >
          Delete
        </Button>
      </Box>
    ),
    sortable: false,
    filterable: false,
  },
]

export default function TableUser({
  users,
  loading,
  onViewProfile,
  onEditUser,
  onDeleteUser,
  page: initialPage = 0,
}: TableUserProps) {
  // Pagination state
  const [page, setPage] = useState(initialPage)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Calculate paginated users
  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 4 }}>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[3, 6, 12, 24, 48]}
          labelRowsPerPage="Rows per page:"
        />
      </Box>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={paginatedUsers}
          columns={columns(onViewProfile, onEditUser, onDeleteUser)}
          rowCount={users.length}
          pageSizeOptions={[3, 6, 12, 24, 48]}
          loading={loading}
          disableRowSelectionOnClick
          autoHeight
          hideFooterPagination
        />
      </div>
    </Box>
  )
}
