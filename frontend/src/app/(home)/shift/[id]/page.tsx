'use client';

import { IClient } from '@/interfaces/client/client';
import { IShift } from '@/interfaces/shift/shift';
import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import { getClientById } from '@/services/clientService';
import { getShiftById } from '@/services/shiftService';
import { getTypesShiftsById } from '@/services/typesShiftService';
import { useEffect, useState } from 'react';

import ShapeSeparator from '@/components/ticket/card-extensed';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [shift, setShift] = useState<IShift | null>(null);
  const [client, setClient] = useState<IClient | null>(null);
  const [typeShift, setTypeShift] = useState<ITypesShift | null>(null);

  const fetchData = async () => {
    try {
      const shift = await getShiftById(parseInt(id));
      const client = await getClientById(shift.idClient);
      const typeShift = await getTypesShiftsById(shift.idTypeShift);

      console.log(typeShift);

      setShift(shift);
      setClient(client);
      setTypeShift(typeShift);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!shift) return <div>Loading...</div>;

  return (
    <div className="grid h-screen items-center justify-center overflow-auto">
      <div className="grid gap-4">
        <Label className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl lg:text-3xl">
          Your Shift
        </Label>
        <Card className="w-96 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{shift.numShift}</CardTitle>
            <CardDescription className="text-gray-500">Shift Details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="clientName" className="font-semibold">
                Client Name:
              </Label>
              <p id="clientName" className="text-gray-700">
                {client?.name}
              </p>
            </div>
            <div className="mb-4">
              <Label htmlFor="studentCode" className="font-semibold">
                Student Code:
              </Label>
              <p id="studentCode" className="text-gray-700">
                {client?.studentCode}
              </p>
            </div>
            <div className="mb-4">
              <Label htmlFor="email" className="font-semibold">
                Email:
              </Label>
              <p id="email" className="text-gray-700">
                {client?.email}
              </p>
            </div>
            <div className="mb-4">
              <Label htmlFor="idTypeShift" className="font-semibold">
                Type Shift:
              </Label>
              <p id="idTypeShift" className="text-gray-700">
                {typeShift?.name}
              </p>
            </div>
            <div className="">
              <Label htmlFor="atCreated" className="font-semibold">
                Created At:
              </Label>
              <p id="atCreated" className="text-gray-700">
                {shift && new Date(shift.atCreated).toLocaleString()}
              </p>
            </div>
          </CardContent>
          <ShapeSeparator colorG={typeShift?.color} />
        </Card>
      </div>
    </div>
  );
}

export default Page;
