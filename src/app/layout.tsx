import type { Metadata } from "next";

import "@/styles/globals.css";
import 'react-loading-skeleton/dist/skeleton.css';
import { inter } from "@/lib/fonts"
import { NextAuthProvider } from "@/providers/next-auth-provider";

export const metadata: Metadata = {
  title: "Stock it",
  description: "Allows user to create variants of printify items and add sku to their etsy listings or download into a csv file",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
