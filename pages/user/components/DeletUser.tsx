import { Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteUser } from "../services/deleteUser.services";
import React from "react";

interface DeleteUserButtonProps {
  userId: number;
  onSuccess?: () => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ userId, onSuccess }) => {
  const { mutate, isPending } = useDeleteUser();

  const handleDelete = () => {
    mutate(
      { id: userId },
      {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      }
    );
  };

  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={isPending ? <CircularProgress size={18} /> : <DeleteIcon />}
      onClick={handleDelete}
      disabled={isPending}
    >
      Delete
    </Button>
  );
};

export default DeleteUserButton;
