'use client';

import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import { getTypesShifts } from '@/services/typesShiftService';
import { useState, useEffect } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

import { FormDialog } from './form-dialog';

export function ButtonsGrid() {
  const [shifts, setShifts] = useState<ITypesShift[]>([]);
  const [selectShift, setSelectShift] = useState<ITypesShift | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const shifts = await getTypesShifts();
      setShifts(shifts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (id: number) => {
    const shift = shifts.find((shift) => shift.id === id);
    if (shift) {
      setSelectShift(shift);
    }
  };

  if (!shifts.length) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {shifts.map((shift) => (
        <Dialog key={shift.id}>
          <DialogTrigger asChild>
            <button onClick={() => handleButtonClick(shift.id)}>
              <Card className={cn('rounded-lg bg-gray-200 p-4 text-lg font-bold hover:bg-gray-300')}>
                <CardHeader>
                  <CardTitle>{shift.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{shift.description}</CardDescription>
                </CardContent>
              </Card>
            </button>
          </DialogTrigger>
          <FormDialog typesShift={selectShift} />
        </Dialog>
      ))}
    </div>
  );
}
