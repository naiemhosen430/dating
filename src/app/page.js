"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Menu from "./Components/Shared/Menu";

export default function Home() {
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
        }, 500); // Wait for 500ms before clearing and moving to the next chunk
      }
    }, 100); // Adjust the interval to control the typing speed

    return () => clearInterval(typingInterval);
  }, [chunkIndex, currentIndex]);
  // onclick
  const searchPeople = () => {
    if (searchpplbox === true && mainlbox === false) {
      setSearchpplbox(false);
      setMainlbox(true);
    } else {
      setMainlbox(false);
      setSearchpplbox(true);
    }
  };
  return (
    <>
      <Menu />
      <div
        style={{
          backgroundImage:
            'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ4Hk-8m9Cl5hs6vUw5yHfz59sPO66UxI5pw&usqp=CAU")',
          backgroundRepeat: "no-repeat",
        }}
        className=" h-screen w-scree n opacity-40 lg:bg-cover text-center bg-contain bg-bottom pt-20"
      >
        {/* when meeting eatch other */}
        {searchpplbox && (
          <div onClick={searchPeople} className="h-screen w-scree">
            <button className="lg:inline-block hidden hover:bg-slate-900 text-xl w-5/12 rounded-lg py-2 px-4 bg-slate-600 text-white font-bold">
              Action
            </button>
            <div className="p-2 hidden text-left h-3/6 bg-slate-800 w-11/12 lg:w-5/12 rounded-lg border m-auto">
              hello
            </div>
            <div className="p-5 text-2xl font-bold h-3/6 bg-slate-800 w-11/12 lg:w-5/12 rounded-lg border m-auto">
              <h1>Searching....</h1>
              <p className="text-lg text-slate-500 p-4">{displayText}</p>
              <h1 className="text-lg pt-20">Tap to cencel the searching</h1>
            </div>
            <button className="inline-block mt-16 lg:hidden hover:bg-slate-900 text-xl rounded-lg py-2 px-4 bg-slate-600 text-white font-bold">
              Action
            </button>
          </div>
        )}

        {/* when looking for other */}
        {mainlbox && (
          <div
            onClick={searchPeople}
            className="h-screen w-scree cursor-pointer"
          >
            <button className="lg:inline-block hidden hover:bg-slate-900 text-xl w-5/12 rounded-lg py-2 px-4 bg-slate-600 text-white font-bold">
              Action
            </button>
            <div className="p-5 text-2xl font-bold h-3/6 bg-slate-800 w-11/12 lg:w-5/12 rounded-lg border m-auto">
              <h1>Tap to chat</h1>
              <p className="text-lg text-slate-500 p-4">
                What i am thinking! Let's talk with someone.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
