import { Loved_by_the_King } from "next/font/google";
import React from "react";
import { CgComment, CgHeart } from "react-icons/cg";
import { LiaDoveSolid } from "react-icons/lia";
import { MdHelp } from "react-icons/md";

export default function Post() {
  return (
    <>
      <div className="p-2">
        {/* header */}
        <div className="flex items-center space-x-2">
          <div className="w-2/12 text-center">
            <img
              className="w-10 m-auto h-10 rounded-full block"
              src="https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-young-female-korean-girl-at-an-airport-with-backpack-image_2533889.jpg"
              alt=""
            />
          </div>
          <div className="w-8/12">
            <h1 className="text-xl text-white font-bold">MD Naiem</h1>
            <h1 className="text-sm text-slate-600 font-bold">2 days ago</h1>
          </div>
          <div className="w-2/12 text-2xl text-center">
            <MdHelp className="inline-block" />
          </div>
        </div>

        {/* content */}
        <div className="py-4 text-slate-600">
          <p>Hello how are you everyone!</p>
        </div>

        {/* footer */}
        <div className="flex items-center space-x-5">
          <div className="w-6/12 text-xl cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl">
            <CgHeart className="inline-block" />
          </div>
          <div className="w-6/12 text-xl cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl">
            <CgComment className="inline-block" />
          </div>
        </div>
      </div>
    </>
  );
}
