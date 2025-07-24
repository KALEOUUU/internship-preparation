import { PREFIX_KEY } from "@/pages/constant/common";
import { User } from "@/pages/user/types/user";
import { axiosInstance } from "@/lib/axiosinstance";
import { useQuery } from "@tanstack/react-query";

const PRIMARY_QUERY_KEY = "USERS";
const URL = "/users";

interface dataRequest {
  skip: number;
  limit: number;
}

interface userRequest {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export const useFetchUsers = (data: dataRequest) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, data];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<userRequest>(URL, {
        params: {
          skip: data.skip,
          limit: data.limit,
        },
      });
      return response.data;
    },
  })
}