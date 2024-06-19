import { INextShift, IShift, ITakeShift } from '@/interfaces/shift/shift';
import INextShiftButtonProps from '@/interfaces/websocket/websocket';
import { postNextShift, postTakeShift } from '@/services/shiftService';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface NextShiftButtonProps {
  nextShift: INextShift;
  currentShift: ITakeShift;
  onShiftCompleted: () => void;
  sendSignalToTV: (props: INextShiftButtonProps) => void;
  isPlaceSelected: boolean;
  place: string | null;
  setIsPlaceSelected: (value: boolean) => void;
  setIsOnShift: (value: boolean) => void;
  idUser: number;
  idType: string;
  currentShiftToSocket: IShift | null;
}

const NextShiftButton = ({
  nextShift,
  currentShift,
  onShiftCompleted,
  sendSignalToTV,
  isPlaceSelected,
  place,
  setIsPlaceSelected,
  setIsOnShift,
  idUser,
  idType,
  currentShiftToSocket,
}: NextShiftButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextShift = () => {
    setIsModalOpen(true);
  };

  const handleUserResponse = async (attended: boolean) => {
    setIsModalOpen(false);

    const takeShift: ITakeShift = {
      id: currentShift.id,
      isAttended: attended,
    };

    try {
      const data: INextShiftButtonProps = {
        place,
        setIsPlaceSelected,
        setIsOnShift,
        idUser,
        idType,
        currentShift: currentShiftToSocket,
      };

      await postTakeShift(takeShift);
      await postNextShift(nextShift);
      await onShiftCompleted(); // Reload shifts
      await sendSignalToTV(data);
    } catch (error) {
      console.error('Error handling shift:', error);
    }
  };

  return (
    <>
      <Button onClick={handleNextShift} disabled={isPlaceSelected}>
        Next Shift
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿El cliente fue atendido?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleUserResponse(true)}>Sí</Button>
            <Button variant="secondary" onClick={() => handleUserResponse(false)}>
              No
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NextShiftButton;
