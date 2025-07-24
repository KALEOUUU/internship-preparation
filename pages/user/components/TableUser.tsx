"use client"

// import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useEffect } from "react"
import { Box, Button, TablePagination, Typography } from "@mui/material"
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid"
import { useState } from "react"
import { User } from "../types/user"
import { useFetchUsers } from "../services/fetchAllUser.services"
import { useDeleteUser } from "../services/deleteUser.services"

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
  users = [],
  loading,
  onViewProfile,
  onEditUser,
  onDeleteUser,
  page: initialPage = 0,
}: TableUserProps) {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { mutate, isPending, data: userData } = useDeleteUser()

  const { data, error } = useFetchUsers({
    skip: page * rowsPerPage,
    limit: rowsPerPage,
  })
  const paginatedUsers = data?.users || []
  const totalCount = data?.total || 0

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <Typography color="error">Gagal fetch data user: {error.message || "Unknown error"}</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 4 }}>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
        />
      </Box>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={paginatedUsers}
          columns={columns(onViewProfile, onEditUser, onDeleteUser)}
          rowCount={users.length}
          loading={loading}
          disableRowSelectionOnClick
          autoHeight
          hideFooterPagination
        />
      </div>
    </Box>
  )
}
