import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'گیتا',
  description: 'نیما سلطان محمدی',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body dir='rtl' className={inter.className}>
        <div className='max-w-5xl container'>{children}</div>
      </body>
    </html>
  );
}
