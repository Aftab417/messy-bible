import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/providers/StoreProvider";
import { Toaster } from "react-hot-toast";
import { DM_Sans } from "next/font/google";
import { Indie_Flower, Inter } from "next/font/google";

import ThemeProvider from "@/theme/theme-provider";
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

const indieFlower = Indie_Flower({
  weight: "400", // Indie Flower only has 400
  subsets: ["latin"],
  variable: "--font-indie-flower"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Messy Bible Dashboard",
  description: "Messy Bible Dashboard",
  icons: [
    {
      rel: "icon",
      url: "/images/blogo.png",
      media: "(prefers-color-scheme: light)"
    },
    {
      rel: "icon",
      url: "/images/wlogo.png",
      media: "(prefers-color-scheme: dark)"
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-white text-[#37352f]"
        style={{
          fontFamily: `${dmSans.style.fontFamily}, ${inter.style.fontFamily}, ${indieFlower.style.fontFamily}`
        }}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            {children}
            <Toaster position="top-right" />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
