'use client';

import { useEffect, useState } from 'react';
import NextShiftButton from '@/components/shifts/next-take-shift-button';
import { IShift, INextShift, ITakeShift } from '@/interfaces/shift/shift';
import { getAllShifts, postNextShift } from '@/services/shiftService';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { io } from 'socket.io-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const socket = io('http://localhost:3002');

function Page({ params }: { params: { id: string } }) {
  const idType = params.id;

  const [shifts, setShifts] = useState<IShift[]>([]);
  const [currentShift, setCurrentShift] = useState<IShift | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [caja, setCaja] = useState<number | null>(null);
  const idUser = 2;

  useEffect(() => {
    fetchShifts();
    sendSignalToTV();
  }, [idType]);

  // Funcion que se encargara de enviar una señal al tv para que se sepa quien va a atender este tipo de turno
  // Por ejemplo el usuario 1 entra a la pagina, entonces el tv mostrara que el usuario 1 va a atender los turnos de tipo X

  const handleCajaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaja(Number(event.target.value));
  };

  const sendSignalToTV = () => {
    if (caja !== null) {
      const userActive = idUser;
      const typeShift = idType;
      const data = {
        userActive,
        typeShift,
        caja,
        currentShift,
      };
      socket.emit('attend_shift', data);
      console.log(`User ${userActive} is going to attend shifts of type ${typeShift} at box ${caja}`);
    } else {
      console.log('Caja not selected');
    }
  };

  const fetchShifts = async () => {
    try {
      const allShifts = await getAllShifts();
      const filteredShifts = allShifts.filter((shift) => shift.idTypeShift === Number(idType));
      setShifts(filteredShifts);
      const current = filteredShifts.find((shift) => shift.isStandby);

      setCurrentShift(current || null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch shifts.');
    } finally {
      setLoading(false);
    }
  };

  const interfaceNextShift: INextShift = {
    idTypeShift: Number(idType),
    idUser: idUser,
  };

  const interfaceTakeShift: ITakeShift = {
    id: currentShift ? currentShift.id : 0,
    isAttended: false, // Esto se actualizará según la respuesta del usuario
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Shifts for Type {idType}</h1>
        <div className="flex items-center">
          <Label htmlFor="cajaInput" className="mr-2">
            Caja:
          </Label>
          <Input
            id="cajaInput"
            type="number"
            value={caja !== null ? caja : ''}
            onChange={handleCajaChange}
            className="border p-1"
          />
          <Button onClick={sendSignalToTV} className="ml-2 rounded bg-blue-500 p-2 text-white">
            Start Shifts
          </Button>
        </div>
      </div>
      {currentShift ? (
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Current Shift</h2>
          <Card className="mb-4 p-4">
            <CardHeader>
              <CardTitle>Shift Number: {currentShift.numShift}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Is Attended: {currentShift.isAttended ? 'Yes' : 'No'}</CardDescription>
              <CardDescription>Is Standby: {currentShift.isStandby ? 'Yes' : 'No'}</CardDescription>
              <CardDescription>Date Attended: {currentShift.dateAttended}</CardDescription>
            </CardContent>
          </Card>
          <NextShiftButton
            nextShift={interfaceNextShift}
            currentShift={interfaceTakeShift}
            onShiftCompleted={() => {
              fetchShifts();
              sendSignalToTV();
            }}
          />
        </div>
      ) : (
        <Card className="mb-4 p-4">
          <CardHeader>
            <CardTitle className="text-center">No current shift</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">There are no shifts available for this type.</CardDescription>
          </CardContent>
        </Card>
      )}
      <Separator className="my-4" />
      {/* Mostrar los shifts pendientes que estan en espera */}
      <h2 className="my-4 text-xl font-bold">Pendient Shifts</h2>
      <ul className="grid grid-cols-2 gap-4">
        {shifts
          .filter((shift) => shift.isStandby)
          .map((shift) => (
            <Card key={shift.id} className="p-4">
              <CardHeader>
                <CardTitle>Shift Number: {shift.numShift}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Is Attended: {shift.isAttended ? 'Yes' : 'No'}</CardDescription>
                <CardDescription>Is Standby: {shift.isStandby ? 'Yes' : 'No'}</CardDescription>
                <CardDescription>Date Attended: {shift.dateAttended}</CardDescription>
              </CardContent>
            </Card>
          ))}
      </ul>
      <div>
        {/* Colocar una alerta de que nohay sdhift pendientes */}
        {shifts.filter((shift) => shift.isStandby).length === 0 && (
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-center">No pending shifts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">There are no pending shifts for this type.</CardDescription>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator className="my-4 mt-8" />
      <h2 className="my-4 text-xl font-bold">All Shifts</h2>
      <ul className="grid grid-cols-2 gap-4">
        {shifts.map((shift) => (
          <Card key={shift.id} className="p-4">
            <CardHeader>
              <CardTitle>Shift Number: {shift.numShift}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Is Attended: {shift.isAttended ? 'Yes' : 'No'}</CardDescription>
              <CardDescription>Is Standby: {shift.isStandby ? 'Yes' : 'No'}</CardDescription>
              <CardDescription>Date Attended: {shift.dateAttended}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </ul>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default Page;
