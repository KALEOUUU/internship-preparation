"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PersonIcon from "@mui/icons-material/Person"
import type { User } from "@/pages/user/types/user"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { useFetchUserById } from "@/pages/user/services/getUserId.services"
import { use } from "react"

interface UserDetailModalProps {
  open: boolean
  onClose: () => void
  user: User | null
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export default function UserDetailModal({ open, onClose, user, onEdit, onDelete }: UserDetailModalProps) {
  const params = useParams();
  const userId = params?.id ? Number(params.id) : 0;
  const isValidId = userId > 0;

  const { data: userData, isLoading, isError } = useFetchUserById(userId);

  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Loading...</DialogTitle>
      </Dialog>
    )
  }

  if (isError || !userData) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Error loading user details</DialogTitle>
        <DialogContent>
          <Typography color="error">Failed to fetch user data.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  if (!isValidId) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Error loading user details</DialogTitle>
        <DialogContent>
          <Typography color="error">User ID tidak valid.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">User Details</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar src={userData.image} sx={{ width: 100, height: 100, mb: 2 }}>
            {!userData.image && `${userData.firstName[0]}${userData.lastName[0]}`}
          </Avatar>
          <Typography variant="h5" gutterBottom>
            {userData.firstName} {userData.lastName}
          </Typography>
          <Chip icon={<PersonIcon />} label={`@${userData.username}`} color="primary" variant="outlined" />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={2}>
              <EmailIcon sx={{ mr: 2, color: "text.secondary" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{userData.email}</Typography>
              </Box>
            </Box>
          </Grid>

          {userData.phone && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" mb={2}>
                <PhoneIcon sx={{ mr: 2, color: "text.secondary" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{userData.phone}</Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {userData.gender && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" mb={2}>
                <PersonIcon sx={{ mr: 2, color: "text.secondary" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Gender
                  </Typography>
                  <Chip label={userData.gender} size="small" color="secondary" />
                </Box>
              </Box>
            </Grid>
          )}

          {userData.address && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" mb={2}>
                <LocationOnIcon sx={{ mr: 2, color: "text.secondary" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1">
                    {userData.address.address}
                    {userData.address.city && `, ${userData.address.city}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  User ID
                </Typography>
                <Typography variant="body1">#{userData.id}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <Button onClick={() => onEdit(userData)} variant="outlined" sx={{ color: "#013e87", borderColor: "#013e87" }}>
          Edit User
        </Button>
        <Button onClick={() => onDelete(userData)} variant="contained" color="error">
          Delete User
        </Button>
      </DialogActions>
    </Dialog>
  )
}