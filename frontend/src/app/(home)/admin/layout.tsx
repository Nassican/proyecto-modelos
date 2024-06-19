'use client';

import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Dashboard } from '@/components/admin/sidebar-admin';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  

  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const isLast = index === segments.length - 1;
      return (
        <Fragment key={href}>
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link className="capitalize" href={href}>
                  {segment}
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && (
            <BreadcrumbSeparator>
              <ChevronRight />
            </BreadcrumbSeparator>
          )}
        </Fragment>
      );
    });
  };

  const pathnameLength = generateBreadcrumbs().length;

  return (
    <div className={cn('flex min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
      <Dashboard />
      <main className="ml-0 w-full sm:pl-14 lg:mx-24 lg:pl-14">
        <div className="sticky">
          <Breadcrumb className="ml-4 mt-7 flex items-center">
            <BreadcrumbList>
              <BreadcrumbItem>
                {pathnameLength === 0 ? (
                  <BreadcrumbPage className="capitalize">Home</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {pathnameLength > 0 && (
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
              )}
              {generateBreadcrumbs()}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
}
