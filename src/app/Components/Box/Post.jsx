"use client";
import { MineContext } from "@/Context/MineContext";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { CgComment, CgHeart } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { MdHelp } from "react-icons/md";

export default function Post({ post }) {
  const [profileInfo, setProfileInfo] = useState(null);
  const [postInfo, setPostInfo] = useState(null);
  const { data } = useContext(MineContext);

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

  if (!profileInfo || !data) {
    return (
      <>
        <div className="p-2 my-10 loadingbig">
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

  //   format time
  const createdAt = new Date(post?.createdAt);

  const year = createdAt.getFullYear();
  const month = String(createdAt.getMonth() + 1).padStart(2, "0");
  const day = String(createdAt.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const hundleLike = async () => {
    try {
      const data = await axios.post(`/api/post/like/${post?._id}`);

      setPostInfo(data.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="p-0">
        {/* header */}
        <div className="flex items-center space-x-2">
          <div className="w-2/12 text-center">
            <Link href={`/profile/${profileInfo._id}`}>
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
              {formattedDate}
            </h1>
          </div>
          <div className="w-2/12 text-2xl text-center">
            <MdHelp className="inline-block" />
          </div>
        </div>

        {/* content */}
        <Link href={`/post/${post?._id}`}>
          <div className="py-14 text-white rounded-lg text-center my-2 p-4 bg-slate-800">
            <p>
              {post.postcontent.slice(0, 100)}
              {post.postcontent.length > 100 ? "..." : ""}
              {post.postcontent.length > 100 ? " Read more" : ""}
            </p>
          </div>
        </Link>

        {/* footer */}
        <div className="flex items-center space-x-5">
          <div
            onClick={hundleLike}
            className={`w-6/12 flex justify-center items-center text-xl cursor-pointer text-center bg-slate-950 p-1 rounded-xl ${
              post?.reactions?.some((reaction) => reaction.userid === data?._id)
                ? "bg-red-500"
                : ""
            }`}
          >
            <span className="px-4 text-lg">{post?.reactions?.length}</span>
            {post?.reactions?.some(
              (reaction) => reaction.userid === data?._id
            ) ? (
              <FaHeart className="text-white inline-block " />
            ) : (
              <CgHeart className="text-white inline-block" />
            )}
          </div>

          <Link
            className="w-6/12 text-center bg-slate-950 p-1 rounded-xl"
            href={`/post/${post?._id}`}
          >
            <div className="text-xl flex justify-center items-center cursor-pointer">
              <span className="px-4 text-lg">{post?.comments?.length}</span>
              <CgComment className="inline-block" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
