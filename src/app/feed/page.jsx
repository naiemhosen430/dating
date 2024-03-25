"use client";
import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import Post from "../Components/Box/Post";
import ButtonBer from "../Components/Shared/ButtonBer";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

export default function page() {
  const [text, setText] = useState({
    text: "",
  });

  return (
    <>
      {/* options  */}
      <div className="fixed bottom-32 right-4">
        <Link href="/addpost">

        <IoMdAdd  className="text-6xl block text-teal-50 p-2 rounded-full shadow-lg" />
        </Link>
      </div>
      {/* options  */}
      <div className="space-y-4 p-2">
        <div className="rounded-full bg-slate-900 flex items-center justify-center sticky top-1">
          <input
            className="lg:text-xl text-sm p-2 px-4 rounded-full bg-slate-900 text-teal-50 w-10/12"
            type="search"
            name="text"
            id="text"
            onChange={(event) => {
              setText({
                ...text, // Corrected from ...userInfo to ...text
                [event.target.name]: event.target.value,
              });
            }}
            placeholder="Search for person or post"
          />
          <Link href={`/search/${text.text}`}>
            <div className="text-2xl block w-2/12 text-center">
              <CgSearch className="inline-block text-slate-600" />
            </div>
          </Link>
        </div>

        {/* post */}
        <div className="lg:flex p-4 space-x-2">
          <div className="lg:w-7/12">
            <Post />
          </div>
          <div className="w-5/12 lg:inline-block hidden">Hello</div>
        </div>
      </div>
      <ButtonBer />
    </>
  );
}
