"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { MdHelp } from "react-icons/md";

export default function page() {
  const [profileInfo, setProfileInfo] = useState([]);
  const [interesta, setinteresta] = useState([]);
  useEffect(() => {
    const fatchData = async () => {
      await axios
        .get("/api/me")
        .then((data) => {
          setProfileInfo(data.data.data);
          setinteresta(data.data.data.interest);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
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
            src="https://t4.ftcdn.net/jpg/01/97/15/87/360_F_197158744_1NBB1dEAHV2j9xETSUClYqZo7SEadToU.jpg"
            alt=""
          />
          <h1 className="text-xl font-bold p-1 text-white">
            {profileInfo.name}
          </h1>
          <div className="flex w-10/12 m-auto items-center text-slate-500 justify-center">
            <span className="inline-block">{profileInfo.age} / </span>
            <span className="inline-block"> {profileInfo.gender}</span>
          </div>
          <div className="flex w-10/12 m-auto items-center text-slate-500 justify-center">
            <span className="inline-block">{profileInfo.country}</span>
          </div>

          {/* tag */}
          <div className="w-10/12 space-x-2 space-y-2 py-5 lg:6/12 m-auto">
            {interesta.map((i) => (
              <span
                key={i}
                className="inline-block p-1 px-4 rounded-2xl bg-slate-800"
              >
                {i}
              </span>
            ))}
          </div>

          {/* post */}
          <div className="p-10 text-slate-600 text-lg">There is no post</div>
        </div>
      </div>
    </>
  );
}
