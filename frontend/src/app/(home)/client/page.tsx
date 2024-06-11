import React from 'react';

function ClientPage() {
  return (
    <div className="grid grid-cols-1 items-center gap-4">
      <h1>Reservar Turno</h1>
      <p>Inserte su numero de identificación</p>
      <input type="text" id="id" name="id" className="" />
      <button>Reservar Turno</button>
    </div>
  );
}

export default ClientPage;
