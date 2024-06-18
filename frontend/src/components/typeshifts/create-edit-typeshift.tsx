// pages/typeShifts/CreateEditSheet.tsx
import { useState, useEffect, FC, ChangeEvent } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import { Label } from '@radix-ui/react-label';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

interface CreateEditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  typeShift?: ITypesShift | null;
  onSave: (typeShift: ITypesShift) => void;
  iconList: { name: string; url: string }[];
}

const CreateEditSheet: FC<CreateEditSheetProps> = ({ isOpen, onClose, typeShift, onSave }) => {
  const [formValues, setFormValues] = useState<Partial<ITypesShift>>({});
  const [iconList, setIconList] = useState<{ name: string; url: string }[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string>('');

  useEffect(() => {
    fetchIconList();
    if (typeShift) {
      setFormValues(typeShift);
      setSelectedIcon(typeShift.icon ?? '');
    } else {
      setFormValues({});
    }
  }, [typeShift]);

  const fetchIconList = async () => {
    try {
      const res = await fetch('/api/icons');
      const data = await res.json();
      console.log(data);
      setIconList(data);
    } catch (error) {
      console.error('Error fetching icon list:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'color' ? value.replace('#', '') : value;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const handleIconChange = (iconUrl: string) => {
    setSelectedIcon(iconUrl);
  };

  const handleSubmit = () => {
    const updatedValues = {
      ...formValues,
      icon: selectedIcon,
    };
    onSave(updatedValues as ITypesShift);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{typeShift ? 'Edit Type Shift' : 'Create New Type Shift'}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label className="text-sm font-semibold">Name</Label>
            <Input id="name" name="name" placeholder="Name" value={formValues.name ?? ''} onChange={handleChange} />
          </div>
          <div>
            <Label className="text-sm font-semibold">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Description"
              value={formValues.description ?? ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">Code</Label>
            <Input id="code" name="code" placeholder="Code" value={formValues.code ?? ''} onChange={handleChange} />
          </div>
          <div>
            <Label className="text-sm font-semibold">Color</Label>
            <Input
              type="color"
              id="color"
              name="color"
              placeholder="Color"
              value={`#${formValues.color ?? '000000'}`} // default to black if not set
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label className="text-sm font-semibold">Icon</Label>
            <Dialog>
              <DialogTrigger className="cursor-pointer items-center">
                <div className="flex w-full items-center justify-between">
                  <div className="grid h-10 w-10 items-center justify-center rounded-lg border">
                    <img src={selectedIcon} alt="Selected Icon" />
                  </div>
                  <Button className="ml-2 rounded-md bg-blue-700 px-3 py-1 text-white">Select Icon</Button>
                </div>
              </DialogTrigger>
              <DialogContent className="max-h-80 overflow-y-auto">
                {' '}
                {/* Establecer altura máxima y scroll */}
                <div className="grid grid-cols-3 gap-2 p-4">
                  {iconList.map((icon) => (
                    <div
                      key={icon.url}
                      className={`cursor-pointer rounded border p-2 ${selectedIcon === icon.url ? 'border-blue-500' : ''}`}
                      onClick={() => handleIconChange(icon.url)}
                    >
                      <img src={icon.url} alt={icon.name} className="mx-auto h-6 w-6" />
                      <p className="text-center text-xs">{icon.name}</p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Button onClick={handleSubmit}>
            {typeShift ? 'Update' : 'Create'}
          </Button>
          <Button variant={'outline'} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateEditSheet;
