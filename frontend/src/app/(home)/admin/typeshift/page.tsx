'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTypesShifts, putTypesShifts, postTypesShifts } from '@/services/typesShiftService';
import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';

function TypeShiftPage() {
  const [typeShifts, setTypeShifts] = useState<ITypesShift[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTypeShift, setEditingTypeShift] = useState<ITypesShift | null>(null);
  const [newTypeShift, setNewTypeShift] = useState<Partial<ITypesShift>>({});
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchTypeShifts();
  }, []);

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

  const handleUpdate = async () => {
    if (editingTypeShift) {
      try {
        await putTypesShifts(editingTypeShift);
        fetchTypeShifts();
        setEditingTypeShift(null);
        setIsOpen(false); // Cerrar la hoja de edición al actualizar
      } catch (error) {
        console.error('Error updating type shift:', error);
      }
    }
  };

  const handleCreate = async () => {
    try {
      await postTypesShifts(newTypeShift as ITypesShift);
      fetchTypeShifts();
      setNewTypeShift({}); // Limpiar el estado de newTypeShift después de la creación exitosa
      setIsOpen(false); // Cerrar la hoja de creación
    } catch (error) {
      console.error('Error creating type shift:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Manage Type of Shifts</h1>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            <Edit size={15} />
            Create a New TypeShift
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingTypeShift ? 'Edit Type Shift' : 'Create New Type Shift'}</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="name"
              placeholder="Name"
              value={editingTypeShift?.name ?? newTypeShift.name ?? ''}
              onChange={(e) => {
                if (editingTypeShift) {
                  setEditingTypeShift({ ...editingTypeShift, name: e.target.value });
                } else {
                  setNewTypeShift({ ...newTypeShift, name: e.target.value });
                }
              }}
            />
            <Input
              id="description"
              placeholder="Description"
              value={editingTypeShift?.description ?? newTypeShift.description ?? ''}
              onChange={(e) => {
                if (editingTypeShift) {
                  setEditingTypeShift({ ...editingTypeShift, description: e.target.value });
                } else {
                  setNewTypeShift({ ...newTypeShift, description: e.target.value });
                }
              }}
            />
            <Input
              id="code"
              placeholder="Code"
              value={editingTypeShift?.code ?? newTypeShift.code ?? ''}
              onChange={(e) => {
                if (editingTypeShift) {
                  setEditingTypeShift({ ...editingTypeShift, code: e.target.value });
                } else {
                  setNewTypeShift({ ...newTypeShift, code: e.target.value });
                }
              }}
            />
            <Input
              id="color"
              placeholder="Color"
              value={editingTypeShift?.color ?? newTypeShift.color ?? ''}
              onChange={(e) => {
                if (editingTypeShift) {
                  setEditingTypeShift({ ...editingTypeShift, color: e.target.value });
                } else {
                  setNewTypeShift({ ...newTypeShift, color: e.target.value });
                }
              }}
            />
            <Input
              id="icon"
              placeholder="Icon"
              value={editingTypeShift?.icon ?? newTypeShift.icon ?? ''}
              onChange={(e) => {
                if (editingTypeShift) {
                  setEditingTypeShift({ ...editingTypeShift, icon: e.target.value });
                } else {
                  setNewTypeShift({ ...newTypeShift, icon: e.target.value });
                }
              }}
            />
            <Button onClick={editingTypeShift ? handleUpdate : handleCreate}>
              {editingTypeShift ? 'Update' : 'Create'}
            </Button>
            {editingTypeShift && (
              <Button
                onClick={() => {
                  setEditingTypeShift(null);
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg border bg-white shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/6 px-4 py-2 text-sm font-semibold uppercase">ID</th>
              <th className="w-1/6 px-4 py-2 text-sm font-semibold uppercase">Name</th>
              <th className="w-1/6 px-4 py-2 text-sm font-semibold uppercase">Description</th>
              <th className="w-1/6 px-4 py-2 text-sm font-semibold uppercase">Code</th>
              <th className="w-1/6 px-4 py-2 text-sm font-semibold uppercase">Color</th>
              <th className="w-1/6 px-4 py-2 text-sm font-semibold uppercase">Icon</th>
              <th className="w-1/6 px-4 py-2 text-sm font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {typeShifts.map((typeShift) => (
              <tr key={typeShift.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-center">{typeShift.id}</td>
                <td className="px-4 py-2">{typeShift.name}</td>
                <td className="px-4 py-2">{typeShift.description}</td>
                <td className="px-4 py-2">{typeShift.code}</td>
                <td className="px-4 py-2">{typeShift.color}</td>
                <td className="px-4 py-2">{typeShift.icon}</td>
                <td className="px-4 py-2 text-center">
                  <Button onClick={() => handleEdit(typeShift)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TypeShiftPage;
