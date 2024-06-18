import { IShift } from "@/interfaces/shift/shift";

export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  email: string;
}

export interface IUserAttending {
  userActive: number;
  typeShift: number;
  place: string;
  currentShift: IShift | null;
}