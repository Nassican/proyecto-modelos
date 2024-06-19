'use client';

import { useEffect, useState } from 'react';
import NextShiftButton from '@/components/shifts/next-take-shift-button';
import { IShift, INextShift, ITakeShift } from '@/interfaces/shift/shift';
import { getAllShifts } from '@/services/shiftService';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { io } from 'socket.io-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { sendSignalToTV } from '@/services/webSocketService';
import INextShiftButtonProps from '@/interfaces/websocket/websocket';
import { useSession } from 'next-auth/react';


function Page({ params }: { params: { id: string } }) {
  const idType = params.id;
  const { data: session } = useSession();

  const [shifts, setShifts] = useState<IShift[]>([]);
  const [currentShift, setCurrentShift] = useState<IShift | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [isPlaceSelected, setIsPlaceSelected] = useState<boolean>(false);
  const [isOnShift, setIsOnShift] = useState<boolean>(false);
  const [oneNextCurrentShift, setOneNextCurrentShift] = useState<IShift | null>(null);
  const idUser = session?.user?.id || 0;

  useEffect(() => {
    fetchShifts();
    startSendSignalToTV();

    const interval = setInterval(fetchShifts, 5000);
    return () => clearInterval(interval);
  }, [idType]);

  const handlePlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPlace(value.trim() === '' ? null : value.trim());
  };

  const fetchShifts = async () => {
    try {
      const allShifts = await getAllShifts();
      const filteredShifts = allShifts.filter((shift) => shift.idTypeShift === Number(idType));
      setShifts(filteredShifts);
      const current = filteredShifts.find((shift) => shift.isStandby) ?? null;
      const oneNextToCurrent = filteredShifts.find((shift) => shift.isStandby && shift.id !== current?.id) ?? null;
      console.log('current UNA VUELTA');

      setCurrentShift(current || null);
      setOneNextCurrentShift(oneNextToCurrent || null);
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

  const handleShiftButtonClick = () => {
    if (isOnShift) {
      // Si está en turno, marcar como fuera de turno y permitir editar la caja
      setIsOnShift(false);
      setIsPlaceSelected(false);
    } else {
      // Si no está en turno, marcar como en turno y enviar la señal

      startSendSignalToTV();
    }
  };

  const startSendSignalToTV = () => {
    const props: INextShiftButtonProps = {
      place,
      setIsPlaceSelected,
      setIsOnShift,
      idUser,
      idType,
      currentShift,
    };
    sendSignalToTV(props);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Shifts for Type {idType}</h1>
        <div className="flex items-center">
          <Label htmlFor="placeInput" className="mr-2">
            Place:
          </Label>
          <Input
            id="placeInput"
            value={place !== null ? place : ''}
            onChange={handlePlaceChange}
            className="border p-1"
            disabled={isOnShift}
          />
          <Button onClick={handleShiftButtonClick} className="ml-2 rounded bg-blue-500 p-2 text-white">
            {isOnShift ? 'Change Place' : 'Start Shift'}
          </Button>
        </div>
      </div>
      {currentShift ? (
        <div className="mb-6">
          <h2 className="text-xl font-bold">Current Shift</h2>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Shift Number: {currentShift.numShift}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Is Attended: {currentShift.isAttended ? 'Yes' : 'No'}</CardDescription>
              <CardDescription>Is Standby: {currentShift.isStandby ? 'Yes' : 'No'}</CardDescription>
            </CardContent>
          </Card>
          <NextShiftButton
            nextShift={interfaceNextShift}
            currentShift={interfaceTakeShift}
            onShiftCompleted={fetchShifts}
            sendSignalToTV={sendSignalToTV}
            isPlaceSelected={!isPlaceSelected}
            place={place}
            setIsPlaceSelected={setIsPlaceSelected}
            setIsOnShift={setIsOnShift}
            idUser={idUser}
            idType={idType}
            currentShiftToSocket={oneNextCurrentShift}
          />
        </div>
      ) : (
        <Card className="mb-4">
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
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {shifts
          .filter((shift) => shift.isStandby)
          .map((shift) => (
            <Card key={shift.id} className="">
              <CardHeader>
                <CardTitle>{shift.numShift}</CardTitle>
              </CardHeader>
            </Card>
          ))}
      </ul>
      <div>
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

      {/* <Separator className="my-4 mt-8" />
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
      </ul> */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default Page;
