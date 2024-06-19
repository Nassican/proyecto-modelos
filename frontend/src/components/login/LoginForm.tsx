'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Label } from '@/components/ui/label';


const LoginForm = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn('credentials', {
      username,
      password,
      confirmPassword: password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(','));
      return;
    }

    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex min-h-[100dvh] items-center justify-center bg-background">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold tracking-tight">Sign in to Administrate Shift</h2>
          </div>
          <div className="card bg-background p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="username"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete='current-password'
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </div>
        </div>
        {errors.length > 0 && (
        <div className="alert alert-danger mt-4">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
};

export default LoginForm;
