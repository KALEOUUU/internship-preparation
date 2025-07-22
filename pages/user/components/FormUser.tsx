"use client";

import React, { useEffect } from "react";
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
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserSchema,
  editUserSchema,
  CreateSchemaType,
  EditSchemaType,
} from "../validation/user.schema";
import type { User } from "../types/user";
import { createYupResolver } from "../lib/api";

interface FormUserProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: CreateSchemaType | EditSchemaType, id?: number) => void;
  user?: User | null;
  mode: "create" | "update";
}

export default function FormUser({
  open,
  onClose,
  onSubmit,
  user,
  mode,
}: FormUserProps) {
  const schema = mode === "create" ? createUserSchema : editUserSchema;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateSchemaType | EditSchemaType>({
    resolver: createYupResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      image: undefined,
      gender: undefined,
      phonenumber: "",
      address: "",
      city: "",
    },
  });

  // Auto-fill data saat edit
  useEffect(() => {
    if (mode === "update" && user) {
      reset({
        firstname: user.firstName || "",
        lastname: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        gender: (user.gender as "male" | "female") || "",
        phonenumber: user.phone || "",
        address: user.address?.address || "",
        city: user.address?.city || "",
        image: undefined,
      });
    } else if (mode === "create") {
      reset({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        gender: undefined,
        phonenumber: "",
        address: "",
        city: "",
        image: undefined,
      });
    }
  }, [user, mode, open, reset]);

  const genderValue = watch("gender") || "";

  const handleFormSubmit: SubmitHandler<CreateSchemaType | EditSchemaType> = (
    data
  ) => {
    if (mode === "update") {
      onSubmit(data, user?.id);
    } else {
      onSubmit(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          {user?.image && <Avatar src={user.image} />}
          <Typography variant="h6">
            {mode === "update" ? "Edit User" : "Create New User"}
          </Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                {...register("firstname")}
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                {...register("lastname")}
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                fullWidth
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  value={genderValue}
                  onChange={(e) =>
                    setValue("gender", e.target.value as "male" | "female")
                  }
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                  {errors.gender?.message}
                </Typography>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                fullWidth
                {...register("phonenumber")}
                error={!!errors.phonenumber}
                helperText={errors.phonenumber?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                fullWidth
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                fullWidth
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setValue("image", file || undefined);
                }}
              />
              <Typography variant="caption" color="error">
                {errors.image?.message}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ bgcolor: "#013e87" }}>
            {mode === "update" ? "Update User" : "Create User"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
