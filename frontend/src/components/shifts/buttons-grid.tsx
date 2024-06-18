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

  const getContrastColor = (hexColor: string) => {
    // Remove the leading # if present
    const color = hexColor.charAt(0) === '#' ? hexColor.substring(1, 7) : hexColor;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    // Calculate the contrast color (YIQ formula)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  };

  if (!shifts.length) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {shifts.map((shift) => (
        <Dialog key={shift.id}>
          <DialogTrigger asChild>
            <button onClick={() => handleButtonClick(shift.id)}>
              <Card
                className={cn('rounded-lg p-4 text-lg hover:bg-opacity-90')}
                style={{ backgroundColor: `#${shift.color}`, color: getContrastColor(`#${shift.color}`) }}
              >
                <div className='flex items-center justify-between'>
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
                    className="h-16 w-16 m-4"
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
