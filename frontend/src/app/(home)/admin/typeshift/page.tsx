'use client';

import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import { getTypesShifts, putTypesShifts, postTypesShifts, deleteTypesShifts } from '@/services/typesShiftService';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import CreateEditSheet from '@/components/typeshifts/create-edit-typeshift';
import DataTable from '@/components/typeshifts/DataTableTypeShift';

const TypeShiftPage: React.FC = () => {
  const [typeShifts, setTypeShifts] = useState<ITypesShift[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTypeShift, setEditingTypeShift] = useState<ITypesShift | null>(null);
  const [newTypeShift, setNewTypeShift] = useState<Partial<ITypesShift>>({});
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si la hoja está abierta
  const [iconList, setIconList] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    fetchIconList();
    fetchTypeShifts();
  }, []);

  const fetchIconList = async () => {
    try {
      const res = await axios.get('/api/icons');
      setIconList(res.data);
    } catch (error) {
      console.error('Error fetching icon list:', error);
    }
  };

  const fetchTypeShifts = async () => {
    try {
      const typeshifts = await getTypesShifts();
      setTypeShifts(typeshifts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching type shifts:', error);
      setLoading(false);
    }
  };

  const handleEdit = (typeShift: ITypesShift) => {
    setEditingTypeShift(typeShift);
    setIsOpen(true); // Abrir la hoja de edición al editar
  };

  const handleUpdate = async (updatedTypeShift: ITypesShift) => {
    try {
      await putTypesShifts(updatedTypeShift);
      fetchTypeShifts();
      setEditingTypeShift(null);
      setIsOpen(false); // Cerrar la hoja de edición al actualizar
    } catch (error) {
      console.error('Error updating type shift:', error);
    }
  };

  const handleDelete = async (typeShift: ITypesShift) => {
    try {
      await deleteTypesShifts(typeShift.id);
      fetchTypeShifts();
    } catch (error) {
      console.error('Error deleting type shift:', error);
    }
  };

  const handlePropOpen = () => {
    setIsOpen(true); // Manejar la apertura de la hoja
  };

  const handleCreate = async (newTypeShift: Partial<ITypesShift>) => {
    try {
      await postTypesShifts(newTypeShift as ITypesShift);
      fetchTypeShifts();
      setNewTypeShift({}); // Limpiar el estado de newTypeShift después de la creación exitosa
      setIsOpen(false); // Cerrar la hoja de creación
    } catch (error) {
      console.error('Error creating type shift:', error);
    }
  };

  const handleClose = () => {
    // Limpiar el estado de edición y cierre de la hoja
    setEditingTypeShift(null);
    setIsOpen(false); // Manejar el cierre de la hoja
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Manage Type of Shifts</h1>

      <DataTable
        data={typeShifts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handlePropOpen={handlePropOpen}
      />
      <CreateEditSheet
        isOpen={isOpen}
        onClose={handleClose}
        onSave={editingTypeShift ? handleUpdate : handleCreate}
        typeShift={editingTypeShift}
        iconList={iconList}
      />
    </div>
  );
};

export default TypeShiftPage;
