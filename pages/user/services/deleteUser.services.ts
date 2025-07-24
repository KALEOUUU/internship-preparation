import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosinstance";
import { User } from "@/pages/user/types/user";
import { PREFIX_KEY } from "@/pages/constant/common";
import toast from "react-hot-toast";

const PRIMARY_QUERY_KEY = "USERS";

interface dataDeleteUser {
  id: number;
}

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: [PREFIX_KEY.DELETE, PRIMARY_QUERY_KEY],
    mutationFn: async (data: dataDeleteUser) => {
      const response = await axiosInstance.delete<User>(`users/delete/${data.id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
    },
    onError: (error: any) => {
      toast.error(`Failed to delete user: ${error.message || "Unknown error"}`);
    },
  });
}