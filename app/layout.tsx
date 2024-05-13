import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { HeaderComponent } from "@/components/common/header-component";
import { FooterComponent } from "@/components/common/footer-component";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Drowser Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderComponent />
        {children}
        <FooterComponent />
      </body>
    </html>
  );
}
