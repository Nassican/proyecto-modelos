'use client';

import { IClient } from '@/interfaces/client/client';
import { IShift } from '@/interfaces/shift/shift';
import { getAllShifts, postNextShift } from '@/services/shiftService';
import { useEffect, useState } from 'react';

function page({ params }: { params: { id: string } }) {
  const idType = params.id;

  const [shifts, setShifts] = useState<IShift[]>([]);
  const [currentShift, setCurrentShift] = useState<IShift | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const idUser = 1;

  useEffect(() => {
    fetchShifts();
  }, [idType]);

  const fetchShifts = async () => {
    try {
      const allShifts = await getAllShifts();
      const filteredShifts = allShifts.filter((shift) => shift.idTypeShift === Number(idType));
      setShifts(filteredShifts);

      const current = filteredShifts.find((shift) => shift.isStandby);
      setCurrentShift(current || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextShift = async () => {
    if (!currentShift) return;

    const idTypeShift = Number(idType);

    try {
      const nextShift = await postNextShift({ idTypeShift , idUser });
      setCurrentShift(nextShift);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Shifts for Type {idType}</h1>
      {currentShift ? (
        <div>
          <h2>Current Shift</h2>
          <p>Shift Number: {currentShift.numShift}</p>
          <p>Is Attended: {currentShift.isAttended ? "Yes" : "No"}</p>
          <p>Is Standby: {currentShift.isStandby ? "Yes" : "No"}</p>
          <p>Date Attended: {currentShift.dateAttended}</p>
          <button onClick={handleNextShift}>Next Shift</button>
        </div>
      ) : (
        <p>No current shift available</p>
      )}
      <h2>All Shifts</h2>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>
            <p>Shift Number: {shift.numShift}</p>
            <p>Is Attended: {shift.isAttended ? "Yes" : "No"}</p>
            <p>Is Standby: {shift.isStandby ? "Yes" : "No"}</p>
            <p>Date Attended: {shift.dateAttended}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;
