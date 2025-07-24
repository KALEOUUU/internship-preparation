import { useQuery } from "@tanstack/react-query";
import { PREFIX_KEY } from "@/pages/constant/common";
import { axiosInstance } from "@/lib/axiosinstance";
import { User } from "@/pages/user/types/user"; 

const PRIMARY_QUERY_KEY = "USERS";
const URL = "/users/search";

interface SearchUserRequest {
  query: string;
  skip: number;
  limit: number;
}

export const useSearchUser = (data: SearchUserRequest) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, data];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<User[]>(URL, {
        params: {
          query: data.query,
          skip: data.skip,
          limit: data.limit,
        },
      });
      return response.data;
    },
    enabled: !!data.query, 
  });
}