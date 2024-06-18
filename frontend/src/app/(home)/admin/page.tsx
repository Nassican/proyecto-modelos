'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllShifts } from '@/services/shiftService';
import { getTypesShifts } from '@/services/typesShiftService';
import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import { IShift } from '@/interfaces/shift/shift';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { getContrastColor } from '@/lib/colorFix';

function UserPage() {
  const [typeShifts, setTypeShifts] = useState<ITypesShift[]>([]);
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [filteredTypeShifts, setFilteredTypeShifts] = useState<ITypesShift[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const types = await getTypesShifts();
      const shifts = await getAllShifts();

      setTypeShifts(types);
      setShifts(shifts);
      setFilteredTypeShifts(types); // Inicialmente, muestra todos los typeShifts
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false); // Asegurar que setLoading se establece en falso en caso de error
    }
  };

  const getShiftCount = (typeShiftId: number) => {
    return shifts.filter((shift) => shift.idTypeShift === typeShiftId).length;
  };

  const getShiftCountPendientes = (typeShiftId: number) => {
    // Obtener los turnos pendientes que no han sido atendidos y que esta en espera
    return shifts.filter((shift) => shift.idTypeShift === typeShiftId && shift.isStandby).length;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    filterAndSortTypeShifts(query, sortDirection); // Ajustado para filtrar y ordenar juntos
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    filterAndSortTypeShifts(searchTerm, newDirection); // Ajustado para filtrar y ordenar juntos
  };

  const filterAndSortTypeShifts = (query: string, direction: 'asc' | 'desc') => {
    let filteredShifts = typeShifts;

    if (query.trim()) {
      filteredShifts = filteredShifts.filter((typeShift) => typeShift.name.toLowerCase().includes(query.toLowerCase()));
    }

    filteredShifts.sort((a, b) => {
      const shiftCountA = getShiftCount(a.id);
      const shiftCountB = getShiftCount(b.id);
      if (direction === 'asc') {
        return shiftCountA - shiftCountB;
      } else {
        return shiftCountB - shiftCountA;
      }
    });

    setFilteredTypeShifts(filteredShifts);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Shift Page</h1>
            <Button onClick={() => router.push('/')}>Go back to home</Button>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Search by name..."
              className="mr-2 w-full rounded-md border p-2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button onClick={toggleSortDirection}>
              {sortDirection === 'asc' ? 'Sort by Shifts (asc)' : 'Sort by Shifts (desc)'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-auto overflow-x-auto">
            <ul className="sd:grid-cols-2 grid grid-cols-1 gap-4 pb-4 md:grid-cols-2">
              {filteredTypeShifts.map((typeShift) => (
                <li key={typeShift.id}>
                  <Link href={`/admin/${typeShift.id}`} className="cursor-pointer text-lg">
                    <div
                      className="rounded-lg border p-4 hover:shadow-md hover:border-slate-800 transition-all cursor-pointer "
                      style={{
                        backgroundColor: `#${typeShift.color}`,
                        color: getContrastColor(`#${typeShift.color}`),
                      }}
                    >
                      <div className="flex transform items-center justify-between transition-transform hover:scale-105 mx-4">
                        <div className="grid">
                          <Label className="cursor-pointer text-lg">{typeShift.name}</Label>
                          <Label className="cursor-pointer text-sm">{getShiftCount(typeShift.id)} Total Shifts</Label>
                          <div className="flex items-center">
                            <Label className="cursor-pointer text-sm">
                              {getShiftCountPendientes(typeShift.id)} Pending Shifts
                            </Label>
                          </div>
                        </div>
                        <img
                          className="h-16 w-16"
                          src={typeShift.icon}
                          alt={typeShift.name}
                          style={{
                            filter: `invert(${getContrastColor(`#${typeShift.color}`) === 'white' ? 1 : 0})`,
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default UserPage;
