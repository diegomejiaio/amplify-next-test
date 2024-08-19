import './globals.css';
import type { Metadata } from "next";
import { Titillium_Web as FontSans } from "next/font/google";
import "./app.css";
import Navbar from "./components/NavbarInternal";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Tivit Digital Latam",
  description: "NextGen Digital Transformation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}