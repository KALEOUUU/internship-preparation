import axios from "axios"
import { yupResolver } from "@hookform/resolvers/yup"
import { AnyObjectSchema } from "yup"

const API_URL = process.env.API_URL || "https://dummyjson.com"

export interface UsersResponse {
  users: any[]
  total: number
  skip: number
  limit: number
}

// export const getAllUser = (): Promise<{ data: UsersResponse }> => {
//   return axios.get(`${API_URL}/users`)
// }

export const getAllUser = (): Promise<{ data: UsersResponse }> => {
  return axios.get(`${API_URL}/users`)
}

export const getMe = () => axios.get(`${API_URL}/auth/me`)

export const getSearchUser = (query: string, skip = 0, limit = 10): Promise<{ data: UsersResponse }> => {
  return axios.get(`${API_URL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`)
}

export const createUser = (id: number, name: string, email: string, password: string) => {
  return axios.post(`${API_URL}/users/add`, {
    name,
    email,
    password,
  })
}

export const updateUser = (
  id: number,
  name: string,
  email: string,
  password: string,
  gender: string,
  phoneNumber: number,
  address: string,
) => {
  return axios.patch(`${API_URL}/users/${id}`, {
    id,
    name,
    email,
    password,
    gender,
    phoneNumber,
    address,
  })
}

export const deleteUser = (id: number) => axios.delete(`${API_URL}/users/${id}`)

export const getUserById = (id: number) => axios.get(`${API_URL}/users/${id}`)

export const createYupResolver = (schema: AnyObjectSchema) => yupResolver(schema) 
