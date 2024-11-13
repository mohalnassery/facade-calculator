'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Sidebar } from './components/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (session?.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}