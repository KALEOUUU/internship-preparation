"use client"
import { useState } from "react"
import { Card, CardContent, Typography, Avatar, Button, Grid, Box, Chip, TablePagination } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import PersonIcon from "@mui/icons-material/Person"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import VisibilityIcon from "@mui/icons-material/Visibility"

interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  image?: string
  gender?: string
  phone?: string
}

interface CardUserProps {
  users: User[]
  loading: boolean
  onViewProfile: (user: User) => void
  onEditUser: (user: User) => void
  onDeleteUser: (user: User) => void
}

export default function CardUser({ users, loading, onViewProfile, onEditUser, onDeleteUser }: CardUserProps) {
  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(12)

  // Calculate paginated users
  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <Typography>Loading...</Typography>
      </Box>
    )
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
          labelRowsPerPage="Cards per page:"
        />
      </Box>
      <Grid container spacing={3}>
        {paginatedUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                  <Avatar src={user.image} sx={{ width: 64, height: 64, mb: 1 }}>
                    {!user.image && `${user.firstName[0]}${user.lastName[0]}`}
                  </Avatar>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Chip
                    icon={<PersonIcon />}
                    label={`@${user.username}`}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                  <EmailIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "200px",
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>

                {user.gender && (
                  <Chip label={user.gender} size="small" color="primary" variant="outlined" sx={{ mb: 2 }} />
                )}

                {/* Action Buttons */}
                <Box display="flex" flexDirection="column" gap={1} mt="auto">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => onViewProfile(user)}
                    fullWidth
                  >
                    View Details
                  </Button>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => onEditUser(user)}
                      sx={{ flex: 1, color: "#013e87", borderColor: "#013e87" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDeleteUser(user)}
                      sx={{ flex: 1, color: "#d32f2f", borderColor: "#d32f2f" }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
