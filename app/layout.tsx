import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers, AuthProvider } from "@/app/provider"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
import { ToastContainer } from "react-toastify";
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perfecto Home",
  description: "Real Estate Listing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          
        <ToastContainer></ToastContainer>
        {children}
        </AuthProvider>
      </body>
    </html>
    </Providers>
  );
}
