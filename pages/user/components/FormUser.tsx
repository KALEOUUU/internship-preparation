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
import { useCreateUser } from "../services/createUser.services";
import { useRouter } from "next/navigation";

interface FormUserProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: CreateSchemaType | EditSchemaType, id?: number) => void;
  user?: User | null;
  mode: "create";
}

type UserFormData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  image?: File | null;
}

export default function FormUser({
  open,
  onClose,
  user,
  mode = "create",
}: FormUserProps) {
  const schema = createUserSchema;
  const router = useRouter();

  const { mutate, status } = useCreateUser();

  const onSubmit = (data: UserFormData) => {
    mutate({ data: {
      firstName: data.firstname,
      lastName: data.lastname,
      username: data.username,
      email: data.email,
      image: data.image ? URL.createObjectURL(data.image) : '',
      password: "",
      gender: "",
      phone: 0,
      address: "",
      city: ""
    }}, {
      onSuccess: () => {
        reset();
        setTimeout(() => {
          router.push("/user");
        }, 1500);
      },
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateSchemaType>({
    resolver: createYupResolver(createUserSchema),
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

  // Tidak perlu auto-fill data untuk update

  const genderValue = watch("gender") || "";

  const handleFormSubmit: SubmitHandler<CreateSchemaType | EditSchemaType> = (
      data
    ) => {
      const formData: UserFormData = {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        image: data.image instanceof File ? data.image : null
      };
      onSubmit(formData);
    };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          {user?.image && <Avatar src={user.image} />}
          <Typography variant="h6">
            Create New User
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
                  if (file) {
                    setValue("image", file);
                  }
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
            Create User
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
