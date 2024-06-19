import { ILoginUser, IUserLogged } from '@/interfaces/user/user';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const postLoginUser = async (userCredentials: ILoginUser) => {
  const response = await axios.post<IUserLogged>(`${API_BASE_URL}/account/login`, userCredentials);
  return response.data;
};
