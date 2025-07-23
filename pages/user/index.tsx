"use client"

import { useEffect, useState } from "react"
import { Box, TextField, Typography, CircularProgress, ButtonGroup, Button, Paper } from "@mui/material"
import TableRowsIcon from "@mui/icons-material/TableRows"
import AppsIcon from "@mui/icons-material/Apps"
import TableUser from "./components/TableUser"
import CardUser from "./components/CardUser"
import { getAllUser, getSearchUser } from "./lib/api"

// Import komponen baru
import FormUser from "./components/FormUser"
import UserDetailModal from "./[id]"
import { createUser, updateUser, deleteUser } from "./lib/api"
import Swal from "sweetalert2"
import AddIcon from "@mui/icons-material/Add"
import { useFetchAllUsers } from "./service/useFetchAll.services"
import { useCreateUser } from "./service/useCreate.services"
import { useSearchUsers } from "./service/useSearch.services"
import { useDeleteUser } from "./service/useDelete.services"
import { useUpdateUser } from "./service/useUpdate.services"
import { set } from "react-hook-form"

const UserPage = () => {
  const [users, setUsers] = useState<any[]>([])
  // Hapus state loading manual, gunakan isLoading dari useFetchAllUsers
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  // State untuk mengontrol tampilan antara table dan card
  const [viewMode, setViewMode] = useState<"table" | "card">("table")

  // Tambahkan state baru
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "update">("create")
  const [editingUser, setEditingUser] = useState<any>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  const { data, isLoading } = useFetchAllUsers()
  const { mutate: createUserMutation, isPending: isCreating } = useCreateUser()
  const { data: searchData, isLoading: isSearching } = useSearchUsers(search, 0, 100)

  useEffect(() => {
    if (search.trim() === "") {
      if (data) setUsers(data.data.users)
    } else {
      if (searchData) setUsers(searchData.data.users)
      else setUsers([])
    }
    // eslint-disable-next-line
  }, [search, data, searchData])

  

  // Fungsi untuk handle create user
  const handleCreateUser = (userData: any) => {
    createUserMutation(
      {
        id: userData.id,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: "password123",
      },
      {
        onSuccess: (data: any) => {
          Swal.fire("Success", "User created successfully!", "success")
          setFormOpen(false)
          setUsers((prev) => [...prev, data])
        },
        onError: () => {
          Swal.fire("Error", "Failed to create user", "error")
        },
      }
    )
  }

  // Integrasi useUpdateUser
  const { mutate: updateUserMutation, isPending: isUpdating } = useUpdateUser()

  // Fungsi untuk handle update user
  const handleUpdateUser = (userData: any) => {
    updateUserMutation(
      {
        id: userData.id,
        firstname: userData.firstName,
        lastname: userData.lastName,
        email: userData.email,
        gender: userData.gender,
        phone: userData.phone,
        address: isNaN(Number(userData.address)) ? '0' : userData.address.toString(),
      },
      {
        onSuccess: (data: any) => {
          Swal.fire("Success", "User updated successfully!", "success")
          setFormOpen(false)
          setEditingUser(null)
          setUsers((prev) =>
            prev.map((user) => (user.id === userData.id ? { ...user, ...userData } : user)),
          )
        },
        onError: () => {
          Swal.fire("Error", "Failed to update user", "error")
        },
      }
    )
  }

  // Integrasi useDeleteUser
  const { mutate: deleteUserMutation, isPending: isDeleting } = useDeleteUser()

  // Fungsi untuk handle delete user
  const handleDeleteUser = async (user: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete user ${user.firstName} ${user.lastName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      deleteUserMutation(
        user.id,
        {
          onSuccess: () => {
            Swal.fire("Deleted!", "User has been deleted.", "success")
            setUsers((prev) => prev.filter((u) => u.id !== user.id))
            setDetailModalOpen(false)
          },
          onError: () => {
            Swal.fire("Error", "Failed to delete user", "error")
          },
        }
      )
    }
  }

  // Fungsi untuk handle edit user
  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setFormMode("update")
    setFormOpen(true)
    setDetailModalOpen(false)
  }

  // Fungsi untuk handle add user
  const handleAddUser = () => {
    setEditingUser(null)
    setFormMode("create")
    setFormOpen(true)
  }

  // Fungsi untuk handle form submit
  const handleFormSubmit = (userData: any) => {
    if (formMode === "create") {
      handleCreateUser(userData)
    } else {
      handleUpdateUser(userData)
    }
  }

  // Update handleViewProfile untuk membuka detail modal
  const handleViewProfile = (user: any) => {
    setSelectedUser(user)
    setDetailModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedUser(null)
  }

  // Fungsi untuk mengubah view mode
  const handleViewModeChange = (mode: "table" | "card") => {
    setViewMode(mode)
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} sx={{ color: "#013e87", textAlign: "center" }}>
        User Management
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search user by name, username, or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Controls Section */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Typography variant="h6" color="text.secondary">
            Total Users: {users.length}
          </Typography>

          <Box display="flex" gap={2} alignItems="center">
            {/* Tombol Add User */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddUser}
              sx={{
                bgcolor: "#013e87",
                "&:hover": {
                  bgcolor: "#012a5c",
                },
              }}
            >
              Add User
            </Button>

            {/* ButtonGroup untuk toggle view mode */}
            <ButtonGroup variant="contained" aria-label="view mode toggle">
              <Button
                startIcon={<TableRowsIcon />}
                onClick={() => handleViewModeChange("table")}
                variant={viewMode === "table" ? "contained" : "outlined"}
                sx={{
                  bgcolor: viewMode === "table" ? "#013e87" : "transparent",
                  color: viewMode === "table" ? "white" : "#013e87",
                  "&:hover": {
                    bgcolor: viewMode === "table" ? "#012a5c" : "rgba(1, 62, 135, 0.1)",
                  },
                }}
              >
                Table
              </Button>
              <Button
                startIcon={<AppsIcon />}
                onClick={() => handleViewModeChange("card")}
                variant={viewMode === "card" ? "contained" : "outlined"}
                sx={{
                  bgcolor: viewMode === "card" ? "#013e87" : "transparent",
                  color: viewMode === "card" ? "white" : "#013e87",
                  "&:hover": {
                    bgcolor: viewMode === "card" ? "#012a5c" : "rgba(1, 62, 135, 0.1)",
                  },
                }}
              >
                Card
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Paper>

      {/* Content Section dengan conditional rendering */}
      {(isLoading || isSearching) ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress sx={{ color: "#013e87" }} />
        </Box>
      ) : (
        <>
          {viewMode === "table" ? (
            <TableUser
              users={users}
              loading={isLoading}
              onViewProfile={handleViewProfile}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          ) : (
            <CardUser
              users={users}
              loading={isLoading}
              onViewProfile={handleViewProfile}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          )}
        </>
      )}

      <FormUser
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditingUser(null)
        }}
        onSubmit={handleFormSubmit}
        user={editingUser}
        mode={formMode}
      />

      {/* Detail Modal */}
      <UserDetailModal
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </Box>
  )
}

export default UserPage
