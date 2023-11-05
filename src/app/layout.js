import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "./Components/Shared/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Meet New People",
  description: "Here is a new world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
