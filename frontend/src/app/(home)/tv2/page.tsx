'use client';

import { IShift } from '@/interfaces/shift/shift';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');

interface IUserAttending {
  userActive: number;
  typeShift: number;
  place: string;
  currentShift: IShift;
}

const TVPage = () => {
  const [usersAttending, setUsersAttending] = useState<IUserAttending[]>([]); // Array de usuarios atendiendo

  useEffect(() => {
    socket.on('attend_shift', (data: IUserAttending) => {
      console.log('Receiving attend_shift data:', data);

      setUsersAttending((prevUsers) => {
        const existingUserIndex = prevUsers.findIndex((user) => user.userActive === data.userActive);
        if (existingUserIndex !== -1) {
          // Si el usuario ya está en la lista, verificar si el nuevo turno o la caja han cambiado
          const existingShift = prevUsers[existingUserIndex].currentShift;
          const existingPlace = prevUsers[existingUserIndex].place;
          const newShift = data.currentShift;
          const newPlace = data.place;

          if (newShift === null || newShift.numShift === null || newPlace === null) {
            console.warn('Received invalid shift data:', newShift, newPlace);
            return prevUsers; // Ignorar la actualización si los datos son inválidos
          }

          if (newShift.numShift !== existingShift.numShift || newPlace !== existingPlace) {
            const updatedUsers = [...prevUsers];
            updatedUsers[existingUserIndex] = data;
            return updatedUsers;
          } else {
            return prevUsers;
          }
        } else {
          return [...prevUsers, data];
        }
      });
    });

    return () => {
      socket.off('attend_shift');
    };
  }, []); // Dependencia actualizada para detectar cambios en usersAttending

  const renderRows = (userList: IUserAttending[]) => {
    return userList.map((user, index) => (
      <tr key={index}>
        <td className="border border-gray-700 p-6 text-center">{user.currentShift?.numShift ?? 'N/A'}</td>
        <td className="border border-gray-700 p-6 text-center">{user.place ?? 'N/A'}</td>
      </tr>
    ));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky bg-slate-300 p-6 text-center text-7xl font-bold">Turnos en Vivo</header>
      <main>
        {usersAttending.length > 0 ? (
          <div className="w-full text-5xl">
            {usersAttending.length <= 7 ? (
              <table className="h-full w-full border-collapse text-7xl">
                <thead className="bg-blue-200">
                  <tr>
                    <th className="border border-gray-700 bg-blue-500 p-6 text-white">Turno</th>
                    <th className="border border-gray-700 bg-blue-500 p-6 text-white">Lugar</th>
                  </tr>
                </thead>
                <tbody className="h-full">{renderRows(usersAttending)}</tbody>
              </table>
            ) : (
              <div className="flex w-full flex-1 items-start gap-4">
                <table className="h-full w-full border-collapse rounded-lg border text-7xl">
                  <thead className="bg-blue-200">
                    <tr>
                      <th className="border border-gray-700 p-6">Turno</th>
                      <th className="border border-gray-700 p-6">Lugar</th>
                    </tr>
                  </thead>
                  <tbody className="h-full">
                    {renderRows(usersAttending.slice(0, Math.ceil(usersAttending.length / 2)))}
                  </tbody>
                </table>
                <table className="h-full w-full border-collapse text-7xl">
                  <thead className="bg-blue-200">
                    <tr>
                      <th className="border border-gray-700 p-6">Turno</th>
                      <th className="border border-gray-700 p-6">Lugar</th>
                    </tr>
                  </thead>
                  <tbody className="h-full">
                    {renderRows(usersAttending.slice(Math.ceil(usersAttending.length / 2)))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 text-center text-2xl font-semibold">No hay usuarios atendiendo actualmente.</div>
        )}
      </main>
    </div>
  );
};

export default TVPage;
