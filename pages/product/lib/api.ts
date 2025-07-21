import axios from "axios";
import dotenv from 'dotenv'
dotenv.config

const API_URL = process.env.API_URL || "https://dummyjson.com";

export const getProductDetail = (id: number) => axios.get(`${API_URL}/products/${id}`);

export const createProduct = (
    title: string,
    description: string,
    price: number,
    category: string,
    stock: number,
    image: string
) =>
  axios.post(`${API_URL}/products/add`, {
    title,
    description,
    price,
    category,
    stock,
    thumbnail: image,
  });

export const getProducts = (page: number, limit: number) => {
  const skip = page * limit;
  return axios.get(`${API_URL}/products?limit=${limit}&skip=${skip}`);
}

export const getProductById = async (id: number) => {
    return await axios.get(`${API_URL}/products/${id}`);
};

export const getCategorie = () => axios.get(`${API_URL}/products/categories`);

export const getProductByCategory = (
  category: string,
  page: number,
  limit: number
) => {
  const skip = page * limit;
  return axios.get(
    `${API_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
  );
};

export const updateProduct = (
    id: number,
    title: string,
    description: string,
    price: number,
    category: string,
    stock: number
) =>
  axios.patch(`${API_URL}/products/${id}`, {
    title,
    description,
    price,
    category,
    stock,
  });   

export const deleteProduct = (id: number) => axios.delete(`${API_URL}/products/${id}`);

export const searchProducts = (query: string, page: number, limit: number) => {
  const skip = page * limit;
  return axios.get(`${API_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);
};

