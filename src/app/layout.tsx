import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import DisclaimerModal from '@/components/DisclaimerModal';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MonoMotion Gallery',
  description: 'Photography events and albums',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <DisclaimerModal />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

