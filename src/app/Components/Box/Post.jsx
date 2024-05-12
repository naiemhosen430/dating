"use client";
import { MineContext } from "@/Context/MineContextProvider";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { CgComment, CgHeart } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { db } from "@/app/firebaseConfig";
import { ref, get, set, push, off, onValue, remove } from "firebase/database";
import Avater from "./Avater";

export default function Post({ post }) {
  const { data, setAllPost, allPost, lilLoader, setLilLoader } =
    useContext(MineContext);

  if (!data || !post) {
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
              <h1 className="text-sm loading text-white font-bold">
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
            <div className="w-6/12 text-sm loading cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
            <div className="w-6/12 loading text-sm cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
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
    setLilLoader(true);
    try {
      const response = await axios.post(`/api/post/like/${post?._id}`);
      if (response?.data){
        const updatedPost = response?.data?.data;
        const profile = post?.profile;
  
        const newUpdatedPost = {
          ...updatedPost,
          profile,
        };
  
        const updatedPosts = allPost.filter((postItem) => {
          if (postItem._id === newUpdatedPost._id) {
            return newUpdatedPost;
          }
          return postItem;
        });


        const ntfresponse = await axios.post(`/api/ntf`, {
          host: data?.name,
          hostid: data?._id,
          picture: data?.profilepicture,
          action: "liked",
          content: `${data?.name} has liked in ${post.postcontent.slice(0, 20)}`,
          link: `/post/${post?._id}`,
        });

        if (ntfresponse?.data){
          
          const ntfRef = ref(db, "ntf/" + profile._id);
    
          try {
            const snapshot = await get(ntfRef);
            if (snapshot.exists()) {
              const existingNtfData = snapshot.val();
              const updatedntfUnseen = (existingNtfData.ntfUnseencount || 0) + 1;
              await set(ntfRef, {
                ...existingNtfData,
                neNtfData: JSON.stringify([
                  ...(existingNtfData.neNtfData ? JSON.parse(existingNtfData.neNtfData) : []),
                  {
                      friendid: data?._id,
                      msg: `${data?.name} has liked your post`
                  }
                ]),
              
                ntfUnseen: updatedntfUnseen,
                msgtime: Date.now(),
              });
      
      
            } else {
              await set(ntfRef, {
                neNtfData: JSON.stringify([
                  {
                    friendid: data?._id,
                    msg: `${data?.name} has liked your post`
                  }
                ]),
              
                ntfUnseen: 1,
                msgtime: Date.now(),
              });
            }
          } catch (error) {
            console.error(
              "Error checking or updating notification collection:",
              error
            );
          }

        }



      }


      setAllPost(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="p-0 my-2">
        {/* header */}
        <div className="flex items-center space-x-2">
          <div className="w-2/12 text-center">
            <Link href={`/profile/${post?.profile?._id}`}>
              <div className="w-10 m-auto h-10 overflow-hidden rounded-full block">
                <Avater text={post?.profile?.profilepicture} />
              </div>
              {/* <img
                className="w-10 m-auto h-10 rounded-full block"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfhHGR8bTVzFRi4LjAKEbCXe3Nm7wSxh3H3g&usqp=CAU"
                alt=""
              /> */}
            </Link>
          </div>
          <div className="w-8/12">
            <h1 className="text-sm text-white font-bold">
              <Link href={`/profile/${post?.profile?._id}`}>
                {post?.profile?.name}
                {post?.profile?._id === "65fd48a78af4b8a1e16a7b1d" ? (
                  <span className="px-2 text-xs text-slate-800">
                    (Zane official)
                  </span>
                ) : (
                  ""
                )}
              </Link>
            </h1>
            <h1 className="text-xs text-slate-600 font-bold">
              {formattedDate}
            </h1>
          </div>
          <div className="w-2/12 text-2xl text-center">
            <BsThreeDotsVertical className="inline-block" />
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
            className={`w-6/12 flex justify-center items-center text-sm cursor-pointer text-center bg-slate-950 p-1 rounded-xl ${
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
            <div className="text-sm flex justify-center items-center cursor-pointer">
              <span className="px-4 text-lg">{post?.comments?.length}</span>
              <CgComment className="inline-block" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
