import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const manrope = Manrope({
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Form Autocomplete - Danis Zaidan',
  description:
    'Form dengan fitur autocomplete untuk negara, pelabuhan, dan barang',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
