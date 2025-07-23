import { createUser } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: { id: number; name: string; email: string; password: string }) =>
      createUser(userData.id, userData.name, userData.email, userData.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};