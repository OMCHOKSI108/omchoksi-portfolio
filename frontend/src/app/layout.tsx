import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingThemeToggle from "@/components/floating-theme-toggle";
import QuickConnectRoot from "@/components/quick-connect-root";
import SiteGrid from "@/components/site-grid";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Om Choksi - Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        <ThemeProvider>
          <QuickConnectRoot />
          <div className="noise-overlay" />
          <div className="site-vignette" />
          {/* Top-aligned subtle repeating square grid visible on every page */}
          <SiteGrid />
          <CustomCursor />
          <FloatingThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
