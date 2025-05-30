import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import React from "react";
import { CartProvider } from "@/components/provider/cart-provider";
import { WebSocketProvider } from "@/components/provider/websocket-provider";
import { SuspensionBanner } from "@/components/banner/SuspensionBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAWA - Metro System",
  description: "Metro System Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <WebSocketProvider>
                <SuspensionBanner />
                {children}
                <Toaster position="bottom-right" duration={1500} />
              </WebSocketProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
