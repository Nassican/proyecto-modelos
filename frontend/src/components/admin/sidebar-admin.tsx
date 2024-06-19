import Link from 'next/link';
import { Home, LogOut, Package2, SearchSlashIcon, Settings, Table, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export function Dashboard() {
  const currentPath = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({redirect: false}); // Llama a signOut
      router.push('/'); // Redirige al usuario a la página de inicio después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <TooltipProvider>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    currentPath === '/admin'
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-colors md:h-8 md:w-8`}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard Admin</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard Admin</TooltipContent>
            </Tooltip>
            {/*  Link to /admin/typeshift */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/typeshift"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    currentPath === '/admin/typeshift'
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-colors md:h-8 md:w-8`}
                >
                  <Table className="h-5 w-5" />
                  <span className="sr-only">TypeShift</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">TypeShift</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/user"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    currentPath === '/admin/user'
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-colors md:h-8 md:w-8`}
                >
                  <Users className="h-5 w-5" />
                  <span className="sr-only">Users</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Users</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            {session?.user ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleSignOut}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="sr-only">Logout</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Logout</TooltipContent>
                </Tooltip>
              </>
            ) : null}
          </nav>
        </aside>
      </TooltipProvider>
    </div>
  );
}
