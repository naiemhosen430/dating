"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Menu from "./Components/Shared/Menu";
import ButtonBer from "./Components/Shared/ButtonBer";
import bg_image from "./assets/bg_image.png";

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
  console.log(bg_image);
  return (
    <>
      <Menu />
      <div className=" h-screen w-scree bg-image-container lg:bg-cover text-center bg-contain bg-bottom pt-20">
        {/* when meeting eatch other */}
        {searchpplbox && (
          <div onClick={searchPeople} className="h-screen w-scree">
            <div className="p-5 text-2xl font-bold custom-windo-height bg-slate-800 w-9/12 lg:w-4/12 rounded-lg border m-auto">
              <h1>Searching....</h1>
              <p className="text-sm text-slate-500 p-4">{displayText}</p>
            </div>
          </div>
        )}

        {/* when looking for other */}
        {mainlbox && (
          <div
            onClick={searchPeople}
            className="h-screen w-scree cursor-pointer"
          >
            <div className="p-5 text-2xl font-bold custom-windo-height bg-slate-800 w-9/12 lg:w-4/12 rounded-lg border m-auto">
              <h1>Tap to chat</h1>
              <p className="text-sm text-slate-500 p-4">
                What i am thinking! Let's talk with someone.
              </p>
            </div>
          </div>
        )}
      </div>
      <ButtonBer />
    </>
  );
}
