import { PREFIX_KEY } from "@/pages/constant/common";
import { User } from "@/pages/user/types/user";
import { axiosInstance } from "@/lib/axiosinstance";
import { useQuery } from "@tanstack/react-query";

const PRIMARY_QUERY_KEY = "USERS";
const URL = "/users";

export const useFetchUserById = (id: number) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, id];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<User>(`${URL}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}