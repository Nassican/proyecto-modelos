import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getTypesShifts = async () => {
  const response = await axios.get<ITypesShift[]>(`${API_BASE_URL}/TypesShift`);
  return response.data;
};
