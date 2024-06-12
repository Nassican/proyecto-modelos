import { ICreateShift, IShift } from '@/interfaces/shift/shift';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getShiftById = async (id: number) => {
  const response = await axios.get<IShift>(`${API_BASE_URL}/shift/${id}`);
  return response.data;
};

export const postShift = async (shift: ICreateShift) => {
  const response = await axios.post<IShift>(`${API_BASE_URL}/shift`, shift);
  return response.data;
};
