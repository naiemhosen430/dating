"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { CgComment, CgHeart } from "react-icons/cg";
import { MdHelp } from "react-icons/md";

export default function Post({ post }) {
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const fatchData = async () => {
      await axios
        .get(`/api/profile/${post?.userid}`)
        .then((data) => {
          setProfileInfo(data.data.data);
        })
        .catch((err) => {
          setProfileInfo("none");
          console.log(err);
        });
    };

    fatchData();
  }, [post?.userid]);

  if (!profileInfo) {
    return (
      <>
        <div className="p-2 my-5 loadingbig">
          {/* header */}
          <div className="flex items-center space-x-2">
            <div className="w-2/12 text-center">
              <Link
                className="w-10 m-auto h-10 loading rounded-full block"
                href={""}
              ></Link>
            </div>
            <div className="w-8/12">
              <h1 className="text-xl loading text-white font-bold">
                <Link href={""}></Link>
              </h1>
              <h1 className="text-sm loading text-slate-600 font-bold"></h1>
            </div>
            <div className="w-2/12 loading text-2xl text-center"></div>
          </div>

          {/* content */}
          <div className="py-4 text-slate-600">
            <p className="py-10 loadingbig"></p>
          </div>

          {/* footer */}
          <div className="flex items-center space-x-5">
            <div className="w-6/12 text-xl loading cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
            <div className="w-6/12 loading text-xl cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-2">
        {/* header */}
        <div className="flex items-center space-x-2">
          <div className="w-2/12 text-center">
            <Link href={"/profile/id"}>
              <img
                className="w-10 m-auto h-10 rounded-full block"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfhHGR8bTVzFRi4LjAKEbCXe3Nm7wSxh3H3g&usqp=CAU"
                alt=""
              />
            </Link>
          </div>
          <div className="w-8/12">
            <h1 className="text-xl text-white font-bold">
              <Link href={`/profile/${profileInfo._id}`}>
                {profileInfo.name}
              </Link>
            </h1>
            <h1 className="text-sm text-slate-600 font-bold">
              {post.createdAt}
            </h1>
          </div>
          <div className="w-2/12 text-2xl text-center">
            <MdHelp className="inline-block" />
          </div>
        </div>

        {/* content */}
        <div className="py-4 text-slate-600">
          <p>{post.postcontent}</p>
        </div>

        {/* footer */}
        <div className="flex items-center space-x-5">
          <div className="w-6/12 flex justify-center items-center text-xl cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl">
            <span>{post?.reactions?.length}</span>
            <CgHeart className="inline-block" />
          </div>
          <div className="w-6/12 text-xl flex justify-center items-center cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl">
            <span>{post?.comments?.length}</span>
            <CgComment className="inline-block" />
          </div>
        </div>
      </div>
    </>
  );
}
