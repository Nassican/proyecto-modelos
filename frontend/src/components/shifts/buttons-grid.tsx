'use client';

import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import { getTypesShifts } from '@/services/typesShiftService';
import { useState, useEffect } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

import { FormDialog } from './form-dialog';
import { getContrastColor } from '@/lib/colorFix';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {shifts.map((shift) => (
        <Dialog key={shift.id}>
          <DialogTrigger asChild>
            <button onClick={() => handleButtonClick(shift.id)}>
              <Card
                className={cn('rounded-lg p-4 text-lg hover:bg-opacity-90')}
                style={{ backgroundColor: `#${shift.color}`, color: getContrastColor(`#${shift.color}`) }}
              >
                <div className="mx-4 flex transform items-center justify-between transition-transform hover:scale-105">
                  <div>
                    <CardHeader>
                      <CardTitle style={{ color: getContrastColor(`#${shift.color}`) }}>{shift.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription style={{ color: getContrastColor(`#${shift.color}`) }}>
                        {shift.description}
                      </CardDescription>
                    </CardContent>
                  </div>
                  <img
                    src={shift.icon}
                    alt={shift.name}
                    className="m-4 h-16 w-16"
                    style={{ filter: `invert(${getContrastColor(`#${shift.color}`) === 'white' ? 1 : 0})` }}
                  />
                </div>
              </Card>
            </button>
          </DialogTrigger>
          <FormDialog typesShift={selectShift} />
        </Dialog>
      ))}
    </div>
  );
}
