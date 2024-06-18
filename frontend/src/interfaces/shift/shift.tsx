export interface IShift {
  id: number;
  numShift: string;
  dateAttended: string | null;
  isAttended: boolean | null;
  isStandby: boolean;
  idTypeShift: number;
  idClient: number;
  idUser: number | null;
  atCreated: string;
}

export interface ICreateShift {
  idTypeShift: number;
  studentCode: string;
  email: string;
}

export interface INextShift {
  idTypeShift: number;
  idUser: number;
}

export interface ITakeShift {
  id: number;
  isAttended?: boolean | null;
}
