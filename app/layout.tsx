import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import IsAuthenticated from "@/components/IsAuthenticated";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Tracker",
  description: "Task Tracker for Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {children}
          <ToastContainer position="top-center" />
        </Providers>
        <IsAuthenticated />
      </body>
    </html>
  );
}
