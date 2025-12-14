import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tango Union',
  description: 'Tango Union Backend API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
