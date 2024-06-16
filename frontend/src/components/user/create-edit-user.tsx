// pages/typeShifts/CreateEditSheet.tsx
import { useState, useEffect, FC, ChangeEvent } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ICreateUser, IUser } from '@/interfaces/user/user';

interface CreateEditUserProps {
  isOpen: boolean;
  onClose: () => void;
  user?: IUser | null;
  onSave: (user: ICreateUser | IUser) => void;
}

const CreateEditUser: FC<CreateEditUserProps> = ({ isOpen, onClose, user, onSave }) => {
  const [formValues, setFormValues] = useState<Partial<ICreateUser>>({});

  useEffect(() => {
    if (user) {
      setFormValues(user);
    } else {
      setFormValues({});
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (user) {
      // Si es una edición, enviar el objeto IUser
      onSave({ ...formValues, id: user.id } as IUser);
    } else {
      // Si es una creación, enviar el objeto ICreateUser
      onSave(formValues as ICreateUser);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{user ? 'Edit User' : 'Create New User'}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="username"
            name="username"
            placeholder="Username"
            value={formValues.username ?? ''}
            onChange={handleChange}
          />
          <Input
            id="email"
            name="email"
            placeholder="test@gmail.com"
            value={formValues.email ?? ''}
            onChange={handleChange}
          />
          {!user && (
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formValues.password ?? ''}
              onChange={handleChange}
            />
          )}
          <Button onClick={handleSubmit}>{user ? 'Update' : 'Create'}</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateEditUser;
