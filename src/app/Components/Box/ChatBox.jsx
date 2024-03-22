
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChatBox() {
  const [chats, setChats] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await axios.get("/api/me");
        setUserInfo(userData.data.dat);
      } catch (err) {
        console.log(err);
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
    if (!chats || !userInfo) return;
    const fetchDataForChats = async () => {
      const promises = chats.map(async (chat) => {
        const otherPersonId = chat.chatids.find((id) => id !== userInfo._id);
        const userData = await axios.get(`/api/profile/${otherPersonId}`);
        return userData.data.data;
      });
      Promise.all(promises)
        .then((userDataArray) => {
          const updatedChats = chats.map((chat, index) => ({
            ...chat,
            otherPersonData: userDataArray[index], // Add other person's data to each chat object
          }));
          setChats(updatedChats);
        })
        .catch((err) => console.log(err));
    };
    fetchDataForChats();
  }, [chats, userInfo]);

  return (
    <>
      <div className="w-full rounded-2xl">
        <h1 className="text-slate-500 p-1 px-2 flex items-center">
          <span className="block w-6/12">Friend and chat</span>
          <Link className="block w-6/12 text-right text-slate-600" href="">
            {/* Add correct href value */}
          </Link>
        </h1>
        <div className="space-y-2">
          {chats?.length === 0 ? (
            <h1 className="py-10 text-center">No chats found</h1>
          ) : (
            chats?.map((chat) => (
              <div
                className="flex items-center justify-center p-2 px-1"
                key={chat.id}
              >
                <div className="w-2/12 flex items-center rounded-full pb-1">
                  <Link
                    className="block"
                    href={`/profile/${chat.otherPersonData?._id}`}
                  >
                    <img
                      className="w-12 h-12 rounded-full inline-block"
                      src={chat.otherPersonData?.profilepicture}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="w-10/12">
                  <Link href={`/converssion/${chat.otherPersonData?._id}`}>
                    <h1 className="text-sm px-2">
                      {chat.otherPersonData?.name}
                    </h1>
                    <h1 className="text-xs px-2 text-red-500">
                      active 11 m ago
                    </h1>
                    <h1 className="text-xs px-2 text-red-400 text-right flex">
                      <span className="w-8/12 text-left text-base block">
                        Hello
                      </span>
                      <span className="text-xs text-right w-4/12 block text-red-500">
                        5 m ago
                      </span>
                    </h1>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
