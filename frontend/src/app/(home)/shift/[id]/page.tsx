'use client';

import { IClient } from '@/interfaces/client/client';
import { IShift } from '@/interfaces/shift/shift';
import { getClientById } from '@/services/clientService';
import { getShiftById } from '@/services/shiftService';
import { useEffect, useState } from 'react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [shift, setShift] = useState<IShift | null>(null);
  const [client, setClient] = useState<IClient | null>(null);

  const fetchData = async () => {
    try {
      const shift = await getShiftById(parseInt(id));
      const client = await getClientById(shift.idClient);
      setShift(shift);
      setClient(client);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!shift) return <div>Loading...</div>;

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{shift.numShift}</CardTitle>
          <CardDescription className="text-gray-500">Turno Details</CardDescription>
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
              Type Shift ID:
            </Label>
            <p id="idTypeShift" className="text-gray-700">
              {shift?.idTypeShift}
            </p>
          </div>
          <div className="mb-4">
            <Label htmlFor="atCreated" className="font-semibold">
              Created At:
            </Label>
            <p id="atCreated" className="text-gray-700">
              {shift && new Date(shift.atCreated).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
