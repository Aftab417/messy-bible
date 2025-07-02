import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/providers/StoreProvider";
import { Toaster } from "react-hot-toast";
import { DM_Sans } from "next/font/google";
import ThemeProvider from "@/theme/theme-provider";
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "AI Smile Enalyze",
  description: "AI Smile Enalyze"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf] ${dmSans.className}`}
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
