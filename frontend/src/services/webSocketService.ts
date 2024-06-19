// sendSignalToTV.ts

import { IUserAttending } from '@/interfaces/user/user';
import { INextShiftButtonProps } from '@/interfaces/websocket/websocket';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');

export const sendSignalToTV = (props: INextShiftButtonProps) => {
  if (props.place !== null) {
    props.setIsPlaceSelected(true);
    const userActive = props.idUser;
    const typeShift = Number(props.idType);
    const place = props.place;
    const currentShift = props.currentShift;
    const data: IUserAttending = {
      userActive,
      typeShift,
      place,
      currentShift,
    };
    socket.emit('attend_shift', data);
    props.setIsOnShift(true);
    console.log(`User ${userActive} is going to attend shifts of type ${typeShift} at Place ${place}`);
  } else {
    props.setIsPlaceSelected(false);
    props.setIsOnShift(false);
    console.log('Place not selected');
  }
};
