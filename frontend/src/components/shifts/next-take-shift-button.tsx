// src/components/shifts/NextShiftButton.tsx
import { useState } from 'react';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { INextShift, IShift, ITakeShift } from '@/interfaces/shift/shift';
import { postNextShift, postTakeShift } from '@/services/shiftService';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

const NextShiftButton = (nextShift: INextShift) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextShiftData, setNextShiftData] = useState<IShift | null>(null);

  const handleNextShift = async () => {
    try {
      const response = await postNextShift(nextShift);
      setNextShiftData(response);
      setIsModalOpen(true);

      console.log('Next shift:', response);
      // Aquí podrías actualizar el estado de la aplicación con la respuesta
    } catch (error) {
      console.error('Error al obtener el siguiente turno:', error);
    }
  };

  const handleTakeShift = async (takeShiftId: number) => {
    const takeShift: ITakeShift = {
      id: takeShiftId,
      isAttended: true,
    };

    try {
      const response = await postTakeShift(takeShift);
      console.log('Shift taken:', response);
      setIsModalOpen(false);
      setNextShiftData(null);
    } catch (error) {
      console.error('Error al tomar el turno:', error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setNextShiftData(null);
  };

  return (
    <>
      <Button onClick={handleNextShift}>Next Shift</Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogTitle>¿El cliente fue atendido?</DialogTitle>
          <Button onClick={() => handleTakeShift(nextShiftData?.id ?? 0)}>Sí</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NextShiftButton;
