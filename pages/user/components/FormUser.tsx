"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar,
  Typography,
} from "@mui/material"
import type { User } from "../types/user"

interface FormUserProps {
  open: boolean
  onClose: () => void
  onSubmit: (userData: any) => void
  user?: User | null
  mode: "create" | "edit"
}

export default function FormUser({ open, onClose, onSubmit, user, mode }: FormUserProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    city: "",
  })

  useEffect(() => {
    if (user && mode === "edit") {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        gender: user.gender || "",
        phone: user.phone || "",
        address: user.address?.address || "",
        city: user.address?.city || "",
      })
    } else {
      // Reset form untuk mode create
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        gender: "",
        phone: "",
        address: "",
        city: "",
      })
    }
  }, [user, mode, open])

  const handleChange = (field: string) => (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      id: user?.id,
    }
    onSubmit(submitData)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          {user?.image && <Avatar src={user.image} />}
          <Typography variant="h6">{mode === "edit" ? "Edit User" : "Create New User"}</Typography>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                value={formData.username}
                onChange={handleChange("username")}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select value={formData.gender} label="Gender" onChange={handleChange("gender")}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone" value={formData.phone} onChange={handleChange("phone")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Address" value={formData.address} onChange={handleChange("address")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="City" value={formData.city} onChange={handleChange("city")} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ bgcolor: "#013e87" }}>
            {mode === "edit" ? "Update User" : "Create User"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
