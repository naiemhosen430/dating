import React from "react";
import { CgSearch } from "react-icons/cg";
import Post from "../Components/Box/Post";
import ButtonBer from "../Components/Shared/ButtonBer";

export default function page() {
  return (
    <>
      <div className="space-y-4 p-2">
        <div className="rounded-full bg-slate-900 flex items-center justify-center sticky top-1">
          <input
            className="lg:text-xl text-sm p-2 px-4 rounded-full bg-slate-900 text-teal-50 w-10/12"
            type="search"
            name="text"
            id="text"
            placeholder="Search for person or post"
          />
          <div className="text-2xl block w-2/12 text-center">
            <CgSearch className="inline-block text-slate-600" />
          </div>
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
