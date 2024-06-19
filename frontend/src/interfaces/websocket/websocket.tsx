import { IShift } from '@/interfaces/shift/shift';

export interface INextShiftButtonProps {
  place: string | null;
  setIsPlaceSelected: (value: boolean) => void;
  setIsOnShift: (value: boolean) => void;
  idUser: number;
  idType: string;
  currentShift: IShift | null;
}

export default INextShiftButtonProps;
