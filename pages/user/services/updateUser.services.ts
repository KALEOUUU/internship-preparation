import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosinstance";
import { User } from "@/pages/user/types/user";
import { PREFIX_KEY } from "@/pages/constant/common";
import toast from "react-hot-toast";

const PRIMARY_QUERY_KEY = "USERS";

interface dataUpdateUser {
  id: number;
  data: {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    image?: string;
  }
}

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: [PREFIX_KEY.PUT, PRIMARY_QUERY_KEY],
    mutationFn: async (data: dataUpdateUser) => {
      const response = await axiosInstance.put<User>(`users/update/${data.id}`, data.data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User updated successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to update user: ${error.message || "Unknown error"}`);
    },
  });
}