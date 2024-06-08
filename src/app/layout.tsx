import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import ResponsiveDrawer from "@/components/drawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elden Ring Tracker",
  description: "Track your progress in Elden Ring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeRegistry options={{key: 'mui'}}>
          <ResponsiveDrawer>
            {children}
          </ResponsiveDrawer>
      </ThemeRegistry>
      </body>
    </html>
  );
}
