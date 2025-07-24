"use client"
import { useState } from "react"
import { Card, CardContent, Typography, Avatar, Button, Grid, Box, Chip, TablePagination } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import PersonIcon from "@mui/icons-material/Person"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useFetchUsers } from "../services/fetchAllUser.services"
import { User } from "../types/user"
import DeleteUserButton from "./DeletUser"
import { error } from "console"

interface CardUserProps {
  users: User[]
  loading: boolean
  onViewProfile: (user: User) => void
  onEditUser: (user: User) => void
  onDeleteUser: (user: User) => void
}

export default function CardUser({ users, loading, onViewProfile, onEditUser, onDeleteUser }: CardUserProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);  // 

  const { data, isLoading } = useFetchUsers({
    skip: currentPage * itemsPerPage,
    limit: itemsPerPage
  });

  const usersData = data?.users || [];
  const totalCount = data?.total || 0;

  const handlePageChange = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <Typography color="loading">Loading users</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 4 }}>
        <TablePagination
          component="div"
          count={totalCount}
          page={currentPage}
          rowsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[3, 6, 12, 24, 48]}
          labelRowsPerPage="Cards per page:"
        />
      </Box>
      <Grid container spacing={3}>
        {usersData.map((users) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={users.id}>
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
                  <Avatar src={users.image} sx={{ width: 64, height: 64, mb: 1 }}>
                    {!users.image && `${users.firstName[0]}${users.lastName[0]}`}
                  </Avatar>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {users.firstName} {users.lastName}
                  </Typography>
                  <Chip
                    icon={<PersonIcon />}
                    label={`@${users.username}`}
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
                    {users.email}
                  </Typography>
                </Box>

                {users.gender && (
                  <Chip label={users.gender} size="small" color="primary" variant="outlined" sx={{ mb: 2 }} />
                )}

                {/* Action Buttons */}
                <Box display="flex" flexDirection="column" gap={1} mt="auto">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => onViewProfile(users)}
                    fullWidth
                  >
                    View Details
                  </Button>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => onEditUser(users)}
                      sx={{ flex: 1, color: "#013e87", borderColor: "#013e87" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDeleteUser(users)}
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
  );
}
