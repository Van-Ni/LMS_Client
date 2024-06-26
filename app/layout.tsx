
'use client'
import './globals.css'
import { Josefin_Sans, Poppins } from 'next/font/google'
import { ThemeProvider } from './utils/theme-provider';
import { Toaster } from 'react-hot-toast';
import { Providers } from './Provider';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from './components/Loader/Loader';
import { ProSidebarProvider } from 'react-pro-sidebar';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true} className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProSidebarProvider>
            <Custom>{ children }</Custom>
          </ProSidebarProvider>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  return (
    isLoading ? <Loader /> : <>{children}</>
  );
};