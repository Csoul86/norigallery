import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nori Sticker',
  description: 'Sticker Gallery Generator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
