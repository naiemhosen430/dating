"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { MdSend } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import axios from "axios";
import Link from "next/link";
import { db } from "@/app/firebaseConfig";
import { ref, get, set, push, off, onValue, remove } from "firebase/database";
import { usePathname, useRouter } from "next/navigation";
import { MineContext } from "@/Context/MineContextProvider";
import ProfileActionPopup from "@/app/Components/PopupBox/ProfileActionPopup";

export default function Page() {
  const router = useRouter();
  const { chats, setChats, data } = useContext(MineContext);
  const [oprionBoxState, setOprionBoxState] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const id = usePathname().split("converssion/")[1];
  const messagesEndRef = useRef(null);
  const idString = id.toString();
  const chatData = chats?.find(
    (chat) => chat?.profileInfo?._id.toString() === idString
  );

  useEffect(() => {
    if (chatData?._id) {
      const chatRef = ref(db, "conversations/" + chatData?._id);
      let chatArr = [];

      const handleSnapshot = (snapshot) => {
        if (snapshot.exists()) {
          const chatObj = snapshot.val();
          chatArr = Object.values(chatObj);
          const customChatIndex = chats.findIndex(
            (c) => c?._id === chatData?._id
          );

          if (customChatIndex !== -1) {
            // Update existing chat
            let updatedChats = [...chats];
            updatedChats[customChatIndex] = {
              ...chats[customChatIndex],
              chatArr,
            };
            setChats(updatedChats);
          }
        }
      };

      onValue(chatRef, handleSnapshot);

      // Cleanup function to remove the event listener when component unmounts
      return () => {
        off(chatRef, "value", handleSnapshot);
      };
    }
  }, [chatData, chats]);

  const sendMessage = async () => {
    try {
      if (!chatData) {
        const response = await axios.post(`/api/chat/${id}`);
        const chatId = response?.data?.data?._id;
        const newCreatedChat = response?.data?.data;
        const profileInfo = response?.data?.friend;
        const chatRef = ref(db, "conversations/" + chatId);
        const newMessageRef = push(chatRef);
        const newMessageData = {
          message: messageInput,
          id: data._id,
          msgtime: Date.now(),
        };
        await set(newMessageRef, newMessageData);
        const ntfRef = ref(db, "ntf/" + response?.data?.friend?._id);
        updateNotification(ntfRef, chatId);
        setMessageInput("");

        let newChats = [...chats];
        const chatWithProfile = {
          ...newCreatedChat,
          profileInfo,
        };
        newChats.push(chatWithProfile);

        setChats(newChats);
      } else {
        const chatRef = ref(db, "conversations/" + chatData?._id);
        const newMessageRef = push(chatRef);
        const newMessageData = {
          message: messageInput,
          id: data._id,
          msgtime: Date.now(),
        };
        await set(newMessageRef, newMessageData);
        const ntfRef = ref(db, "ntf/" + chatData.profileInfo._id);
        updateNotification(ntfRef, chatData?._id);
        setMessageInput("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // for add friend
  const addFriend = async () => {
    try {
      const response = await axios.put(`/api/user/addfriend/${id}`);
      if (response?.data) {
        const newCreatedChat = response?.data.data;
        const profileInfo = response?.data.friend;

        const ntfRef = ref(db, "ntf/" + response?.data?.friend?._id);

        const snapshot = await get(ntfRef);
        if (snapshot.exists()) {
          const existingNtfData = snapshot.val();
          await set(ntfRef, {
            ...existingNtfData,
            friendactiondata: JSON.stringify({
                ...(existingNtfData.friendactiondata ? JSON.parse(existingNtfData.friendactiondata) : []),
                chatId: response?.data?.data?._id,
                action: "friend"
            }),
        });
        } else {
        }

        const chatWithProfile = {
          ...newCreatedChat,
          profileInfo,
        };

        const updatedChats = chats.map((chatItem) => {
          if (chatItem._id === chatWithProfile?._id) {
            return chatWithProfile;
          }
          return chatWithProfile;
        });

        setChats(updatedChats);

        router.push("/chat");
      }
    } catch (error) {}
  };



  const updateNotification = async (ntfRef, chatidd) => {
    try {
      const snapshot = await get(ntfRef);
      if (snapshot.exists()) {
        const existingNtfData = snapshot.val();
        const updatedMsgUnseen = (existingNtfData.msgUnseencount || 0) + 1;
        await set(ntfRef, {
          ...existingNtfData,
          neMsgData: JSON.stringify([
            ...(existingNtfData.neMsgData ? JSON.parse(existingNtfData.neMsgData) : []),
            {
                chatid: chatidd,
                friendid: data?._id
            }
          ]),
        
          msgUnseen: updatedMsgUnseen,
          msgtime: Date.now(),
        });


      } else {
        const newNtfData = {
          neMsgData: `chatid:${chatidd},friendid:${data?._id}|`,
          msgUnseen: 1,
          msgtime: Date.now(),
        };
        await set(ntfRef, newNtfData);
      }
    } catch (error) {
      console.error(
        "Error checking or updating notification collection:",
        error
      );
    }
  };

  const toggleOption = () => {
    if (oprionBoxState){

      setOprionBoxState(false);
    }else{

      setOprionBoxState(true);
    }
  };



  return (
    <>
      {oprionBoxState && (
        <ProfileActionPopup chatData={chatData} toggleOption={toggleOption} />
      )}

      <div className="lg:w-6/12 w-12/12 m-auto z-40 h-screen bg-slate-950">
        <div className="p-2 fixed top-0 bg-black w-full lg:w-6/12 z-50 flex items-center text-3xl">
          <div className="w-2/12">
            <Link href={"/chat"}>
              <CgArrowLeft />
            </Link>
          </div>
          <div className="text-center w-8/12 text-lg text-white font-bold">
            <Link href={`/profile/${chatData?.profileInfo?._id}`}>
              {chatData?.profileInfo?.name}
            </Link>
          </div>
          <div className="w-2/12 text-right">
            <BsThreeDotsVertical
              onClick={toggleOption}
              className="inline-block"
            />
          </div>
        </div>
        <div className="overflow-y-auto w-full lg:w-6/12 m-auto z-30 custom-chat-field">
          {chatData?.chatArr ? (
            chatData?.chatArr?.length !== 0 ? (
              <>
                {chatData?.type === "friend" ? (
                  ""
                ) : (
                  <div className="p-2 px-4 m-2 mx-4 rounded-xl bg-slate-800 flex justify-around items-center">
                    <h1 className="text-sm text-white ">
                      Do you want to add each other as friends?
                    </h1>
                    <button
                      onClick={addFriend}
                      className="bg-slate-500 text-xs block p-2 px-4 text-white rounded-full"
                    >
                      Add
                    </button>
                  </div>
                )}
                {chatData?.chatArr
                  .slice()
                  .reverse()
                  .map((msg) => {
                    const date = new Date(msg.msgtime);
                    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;

                    return (
                      <div
                        className={`p-2 ${
                          msg.id === data._id ? "text-right" : ""
                        }`}
                        key={msg._id}
                      >
                        <div className="inline-block bg-slate-900 rounded-xl p-2 px-3 text-white">
                          <h1 className="text-white py-1">
                            {msg.message ? (
                              msg.message
                            ) : (
                              <AiFillLike className="text-4xl text-white" />
                            )}
                          </h1>
                          <h6 className="text-slate-400 text-xs p-1">
                            {formattedTime}
                          </h6>
                        </div>
                      </div>
                    );
                  })}
              </>
            ) : (
              <h1 className="py-60 text-center">No chat. Start texting</h1>
            )
          ) : (
            // Loading effect
            <h1 className="py-60 text-center">No chat. Start texting</h1>
          )}
          <div ref={messagesEndRef} />{" "}
          {/* Reference to the bottom of the message container */}
        </div>
      </div>
      <div className="fixed bottom-2 px-2 w-full lg:w-6/12 z-50 flex items-center text-3xl">
        <div className="flex items-center rounded-2xl w-full justify-center bg-slate-900">
          <input
            className="text-white focus:border-0 w-10/12 bg-transparent text-lg p-2 px-4 block m-0"
            type="text"
            placeholder="Message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)} // Update message input value
          />
          <div
            className="text-5xl cursor-pointer w-2/12 text-center rounded-3xl block pb-1"
            onClick={sendMessage}
          >
            {messageInput ? (
              <MdSend className="text-white inline-block" />
            ) : (
              <AiFillLike className="text-white inline-block" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
