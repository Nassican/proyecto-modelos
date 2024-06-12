import Link from 'next/link';

import { Header } from '@/components/home/header';

function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl lg:text-6xl">
            Welcome to Shifts Udenar
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            We provide the best solutions for your business needs. make an appointment today to learn more.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/shift"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              prefetch={false}
            >
              Make an appointment
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
