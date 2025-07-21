import axios from "axios"

const API_URL = process.env.API_URL || "https://dummyjson.com"

// getAllUser tidak membutuhkan parameter id, seharusnya parameter dihapus
export const getAllUser = () => axios.get(`${API_URL}/users`)

// endpoint getMe seharusnya /auth/me sesuai dengan API dummyjson.com
export const getMe = () => axios.get(`${API_URL}/auth/me`)


export const getSearchUser = (query: string, page: number, limit: number) => {
    const skip = page * limit
    return axios.get(`${API_URL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`)
} 