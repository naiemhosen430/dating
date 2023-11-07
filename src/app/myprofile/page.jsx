"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { MdHelp } from "react-icons/md";

export default function page() {
  const [profileInfo, setProfileInfo] = useState([]);

  const secretKey = process.env.TOKEN_SECRET;
  const accessToken = Cookies.get("accesstoken");
  console.log({ accessToken });
  // const decoded = jwt.verify(accessToken, secretKey);
  useEffect(() => {
    const fatchData = async () => {};
    fatchData();
  }, []);

  return (
    <>
      <div className="p-2">
        {/* header */}
        <div className="p-2 flex items-center text-3xl">
          <div className="w-6/12">
            <Link href={"/chat"}>
              <CgArrowLeft />
            </Link>
          </div>
          <div className="w-6/12 text-right">
            <MdHelp className="inline-block" />
          </div>
        </div>

        {/* profile head */}
        <div className="text-center">
          <img
            className="w-20 h-20 inline-block m-4 mb-2 rounded-full"
            src="https://img.freepik.com/premium-photo/portrait-beautiful-korean-women-park_825367-1376.jpg"
            alt=""
          />
          <h1 className="text-xl font-bold p-1 text-white">Rodela</h1>
          <div className="flex w-10/12 m-auto items-center text-slate-500 justify-center">
            <span className="inline-block">17 / </span>
            <span className="inline-block"> Female</span>
          </div>
          <div className="flex w-10/12 m-auto items-center text-slate-500 justify-center">
            <span className="inline-block">South Korea</span>
          </div>

          {/* tag */}
          <div className="w-10/12 space-x-2 space-y-2 py-5 lg:6/12 m-auto">
            <span className="inline-block p-1 px-4 rounded-2xl bg-slate-800">
              Anime
            </span>
            <span className="inline-block p-1 px-4 rounded-2xl bg-slate-800">
              Anime
            </span>
            <span className="inline-block p-1 px-4 rounded-2xl bg-slate-800">
              Anime
            </span>
            <span className="inline-block p-1 px-4 rounded-2xl bg-slate-800">
              Anime
            </span>
            <span className="inline-block p-1 px-4 rounded-2xl bg-slate-800">
              Anime
            </span>
            <span className="inline-block p-1 px-4 rounded-2xl bg-slate-800">
              Anime
            </span>
          </div>

          {/* post */}
          <div className="p-10 text-slate-600 text-lg">There is no post</div>
        </div>
      </div>
    </>
  );
}
