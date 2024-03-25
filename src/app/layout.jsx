"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { MineContext } from "@/Context/MineContext";
import { useState, useEffect } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Meet New People",
  description: "Here is a new world",
};
export default function RootLayout({ children }) {
  // contex value
  const [data, setData] = useState(null);
  const [chats, setChats] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [myfriendid, setMyfriendid] = useState(null);
  const [allPost, setAllPost] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await axios.get("/api/chat");
        setChats(chatData.data.data);
      } catch (err) {
        setChats([]);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fatchData = async () => {
      await axios
        .get(`/api/profile/${myfriendid}`)
        .then((data) => {
          setProfileInfo(data.data.data);
        })
        .catch((err) => {
          setProfileInfo("none");
          console.log(err);
        });
    };

    fatchData();
  }, [myfriendid]);

  useEffect(() => {
    const fatchData = async () => {
      await get
        .get(`/api/post`)
        .then((data) => {
          setAllPost(data.data.data);
        })
        .catch((err) => {
          setAllPost([]);
          console.log(err);
        });
    };

    fatchData();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen overflow-hidden">
          <MineContext.Provider
            value={{
              data,
              setData,
              chats,
              setChats,
              profileInfo,
              setMyfriendid,
              allPost,
            }}
          >
            {children}
          </MineContext.Provider>
        </div>
      </body>
    </html>
  );
}
