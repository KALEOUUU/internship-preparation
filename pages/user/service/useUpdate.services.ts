import { use } from "react";
import { updateUser } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      password?: string;
      gender?: string;
      phone: number;
      address: string;
    }) =>
      updateUser(
        userData.id,
        userData.firstname,
        userData.lastname,
        userData.email,
        userData.gender ?? "",
        userData.phone,
        userData.address
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
};