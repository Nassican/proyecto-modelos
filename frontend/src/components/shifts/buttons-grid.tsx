'use client';

import { ITypesShift } from '@/interfaces/shift/types-shift';
import { getTypesShifts } from '@/services/typesShiftService';
import { useState, useEffect } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

export function ButtonsGrid() {
  const [shifts, setShifts] = useState<ITypesShift[]>([]);

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
    console.log('Button clicked', id);
  };

  if (!shifts.length) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {shifts.map((shift) => (
        <button key={shift.id} onClick={() => handleButtonClick(shift.id)}>
          <Card className={cn('rounded-lg bg-gray-200 p-4 text-lg font-bold hover:bg-gray-300')}>
            <CardHeader>
              <CardTitle>{shift.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{shift.description}</CardDescription>
            </CardContent>
          </Card>
        </button>
      ))}
    </div>
  );
}
