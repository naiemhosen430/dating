"use client";
import axios from "axios"; // Import axios for making HTTP requests
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { MdHelp, MdSend } from "react-icons/md";
import { db } from "@/app/firebaseConfig";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";

export default function Page() {
  const [me,setMe]=useState(null)
  const [friend,setFriend]=useState(null)
  const [chatData, setChatData] = useState(null);
  const id = usePathname().split("converssion/")[1];

  useEffect(() => {
    const fetchChatData = async () => {
      const data = await axios.post(`/api/chat/${id}`);
      console.log(data);
      setFriend(data.data.friend)
      setMe(data.data.me)
      try {

        const docRef = doc(db, "converssion", data.data.data._id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap)
        if (docSnap.exists()) {
          setChatData(docSnap.data());
        } else {
          const initialChatData = { message: "Initial message" }; 
          await setDoc(docRef, initialChatData); // Create a new document with initial data
          setChatData(initialChatData); // Set chatData state with initial data
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData(); // Call the async function
  }, [id]);

  console.log(chatData)

  return (
    <>
      <div className="lg:w-6/12 w-12/12 m-auto z-30 h-screen bg-slate-950">
        {/* header */}
        <div className="p-2 sticky top-0 flex items-center text-3xl">
          <div className="w-2/12">
            <Link href={"/chat"}>
              <CgArrowLeft />
            </Link>
          </div>
          <div className="text-center w-8/12 text-2xl text-white font-bold">
            {friend.name}
          </div>
          <div className="w-2/12 text-right">
            <MdHelp className="inline-block" />
          </div>
        </div>

        {/* chat body  */}
        {chatData ? (
          <div className="p-2">
            <div className="inline-block bg-slate-900 rounded-xl text-white">
              {chatData.message}
            </div>
          </div>
        ) : (
          <h1 className="py-60 text-center">No chat. start texting</h1>
        )}

        {/* send chat */}
        <div className="fixed bottom-2 lg:w-6/12 w-12/12 m-auto mx-2">
          <div className="flex items-center justify-center bg-slate-950">
            <input
              className="text-white bg-slate-900 text-lg p-2 px-4 rounded-2xl block lg:w-10/12 w-11/12 m-0"
              type="text"
              placeholder="Message"
            />
            <div className="text-5xl cursor-pointer text-center rounded-3xl block lg:w-2/12 w-1/12 m-0">
              <MdSend />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
