// pages/typeShifts/CreateEditSheet.tsx
import { useState, useEffect, FC, ChangeEvent } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ITypesShift } from '@/interfaces/typesShift/types-shift';

interface CreateEditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  typeShift?: ITypesShift | null;
  onSave: (typeShift: ITypesShift) => void;
}

const CreateEditSheet: FC<CreateEditSheetProps> = ({ isOpen, onClose, typeShift, onSave }) => {
  const [formValues, setFormValues] = useState<Partial<ITypesShift>>({});

  useEffect(() => {
    if (typeShift) {
      setFormValues(typeShift);
    } else {
      setFormValues({});
    }
  }, [typeShift]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formValues as ITypesShift);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{typeShift ? 'Edit Type Shift' : 'Create New Type Shift'}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Input id="name" name="name" placeholder="Name" value={formValues.name ?? ''} onChange={handleChange} />
          <Input
            id="description"
            name="description"
            placeholder="Description"
            value={formValues.description ?? ''}
            onChange={handleChange}
          />
          <Input id="code" name="code" placeholder="Code" value={formValues.code ?? ''} onChange={handleChange} />
          <Input id="color" name="color" placeholder="Color" value={formValues.color ?? ''} onChange={handleChange} />
          <Input id="icon" name="icon" placeholder="Icon" value={formValues.icon ?? ''} onChange={handleChange} />
          <Button onClick={handleSubmit}>{typeShift ? 'Update' : 'Create'}</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateEditSheet;
