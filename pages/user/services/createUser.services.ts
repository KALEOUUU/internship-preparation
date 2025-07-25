import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosinstance";
import { User } from "@/pages/user/types/user";
import { PREFIX_KEY } from "@/pages/constant/common";
import toast from "react-hot-toast";

const PRIMARY_QUERY_KEY = "USERS";

interface dataCreateUser {
  data: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string
  image: string;
  gender: string;
  phone: number;
  birthdate?: string;
  address: string;
  city: string;
  };
}

export const useCreateUser = () => {
  return useMutation({
    mutationKey: [PREFIX_KEY.POST, PRIMARY_QUERY_KEY],
    mutationFn: async (data: dataCreateUser) => {
      const response = await axiosInstance.post<User>("users/add", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to create user: ${error.message || "Unknown error"}`);
    },
  });
}