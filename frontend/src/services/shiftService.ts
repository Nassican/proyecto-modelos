import { ICreateShift, INextShift, IShift, ITakeShift } from '@/interfaces/shift/shift';
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

export const getAllShifts = async () => {
  const response = await axios.get<IShift[]>(`${API_BASE_URL}/shift`);
  return response.data;
};

export const deleteShift = async (id: number) => {
  const response = await axios.delete<IShift>(`${API_BASE_URL}/shift/${id}`);
  return response.data;
};

export const postNextShift = async (nextShift: INextShift) => {
  const response = await axios.post<IShift>(`${API_BASE_URL}/shift/nextshift`, nextShift);
  return response.data;
}

export const postTakeShift = async (takeShift: ITakeShift) => {
  const response = await axios.post<IShift>(`${API_BASE_URL}/shift/takeshift`, takeShift);
  return response.data;
}