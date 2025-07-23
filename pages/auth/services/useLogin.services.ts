import { useMutation } from "@tanstack/react-query";
import { login, LoginPayload } from "../lib/api";
import { useRouter } from "next/router";

export const useLogin = () => {

    const router = useRouter();

  return useMutation({
    mutationFn: ({username, password} : {username: string; password: string}) => {
        const payload: LoginPayload = { username, password };
        return login(payload);
        },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      router.push('/user');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
};