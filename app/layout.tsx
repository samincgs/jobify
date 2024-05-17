import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata: Metadata = {
  title: 'Jobify',
  description: 'Career Management Platform for Job Seekers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          storageKey='jobify'
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
