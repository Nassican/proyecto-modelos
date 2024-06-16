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