import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getTypesShifts = async () => {
  const response = await axios.get<ITypesShift[]>(`${API_BASE_URL}/TypesShift`);
  return response.data;
};

export const getTypesShiftsById = async (id: number) => {
  const response = await axios.get<ITypesShift>(`${API_BASE_URL}/TypesShift/${id}`);
  return response.data;
};

export const postTypesShifts = async (typeShift: ITypesShift) => {
  const response = await axios.post<ITypesShift>(`${API_BASE_URL}/TypesShift`, typeShift);
  return response.data;
}

export const putTypesShifts = async (typeShift: ITypesShift) => {
  const response = await axios.put<ITypesShift>(`${API_BASE_URL}/TypesShift/${typeShift.id}`, typeShift);
  return response.data;
}

export const deleteTypesShifts = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/TypesShift/${id}`);
}
