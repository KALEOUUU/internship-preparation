import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

const API_URL = process.env.API_URL || 'https://dummyjson.com';

export const getAuthMe = () => axios.get(`${API_URL}/auth/me`);

export const login = (username: string, password: string) => axios.post(`${API_URL}/user/login`, { username, password });

export const createYupResolver = (schema: AnyObjectSchema) => yupResolver(schema);
 