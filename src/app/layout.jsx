"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import MineContextProvider from "@/Context/MineContextProvider";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Meet New People",
  description: "Here is a new world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen overflow-hidden">
          <MineContextProvider>{children}</MineContextProvider>
        </div>
      </body>
    </html>
  );
}
