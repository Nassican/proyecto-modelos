'use client';

import { IUser, ICreateUser, IUpdateUser } from '@/interfaces/user/user';
import { postUser, deleteUser, getAllUsers, putUser } from '@/services/userService';
import React, { useState, useEffect } from 'react';

import CreateEditUser from '@/components/user/create-edit-user';
import DataTableUser from '@/components/user/DataTableUser';

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si la hoja está abierta

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setIsOpen(true); // Abrir la hoja de edición al editar
  };

  const handleSave = async (user: ICreateUser | IUser) => {
    try {
      if ('id' in user) {
        // Actualizar usuario existente
        await putUser(String(user.id), user as IUpdateUser);
      } else {
        // Crear nuevo usuario
        await postUser(user as ICreateUser);
      }
      fetchUsers();
      setEditingUser(null);
      setIsOpen(false); // Cerrar la hoja de edición al actualizar o crear
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (user: IUser) => {
    try {
      await deleteUser(String(user.id));
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handlePropOpen = () => {
    setEditingUser(null);
    setIsOpen(true); // Manejar la apertura de la hoja
  };
  const handleClose = () => {
    setIsOpen(false); // Manejar el cierre de la hoja
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Manage Users</h1>

      <DataTableUser data={users} handleEdit={handleEdit} handleDelete={handleDelete} handlePropOpen={handlePropOpen} />
      <CreateEditUser isOpen={isOpen} onClose={handleClose} onSave={handleSave} user={editingUser} />
    </div>
  );
};

export default UserPage;
