// src/app/tv/page.tsx
import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { IShift } from '@/interfaces/shift/shift';
import { getAllShifts } from '@/services/shiftService';

const TVPage = () => {
  const [shifts, setShifts] = useState<IShift[]>([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await getAllShifts();
        setShifts(response);
      } catch (error) {
        console.error('Error al obtener los turnos:', error);
      }
    };

    fetchShifts();

    const interval = setInterval(fetchShifts, 5000); // Actualizar cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Turnos en Vivo</h1>
      <ul>
        {shifts.map(shift => (
          <li key={shift.id}>
            {shift.numShift} - {shift.isStandby ? 'En espera' : 'Atendido'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TVPage;
