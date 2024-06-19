'use client';

import { ICreateShift } from '@/interfaces/shift/shift';
import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import { postShift } from '@/services/shiftService';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const socket = io('http://localhost:3002');

interface FormDialogProps {
  typesShift: ITypesShift | null;
}

export function FormDialog({ typesShift }: FormDialogProps) {
  const router = useRouter();

  if (!typesShift) return null;

  const handleOnSubmit = async () => {
    const code = document.getElementById('code') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;

    const createShift: ICreateShift = {
      idTypeShift: typesShift.id,
      studentCode: code.value,
      email: email.value,
    };

    try {
      const shift = await postShift(createShift);
      socket.emit('create_shift', shift); // Emitir evento al servidor WebSocket
      router.push(`/shift/${shift.id}`);
    } catch (error) {
      console.error(error);
      alert('Error creating shift');
    }
  };

  if (!typesShift) return null;

  return (
    <DialogContent>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Make a Shift</h2>
        <div className="flex flex-col md:flex-row">
          <DialogHeader className="mb-4 md:mb-0 md:w-1/2">
            <DialogTitle>{typesShift.name}</DialogTitle>
            <DialogDescription>{typesShift.description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 md:w-1/2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="code" className="">
                Student Code
              </Label>
              <Input id="code" placeholder="1234567890" className="" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="">
                Email
              </Label>
              <Input id="email" placeholder="test@gmail.com" className="" />
            </div>
            <Button onClick={handleOnSubmit}>Make an Shift</Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
