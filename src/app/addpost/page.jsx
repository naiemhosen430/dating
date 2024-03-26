"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";
import { MdHelp } from "react-icons/md";
import { MineContext } from "@/Context/MineContextProvider";

export default function page() {
  const { handleAddPost } = useContext(MineContext);

  const [postContent, setPostContent] = useState("");
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [interestOption] = useState([
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

  // Function to handle adding a new post
  const handleSubmit = () => {
    handleAddPost(postContent, selectedOptions);
    // Reset input fields after submitting
    setPostContent("");
    setSelectedOptions([]);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <>
      <div className="p-2 flex items-center text-3xl">
        <div className="w-4/12">
          <Link href={"/"}>
            <CgArrowLeft />
          </Link>
        </div>
        <div className="w-4/12 text-white text-xl text-center">
          <Link href={""}>Share Moment</Link>
        </div>
        <div className="w-4/12 text-right">
          <MdHelp className="inline-block" />
        </div>
      </div>

      <p className="text-center text-xl text-slate-500 p-4">
        Your post will be shared with everyone on Zane
      </p>

      {/* Post body */}
      <div className="w-12/12 lg:w-6/12 px-5 m-auto">
        <div className="py-3">
          <textarea
            className="w-full bg-transparent text-white p-4 rounded-lg block"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);
              setError("");
            }}
            cols="30"
            rows="6"
          ></textarea>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        {/* Interest */}
        <div className="p-2 lg:px-10 overflow-y-auto h-screen space-x-2 space-y-2 pb-52">
          <h1 className="text-xl text-white font-bold p-4 text-center">
            Choose your interest
          </h1>
          {interestOption.map((item) => (
            <label
              key={item}
              className={`p-1 text-xs px-3 inline-block rounded-3xl ${
                selectedOptions.includes(item) ? "bg-red-500 " : "bg-slate-800"
              } text-slate-50`}
            >
              <input
                className="text-sm text-white hidden font-bold p-1 px-2 rounded-xl bg-slate-800"
                type="checkbox"
                checked={selectedOptions.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item}
            </label>
          ))}
        </div>

        <div className="py-3 fixed bottom-5 bg-black w-full text-center">
          <button
            className="p-2 px-5 text-white inline-block rounded-lg bg-slate-400 font-bold"
            onClick={handleAddPostClient}
          >
            Add Post
          </button>
        </div>
      </div>
      {/* Post body */}
    </>
  );
}
