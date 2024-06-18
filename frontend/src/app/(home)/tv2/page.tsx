'use client';

import { useEffect, useState } from 'react';
import { IShift } from '@/interfaces/shift/shift';
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

  return (
    <div>
      <h1>Turnos en Vivo</h1>
      <div>
        {usersAttending.length > 0 ? (
          <div>
            <h2>Usuarios Atendiendo</h2>
            {usersAttending.map((user, index) => (
              <div key={user.userActive} className="mb-4 rounded border p-2">
                <p>Place: {user.place}</p>
                <p>Shift Number: {user.currentShift ? user.currentShift.numShift : 'N/A'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay usuarios atendiendo actualmente.</p>
        )}
      </div>
    </div>
  );
};

export default TVPage;
