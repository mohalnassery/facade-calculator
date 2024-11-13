import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavBar } from './components/nav-bar';
import { Toaster } from '@/components/ui/toaster';
import { ClientProviders } from './client-providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Facade Manager',
  description: 'Manage your facade construction projects efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <NavBar />
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}