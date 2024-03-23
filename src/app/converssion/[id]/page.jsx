"use client";
import React, { useEffect, useState, useRef } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { MdHelp, MdSend } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { db } from "@/app/firebaseConfig";
import { ref, get, set, push, off } from "firebase/database";
import { usePathname } from "next/navigation";

export default function Page() {
  const [me, setMe] = useState(null);
  const [msgdata, setMsgData] = useState(null);
  const [friend, setFriend] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const id = usePathname().split("converssion/")[1];
  const messagesEndRef = useRef(null); // Create a ref for the messages container

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await axios.post(`/api/chat/${id}`);
        const { friend, me, data } = response.data;
        setFriend(friend);
        setMe(me);
        setMsgData(data);

        const chatRef = ref(db, "conversations/" + data._id);
        const chatSnapshot = await get(chatRef);

        if (chatSnapshot.exists()) {
          const chatObj = chatSnapshot.val();
          const chatArr = Object.values(chatObj);
          setChatData(chatArr);
        } else {
          console.log("No chat data found. Creating new chat data.");
          setChatData([]);
        }

        // Add event listener for changes in the chat data
        chatRef.on("value", (snapshot) => {
          if (snapshot.exists()) {
            const chatObj = snapshot.val();
            const chatArr = Object.values(chatObj);
            setChatData(chatArr);
          } else {
            console.log("No chat data found.");
            setChatData([]);
          }
        });
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      if (msgdata) {
        const chatRef = ref(db, "conversations/" + msgdata._id);
        off(chatRef, "value"); // Remove the event listener
      }
    };
  }, [id, msgdata]);

  const sendMessage = async () => {
    try {
      const chatRef = ref(db, "conversations/" + msgdata._id);
      const newMessageRef = push(chatRef);
      const newMessageData = {
        message: messageInput,
        id: me._id,
        msgtime: Date.now(),
      };
      await set(newMessageRef, newMessageData);
      await axios.put(`/api/chat/update/${msgdata?._id}`, {
        lastmessage: messageInput,
      });
      setMessageInput("");

      // // After sending the message, scroll to the bottom of the message container
      // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="lg:w-6/12 w-12/12 m-auto z-40 h-screen bg-slate-950">
        <div className="p-2 fixed top-0 w-full z-50 flex items-center text-3xl">
          <div className="w-2/12">
            <Link href={"/chat"}>
              <CgArrowLeft />
            </Link>
          </div>
          <div className="text-center w-8/12 text-2xl text-white font-bold">
            {friend?.name}
          </div>
          <div className="w-2/12 text-right">
            <MdHelp className="inline-block" />
          </div>
        </div>

        <div className="overflow-y-auto z-30 custom-chat-field">
          {chatData ? (
            chatData
              .slice()
              .reverse()
              .map((msg) => {
                // Use slice() to create a copy of the array before reversing
                const date = new Date(msg.msgtime);
                const formattedTime = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`;

                return (
                  <div
                    className={`p-2 ${msg.id === me._id ? "text-right" : ""}`}
                    key={msg._id}
                  >
                    <div className="inline-block bg-slate-900 rounded-xl p-2 px-3 text-white">
                      <h1 className="text-white py-1">{msg.message}</h1>
                      <h6 className="text-slate-700 text-xs p-1">
                        {formattedTime}
                      </h6>
                    </div>
                  </div>
                );
              })
          ) : (
            <h1 className="py-60 text-center">No chat. Start texting</h1>
          )}
          <div ref={messagesEndRef} />{" "}
          {/* Reference to the bottom of the message container */}
        </div>

        <div className="fixed bottom-2 lg:w-6/12 w-12/12 m-auto mx-2">
          <div className="flex items-center justify-center bg-slate-950">
            <input
              className="text-white bg-slate-900 text-lg p-2 px-4 rounded-2xl block lg:w-10/12 w-11/12 m-0"
              type="text"
              placeholder="Message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)} // Update message input value
            />
            <div
              className="text-5xl cursor-pointer text-center rounded-3xl block lg:w-2/12 w-1/12 m-0"
              onClick={sendMessage} // Call sendMessage function on button click
            >
              <MdSend />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
