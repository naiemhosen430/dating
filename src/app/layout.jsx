'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { MineContext } from "@/Context/MineContext";
import {useState, useEffect}from "react"
import axios from "axios"

const inter = Inter({ subsets: ["latin"] });

 const metadata = {
  title: "Meet New People",
  description: "Here is a new world",
};
export default function RootLayout({ children }) {



  // contex value
  const [data, setData] = useState(null);

  // Fetch website information on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMyData = await axios.get(`/api/me`);
        setData(responseMyData.data.data);
      } catch (error) {
        setData("");
        console.error({ error });
      }
    };

    fetchData();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen overflow-hidden">
        <MineContext.Provider value={{ data, setData }}>

          {children}
        </MineContext.Provider>
          </div>
      </body>
    </html>
  );
}
