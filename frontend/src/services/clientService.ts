import { IClient } from '@/interfaces/client/client';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getClientById = async (id: number) => {
  const response = await axios.get<IClient>(`${API_BASE_URL}/client/${id}`);
  return response.data;
};
