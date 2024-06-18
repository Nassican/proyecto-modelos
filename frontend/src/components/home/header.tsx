import Link from 'next/link';
import { FaCode } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <div className="flex h-14 items-center justify-between bg-white px-4 shadow dark:bg-gray-900 lg:px-6">
      <header className="container flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <FaCode className="h-6 w-6 text-gray-900 dark:text-gray-50" />
          <span className="font-semibold">Shifts Udenar</span>
        </Link>
        <Button size="sm">
          <Link href="/admin" prefetch={false}>
            Login
          </Link>
        </Button>
      </header>
    </div>
  );
}
