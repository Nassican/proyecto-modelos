// pages/typeShifts/CreateEditSheet.tsx
import { useState, useEffect, FC, ChangeEvent } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ITypesShift } from '@/interfaces/typesShift/types-shift';
import { Label } from '@radix-ui/react-label';

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
    const newValue = name === 'color' ? value.replace('#', '') : value;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
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
          <div>
            <Label className="font-semibold text-sm">Name</Label>
            <Input id="name" name="name" placeholder="Name" value={formValues.name ?? ''} onChange={handleChange} />
          </div>
          <div>
            <Label className="font-semibold text-sm">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Description"
              value={formValues.description ?? ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="font-semibold text-sm">Code</Label>
            <Input id="code" name="code" placeholder="Code" value={formValues.code ?? ''} onChange={handleChange} />
          </div>
          <div>
            <Label className="font-semibold text-sm">Color</Label>
            <Input
              type="color"
              id="color"
              name="color"
              placeholder="Color"
              value={`#${formValues.color ?? '000000'}`} // default to black if not set
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="font-semibold text-sm">Icon</Label>
            <Input id="icon" name="icon" placeholder="Icon" value={formValues.icon ?? ''} onChange={handleChange} />
          </div>
          <Button onClick={handleSubmit}>{typeShift ? 'Update' : 'Create'}</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateEditSheet;
