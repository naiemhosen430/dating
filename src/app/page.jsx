"use client";
import { useContext, useEffect, useState } from "react";
import Menu from "./Components/Shared/Menu";
import ButtonBer from "./Components/Shared/ButtonBer";
import { IoClose } from "react-icons/io5";
import { GiBarStool } from "react-icons/gi";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

import { FaPowerOff } from "react-icons/fa6";
import { MineContext } from "@/Context/MineContext";
import { push, ref, set, remove, onChildAdded } from "firebase/database";
import { db } from "./firebaseConfig";
import axios from "axios";

export default function Home() {
  const { data } = useContext(MineContext);
  if (!data) {
    return (
      <>
        <Menu />
        <div className="h-screen w-screen bg-image-container lg:bg-cover text-center bg-contain bg-bottom pt-20">
          {/* Content when meeting each other or looking for others */}
          <div className="h-screen w-screen cursor-pointer">
            <div className="p-5 text-2xl font-bold custom-windo-height bg-slate-800 w-9/12 lg:w-4/12 rounded-lg border m-auto">
              <h1> loading....</h1>
              <p className="text-sm text-slate-500 p-4"></p>
            </div>
          </div>
        </div>
        <ButtonBer />
      </>
    );
  }

  const [searchpplbox, setSearchpplbox] = useState(false);
  const [mainlbox, setMainlbox] = useState(true);

  // animation text
  const text = [
    "Wait, finding for you a best talk partner...",
    "I am bored, i am weak, come and chat with me....",
    "Yes i am a the world, I am over the moon, I am perfect...",
  ];
  const [displayText, setDisplayText] = useState("");
  const [chunkIndex, setChunkIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newFriend, setNewFriend] = useState(null);
  const [newFriendId, setNewFriendId] = useState(null);
  const [errorBox, setErrorBox] = useState(false);
  const [leaveedboxshow, setLeaveedboxshow] = useState(false);
  const [mymessage, setMymessage] = useState("");
  const [friendmessage, setFriendmessage] = useState("");
  const handleTextareaChange = (e) => {
    setMymessage(e.target.value);
  };

  useEffect(() => {
    if (mymessage) {
      const chatRef = ref(db, "randommessage/" + data._id);
      set(chatRef, { mymessage });
    }
  }, [mymessage, data._id]);

  const chatRef = ref(db, "randommessage/" + newFriendId);
  onChildAdded(chatRef, (snapshot) => {
    const newMessage = snapshot.val();
    if (newMessage) {
      setFriendmessage(newMessage);
    } else {
      setLeaveedboxshow(false);
    }
  });

  useEffect(() => {
    const currentText = text[chunkIndex];
    const typingInterval = setInterval(() => {
      if (currentIndex < currentText.length) {
        setDisplayText((prevText) => prevText + currentText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(typingInterval);

        setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);

          // Move to the next chunk of text
          setChunkIndex((prevIndex) => (prevIndex + 1) % text.length);
        }, 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [chunkIndex, currentIndex]);
  // onclick
  const searchPeople = async () => {
    const chatRef = ref(db, "searching/" + data._id);
    await set(chatRef, { id: data._id });
    setMainlbox(false);
    setSearchpplbox(true);
  };

  const cencelsearchPeople = async () => {
    const chatRef = ref(db, "searching/" + data._id);
    await remove(chatRef);
    setMainlbox(true);
    setSearchpplbox(false);
  };

  useEffect(() => {
    if (searchpplbox) {
      const chatRef = ref(db, "searching/");
      const handleChildAdded = (snapshot) => {
        const data = snapshot.val();
        if (data && data.id && data.id !== data._id) {
          // Check if the ID is not equal to your own ID
          setNewFriendId(data.id);
        }
      };
      onChildAdded(chatRef, handleChildAdded);

      return () => {
        chatRef.off("child_added", handleChildAdded);
      };
    }
  }, [searchpplbox, data._id]); // Include data._id as a dependency to make sure the effect updates when your ID changes

  useEffect(() => {
    const fatchData = async () => {
      if (newFriendId) {
        await axios
          .get(`/api/profile/${newFriendId}`)
          .then((data) => {
            setNewFriend(data.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fatchData();
  }, [newFriendId]);

  const openLeavepopup = () => {
    setErrorBox(true);
  };

  const closeErrorBox = () => {
    setErrorBox(false);
  };

  const leaveChat = () => {
    const chatRef = ref(db, "randommessage/" + data._id);
    remove(chatRef);
    setSearchpplbox(false);
    setMainlbox(true);
    setNewFriend(null);
  };

  const closeMyChat = () => {
    const chatRef = ref(db, "randommessage/" + data._id);
    remove(chatRef);
    setSearchpplbox(false);
    setMainlbox(true);
    setNewFriend(null);
  };

  if (newFriend) {
    return (
      <>
        {leaveedboxshow && (
          <div className="fixed z-50 justify-center align-center top-0 left-0 bg-gradient-to-t from-black to-transparent h-screen w-screen">
            <div className="lg:w-5/12 mt-10 my-5 w-10/12 text-center m-auto bg-black p-5 rounded-2xl shadow-2xl">
              <h1 className="text-black text-2xl px-4">
                Another one has leaved
              </h1>
              <button
                onClick={closeMyChat}
                className="p-2 bg-slate-600 mx-4 my-2 w-5/12 text-white m-auto inline-block font-bold rounded-md shadow-lg"
              >
                Ok
              </button>
            </div>
          </div>
        )}
        {errorBox && (
          <div className="fixed z-50 justify-center align-center top-0 left-0 bg-gradient-to-t from-black to-transparent h-screen w-screen">
            <div className="lg:w-5/12 mt-10 my-5 w-10/12 text-center m-auto bg-black p-5 rounded-2xl shadow-2xl">
              <h1 className="text-black text-2xl px-4">
                Do you want to leave?
              </h1>
              <button
                onClick={closeErrorBox}
                className="p-2 bg-slate-600 mx-4 my-2 w-5/12 text-white m-auto inline-block font-bold rounded-md shadow-lg"
              >
                Later
              </button>
              <button
                onClick={leaveChat}
                className="p-2 bg-slate-900 mx-4 my-2 w-5/12 text-white m-auto inline-block font-bold rounded-md shadow-lg"
              >
                Leave
              </button>
            </div>
          </div>
        )}
        <div className="flex bg-slate-900 fixed z-10 top-0 w-full items-center px-4 shadow-md">
          <h1 className="text-white font-bold lg:w-2/12 w-6/12 text-3xl space-x-4">
            Zane
          </h1>

          <ul className="lg:w-2/12 w-6/12 flex justify-end items-center space-x-4">
            <h1 className="text-slate-500 cursor-pointer text-2xl space-x-2 flex items-center justify-end hover:text-white py-2 rounded-md">
              <FaPowerOff onClick={openLeavepopup} />
            </h1>
          </ul>
        </div>
        <div className="h-screen w-screen bg-image-container lg:bg-cover text-center bg-contain bg-bottom pt-20">
          <div className="h-screen w-screen">
            <div className="flex justify-center">
              <textarea
                className="p-5 text-lg font-bold disabled custom-windo-height-text block bg-slate-800 w-5/12 rounded-lg border m-2"
                value={friendmessage}
                readOnly
              />
              <textarea
                className="p-5 text-lg font-bold custom-windo-height-text block bg-slate-800 w-5/12 rounded-lg border m-2"
                value={mymessage}
                onChange={handleTextareaChange}
              />
            </div>

            <div className="fixed bottom-5 w-full">
              <div className="flex justify-center">
                <div className="w-6/12 text-center">
                  {newFriend?.gender === "male" ? (
                    <FaMale className="text-10xl text-slate-200 inline-block" />
                  ) : (
                    <FaFemale className="text-10xl text-slate-200 inline-block" />
                  )}
                </div>
                <div className="w-6/12 text-center">
                  {newFriend?.gender === "male" ? (
                    <FaMale className="text-10xl text-slate-200 inline-block" />
                  ) : (
                    <FaFemale className="text-10xl text-slate-200 inline-block" />
                  )}
                </div>
              </div>

              <div className="flex padding-tophome justify-center">
                <div className="w-6/12 text-center">
                  <GiBarStool className="text-10xl text-white inline-block" />
                </div>
                <div className="w-6/12 text-center">
                  <GiBarStool className="text-10xl text-white inline-block" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {searchpplbox && (
        <>
          <div className="flex bg-slate-900 fixed z-10 top-0 w-full items-center px-4 shadow-md">
            <h1 className="text-white font-bold lg:w-2/12 w-6/12 text-3xl space-x-4">
              Zane
            </h1>

            <ul className="lg:w-2/12 w-6/12 flex justify-end items-center space-x-4">
              <h1 className="text-slate-500 cursor-pointer text-2xl space-x-2 flex items-center justify-end hover:text-white py-2 rounded-md">
                <FaPowerOff onClick={cencelsearchPeople} />
              </h1>
            </ul>
          </div>
          <div className="h-screen w-screen bg-image-container lg:bg-cover text-center bg-contain bg-bottom pt-20">
            <div className="h-screen w-screen">
              <div className="p-5 text-2xl font-bold custom-windo-height bg-slate-800 w-9/12 lg:w-4/12 rounded-lg border m-auto">
                <h1>Searching....</h1>
                <p className="text-sm text-slate-500 p-4">{displayText}</p>
              </div>

              <div className="fixed bottom-5 w-full">
                <div className="flex justify-center">
                  <div className="w-6/12 text-center"></div>
                  <div className="w-6/12 text-center">
                    {data?.gender === "male" ? (
                      <FaMale className="text-10xl text-slate-200 inline-block" />
                    ) : (
                      <FaFemale className="text-10xl text-slate-200 inline-block" />
                    )}
                  </div>
                </div>

                <div className="flex padding-tophome justify-center">
                  <div className="w-6/12 text-center">
                    <GiBarStool className="text-10xl text-white inline-block" />
                  </div>
                  <div className="w-6/12 text-center">
                    <GiBarStool className="text-10xl text-white inline-block" />
                  </div>
                </div>

                <div className="text-center">
                  <IoClose
                    onClick={cencelsearchPeople}
                    className="p-2 text-5xl rounded-full inline-block bg-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {mainlbox && (
        <>
          <Menu /> {/* Render the Menu component */}
          <div className="h-screen w-screen bg-image-container lg:bg-cover text-center bg-contain bg-bottom pt-20">
            {/* Content when meeting each other or looking for others */}
            <div
              onClick={searchPeople}
              className="h-screen w-screen cursor-pointer"
            >
              <div className="p-5 text-2xl font-bold custom-windo-height bg-slate-800 w-9/12 lg:w-4/12 rounded-lg border m-auto">
                <h1>Tap to chat</h1>
                <p className="text-sm text-slate-500 p-4">
                  What I am thinking! Let's talk with someone.
                </p>
              </div>
            </div>
          </div>
          <ButtonBer /> {/* Render the ButtonBer component */}
        </>
      )}
    </>
  );
}
