import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { INextShift, IShift, ITakeShift } from '@/interfaces/shift/shift';
import { postNextShift, postTakeShift } from '@/services/shiftService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface NextShiftButtonProps {
  nextShift: INextShift;
  currentShift: ITakeShift;
  onShiftCompleted: () => void; // Callback to reload shifts
}

const NextShiftButton = ({ nextShift, currentShift, onShiftCompleted }: NextShiftButtonProps) => {
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
      await postTakeShift(takeShift);
      await postNextShift(nextShift);
      onShiftCompleted(); // Reload shifts
    } catch (error) {
      console.error('Error handling shift:', error);
    }
  };

  return (
    <>
      <Button onClick={handleNextShift}>Next Shift</Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿El cliente fue atendido?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleUserResponse(true)}>Sí</Button>
            <Button variant="secondary" onClick={() => handleUserResponse(false)}>No</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NextShiftButton;
