import { getSearchUser } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export const useSearchUsers = (query: string, skip = 0, limit = 10) => {
  return useQuery({
    queryKey: ["searchUsers", query, skip, limit],
    queryFn: () => getSearchUser(query, skip, limit),
    enabled: !!query, // Only run the query if query is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};