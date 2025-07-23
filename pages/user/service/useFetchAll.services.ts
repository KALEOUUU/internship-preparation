import axios from 'axios';
import { getAllUser } from '../lib/api';
import { useQuery } from '@tanstack/react-query';

export const useFetchAllUsers = (skip = 0, limit = 10) => {
  return useQuery({
    queryKey: ['users', skip, limit],
    queryFn: () => getAllUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};