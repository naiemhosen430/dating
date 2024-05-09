"use client";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { shuffle } from "lodash";
import { MineContext } from "@/Context/MineContextProvider";
import Avater from "./Avater";

export default function InterestBox() {
  const [shuffledInterest, setShuffledInterest] = useState([]);
  const [shuffledInterest2, setShuffledInterest2] = useState([]);
  const { chats, setChats, data } = useContext(MineContext);

  const randomChat = chats?.filter((chat) => chat.type === "random");

  const [interestOption, setInterestOption] = useState([
    "Anime",
    "BTS",
    "Horror-Movies",
    "Coding",
    "Music",
    "Fitness",
    "Travel",
    "Gaming",
    "Art",
    "Books",
    "Photography",
    "Fashion",
    "Food",
    "Movies",
    "Tech",
    "Sports",
    "Pets",
    "Yoga",
    "DIY",
    "Dance",
    "Cooking",
    "Gardening",
    "Crafts",
    "Podcasts",
    "Writing",
    "Social-Media",
    "Reading",
    "Hiking",
    "Sustainability",
    "Finance",
    "Volunteering",
    "Comedy",
    "Space",
    "Marketing",
    "Blockchain",
    "Genealogy",
    "Minimalism",
    "Woodworking",
    "Motorsports",
    "Foraging",
    "Astrophotography",
    "Culinary",
  ]);

  // slider
  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 235;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 235;
  };

  const containerRef = useRef(null);
  useEffect(() => {
    const shuffledArray = shuffle(interestOption);
    setShuffledInterest(shuffledArray);

    const shuffledArray2 = shuffle(interestOption);
    setShuffledInterest2(shuffledArray2);

    containerRef.current.classList.add("scroll-smooth");
  }, []);

  if (!randomChat) {
    return (
      <>
        <div className="w-full rounded-2xl">
          <h1 className="text-slate-500 p-1 px-2 flex items-center">
            <span className="block w-6/12">Interests</span>
            <Link
              className="block w-6/12 text-right text-slate-600"
              href="/interests"
            >
              See All
            </Link>
          </h1>
          <div className="space-y-2">
            <h1 className=" text-xs text-center">No chats found</h1>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="bg-slate-950 w-full rounded-2xl p-2 px-0">
        <h1 className="text-slate-500 p-1 px-2 flex items-center">
          <span className="block w-6/12">Interests</span>
          <Link
            className="block w-6/12 text-right text-slate-600"
            href={"/interests"}
          >
            <span>See All</span>
          </Link>
        </h1>
        <div className="py-2 space-y-2">
          <div className="overflow-x-auto" ref={containerRef}>
            <div
              className="space-x-2 flex justify-center overflow-y-hidden relative"
              id="slider"
            >
              {shuffledInterest?.map((item, index) => (
                <div key={item} className="slide-item">
                  <Link href={`/people/${item}`}>
                    <span className="block text-center w-28 text-xs p-1 px-3 rounded-2xl bg-slate-800">
                      {item}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto" ref={containerRef}>
            <div
              className="space-x-2 flex justify-center overflow-y-hidden relative"
              id="slider"
            >
              {shuffledInterest2.map((item, index) => (
                <div key={item} className="slide-item">
                  <Link href={`/people/${item}`}>
                    <span className="block text-center w-28 text-xs p-1 px-3 rounded-2xl bg-slate-800">
                      {item}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* chat here */}
        <div className=" space-x-4 flex">
          {randomChat?.length === 0 || !randomChat ? (
            <h1 className="text-center">No chats found</h1>
          ) : (
            randomChat?.map((chat) => (
              <div className="inline-block w-8 h-8 rounded-full">
                <Link href={`/converssion/${chat?.profileInfo?._id}`}>
                  <div className=" bg-slate-900 w-10 h-10 rounded-full overflow-hidden inline-block">
                    <Avater text={chat?.profileInfo?.profilepicture} />
                  </div>

                  {/* <img
                    className="block h-full w-full rounded-full"
                    src={
                      chat.profileInfo?.profilepicture
                        ? chat.profileInfo?.profilepicture
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCqu8BOhvKFDaFMAnjpAbK4o0VTGqo9BbeqTOvoWuVVfSqvqgG6hY5dc52EpEf5QTdBKY&usqp=CAU"
                    }
                    alt=""
                  /> */}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
