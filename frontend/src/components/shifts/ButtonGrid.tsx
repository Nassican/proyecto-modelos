'use client';

import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import axios from '@/lib/axios';

import { Button } from '../ui/button';

interface ButtonShift {
  id: number;
  color: string;
  icon: string;
  name: string;
  description: string;
  code: string;
}

const ButtonGrid: React.FC = () => {
  const [buttons, setButtons] = useState<ButtonShift[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('TypesShift');
        setButtons(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (info: string, description: string) => {
    console.log(info, description);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {buttons.map((button) => (
        <Dialog key={button.id}>
          <DialogTrigger>
            <button className="rounded-lg bg-gray-200 p-4 pt-2 text-lg font-bold hover:bg-gray-300">
              {button.name}
            </button>
          </DialogTrigger>
          <DialogContent className="flex text-right">
            <DialogHeader>
              <DialogTitle>{button.name}</DialogTitle>
              <DialogDescription>{button.description}</DialogDescription>
            </DialogHeader>
            <div className="my-4 grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Student Code
                </Label>
                <Input id="code" placeholder="1234567890" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" placeholder="test@gmail.com" className="col-span-3" />
              </div>
              <Button onClick={() => handleButtonClick(button.name, button.description)}>Make an Shift</Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default ButtonGrid;
