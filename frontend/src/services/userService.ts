import { ICreateUser, IUpdateUser, IUser } from '@/interfaces/user/user';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllUsers = async () => {
  const response = await axios.get<IUser[]>(`${API_BASE_URL}/user`);
  return response.data;
}

export const getUser = async (id: string) => {
  const response = await axios.get<IUser>(`${API_BASE_URL}/user/${id}`);
  return response.data;
};

export const postUser = async (newUser: ICreateUser) => {
  const response = await axios.post<ICreateUser>(`${API_BASE_URL}/user`, newUser);
  return response.data;
}

export const putUser = async (id: string, updatedUser: IUpdateUser) => {
  await axios.put(`${API_BASE_URL}/user/${id}`, updatedUser);
}

export const deleteUser = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/user/${id}`);
};
