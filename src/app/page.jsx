"use client";
import { useEffect, useState } from "react";
import Menu from "./Components/Shared/Menu";
import ButtonBer from "./Components/Shared/ButtonBer";
import { IoClose } from "react-icons/io5";
import { GiBarStool } from "react-icons/gi";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

import { FaPowerOff } from "react-icons/fa6";

export default function Home() {
  // const { data } = useContext(MainContext);
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
      {searchpplbox && (
        <>
          <div className="flex bg-slate-900 fixed z-10 top-0 w-full items-center px-4 shadow-md">
            <h1 className="text-white font-bold lg:w-2/12 w-6/12 text-3xl space-x-4">
              Zana
            </h1>

            <ul className="lg:w-2/12 w-6/12 flex justify-end items-center space-x-4">
              <h1 className="text-slate-500 cursor-pointer text-2xl space-x-2 flex items-center justify-end hover:text-white py-2 rounded-md">
                <FaPowerOff onClick={searchPeople} />
              </h1>
            </ul>
          </div>
          <div className="h-screen w-screen bg-image-container lg:bg-cover text-center bg-contain bg-bottom pt-20">
            <div className="h-screen w-screen">
              <div className="p-5 text-2xl font-bold custom-windo-height bg-slate-800 w-9/12 lg:w-4/12 rounded-lg border m-auto">
                <h1>Searching....</h1>
                <p className="text-sm text-slate-500 p-4">{displayText}</p>
              </div>

              <div className="flex justify-center">
                <div className="w-6/12 text-center">
                  <GiBarStool className="text-9xl text-white inline-block" />
                </div>
                <div className="w-6/12 text-center">
                  <GiBarStool className="text-9xl text-white inline-block" />
                </div>
              </div>

              <div className="text-center">
                <IoClose
                  onClick={searchPeople}
                  className="p-2 text-5xl rounded-full inline-block bg-black"
                />
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
