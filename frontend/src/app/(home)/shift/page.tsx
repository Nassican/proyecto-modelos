"use client";

import axios from "@/lib/axios";
import { useEffect, useState } from "react";

// interface Turno {
//     "id": 1,
//     "numShift": "PS1",
//     "dateAttended": null,
//     "isAttended": null,
//     "isStandby": true,
//     "idTypeShift": 1,
//     "idClient": 1,
//     "idUser": null,
//     "atCreated": "2024-06-11T03:15:03.587553"

interface Shift {
  id: number;
  numShift: string;
  dateAttended: string;
  isAttended: boolean;
  isStandby: boolean;
  idTypeShift: number;
  idClient: number;
  idUser: number;
  atCreated: string;
}

function TurnosPage() {
  const [turnos, setTurnos] = useState<Shift[]>([]);

  const getData = async () => {
    const res = await axios.get("Shift");
    setTurnos(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Turnos</h1>
      <p>Lista de turnos</p>
      {/* Mostrar turnos */}
      <table>
        <thead>
          <tr>
            <th>TURNO</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno) => (
            <tr key={turno.id}>
              <td>{turno.numShift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TurnosPage;
