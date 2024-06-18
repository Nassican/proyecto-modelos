// src/components/shifts/NextShiftButton.tsx
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { INextShift, IShift, ITakeShift } from '@/interfaces/shift/shift';
import { postNextShift, postTakeShift } from '@/services/shiftService';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

interface NextShiftButtonProps {
  nextShift: INextShift;
  currentShift: ITakeShift;
}

const NextShiftButton: React.FC<NextShiftButtonProps> = ({ nextShift, currentShift }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextShift = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleUserResponse = useCallback(async (attended: boolean) => {
    setIsModalOpen(false);

    const takeShift: ITakeShift = {
      id: currentShift.id,
      isAttended: attended,
    };

    try {
      await postTakeShift(takeShift);
      console.log(`Shift ${attended ? 'attended' : 'not attended'}`);
      
      const nextShiftResponse = await postNextShift(nextShift);
      console.log('Next shift:', nextShiftResponse);
    } catch (error) {
      console.error('Error handling shift:', error);
    }
  }, [currentShift.id, nextShift]);

  return (
    <>
      <Button onClick={handleNextShift}>Next Shift</Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogTitle>¿El cliente fue atendido?</DialogTitle>
          <Button onClick={() => handleUserResponse(true)}>Sí</Button>
          <Button onClick={() => handleUserResponse(false)}>No</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NextShiftButton;
