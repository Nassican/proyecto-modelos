'use client';

import { useEffect, useState } from 'react';
import { IShift } from '@/interfaces/shift/shift';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');

interface IUserAttending {
  userActive: number;
  typeShift: number;
  caja: number;
  currentShift: IShift;
}

const TVPage = () => {
  const [usersAttending, setUsersAttending] = useState<IUserAttending[]>([]); // Array de usuarios atendiendo

  useEffect(() => {
    socket.on('attend_shift', (data) => {
      console.log('Receiving attend_shift data:', data);

      setUsersAttending(prevUsers => {
        const existingUserIndex = prevUsers.findIndex(user => user.userActive === data.userActive);
        if (existingUserIndex !== -1) {
          // Si el usuario ya está en la lista, verificar si el nuevo turno o la caja han cambiado
          const existingShift = prevUsers[existingUserIndex].currentShift;
          const existingCaja = prevUsers[existingUserIndex].caja;
          const newShift = data.currentShift;
          const newCaja = data.caja;
          if (newShift.numShift !== existingShift.numShift || newCaja !== existingCaja) {
            // El nuevo turno o la caja son diferentes, actualizar los datos
            const updatedUsers = [...prevUsers];
            updatedUsers[existingUserIndex] = data;
            return updatedUsers;
          } else {
            // El turno y la caja son los mismos, no hacer nada
            return prevUsers;
          }
        } else {
          // Agregar nuevo usuario a la lista
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
                <p>Usuario: {user.userActive}</p>
                <p>Tipo de Turno: {user.typeShift}</p>
                <p>Caja: {user.caja}</p>
                <p>Shift actual:</p>
                <p>Shift Number: {user.currentShift.numShift}</p>
                <p>Is Attended: {user.currentShift.isAttended ? 'Yes' : 'No'}</p>
                <p>Is Standby: {user.currentShift.isStandby ? 'Yes' : 'No'}</p>
                <p>Date Attended: {user.currentShift.dateAttended}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay usuarios atendiendo actualmente.</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default TVPage;
