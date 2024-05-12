"use client";
import CommentBox from "@/app/Components/Box/CommentBox";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { CgArrowLeft, CgComment, CgHeart } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { db } from "@/app/firebaseConfig";
import { ref, get, set, push, off, onValue, remove } from "firebase/database";
import { FaHeart } from "react-icons/fa";
import { MineContext } from "@/Context/MineContextProvider";
import Avater from "@/app/Components/Box/Avater";

export default function page() {
  const { data, setAllPost, allPost } = useContext(MineContext);
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");

  const postInfo = allPost?.find((post) => post._id === id);

  if (!postInfo) {
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

  // Event handler for input change
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const hundleLike = async () => {
    try {
      const data = await axios.post(`/api/post/like/${postInfo?._id}`);
      const updatedPost = data?.data?.data;
      const profile = postInfo?.profile;

      const newUpdatedPost = {
        ...updatedPost,
        profile,
      };

      const updatedPosts = allPost.map((postItem) => {
        if (postItem._id === newUpdatedPost._id) {
          return newUpdatedPost;
        }
        return postItem;
      });

      setAllPost(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const sendComment = async () => {
    try {
      const response = await axios.post(`/api/post/comment/${postInfo?._id}`, {
        message: commentText,
      });

      if (response?.data){




        

      const updatedPost = response?.data?.data;
      const profile = postInfo?.profile;

      const newUpdatedPost = {
        ...updatedPost,
        profile,
      };

      const updatedPosts = allPost.map((postItem) => {
        if (postItem._id === newUpdatedPost._id) {
          return newUpdatedPost;
        }
        return postItem;
      });

      setAllPost(updatedPosts);






        const ntfresponse = await axios.post(`/api/ntf`, {
          host: data?.name,
          hostid: data?._id,
          ownerid: profile?._id,
          picture: data?.profilepicture,
          action: "commented",
          content: `${commentText.slice(0, 10)} in ${postInfo.postcontent.slice(0, 20)}`,
          link: `/post/${postInfo?._id}`,
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

      setCommentText("");

          } catch (error) {
            console.error(
              "Error checking or updating notification collection:",
              error
            );
          }

        }





      }

    } catch (error) {
      console.error(error);
    }
  };

  //   format time
  const createdAt = new Date(postInfo?.createdAt);

  const year = createdAt.getFullYear();
  const month = String(createdAt.getMonth() + 1).padStart(2, "0");
  const day = String(createdAt.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return (
    <>
      <div className="p-2">
        {/* header */}
        <div className="p-2 flex items-center text-3xl">
          <div className="w-6/12">
            <Link href={"/feed"}>
              <CgArrowLeft />
            </Link>
          </div>
          <div className="w-6/12 text-right">
            <BsThreeDotsVertical className="inline-block" />
          </div>
        </div>
      </div>
      <div className="p-0">
        {/* header */}
        <div className="flex items-center space-x-2">
          <div className="w-2/12 text-center">
            <div className="w-10 h-10 overflow-hidden rounded-full">
            <Link href={`/profile/${postInfo?.profile?._id}`}>
              <Avater text={postInfo?.profile?.profilepicture} />
              {/* <img
                className="w-10 m-auto h-10 rounded-full block"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfhHGR8bTVzFRi4LjAKEbCXe3Nm7wSxh3H3g&usqp=CAU"
                alt=""
              /> */}
            </Link>
            </div>
          </div>
          <div className="w-8/12">
            <h1 className="text-sm text-white font-bold">
              <Link href={`/profile/${postInfo?.profile._id}`}>
                {postInfo?.profile.name}
                {postInfo?.profile?._id === "65fd48a78af4b8a1e16a7b1d" ? (
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
        <div className="py-14 text-white rounded-lg text-center my-2 p-4 bg-slate-800">
          <p>{postInfo?.postcontent}</p>
        </div>

        {/* footer */}
        <div className="flex items-center space-x-5">
          <div
            onClick={hundleLike}
            className={`w-6/12 flex justify-center items-center text-sm cursor-pointer text-center bg-slate-950 p-1 rounded-xl ${
              postInfo?.reactions?.some(
                (reaction) => reaction.userid === data?._id
              )
                ? "bg-red-500"
                : ""
            }`}
          >
            <span className="px-4 text-lg">{postInfo?.reactions?.length}</span>
            {postInfo?.reactions?.some(
              (reaction) => reaction.userid === data?._id
            ) ? (
              <FaHeart className="text-white inline-block" />
            ) : (
              <CgHeart className="text-white inline-block" />
            )}
          </div>

          <div className="w-6/12 text-sm flex justify-center items-center cursor-pointer text-center bg-slate-950 p-1 rounded-xl">
            <span>{postInfo?.comments?.length}</span>
            <CgComment className="inline-block" />
          </div>
        </div>

        {/* comment box  */}
        <div className="p-4 py-10">
          {postInfo?.comments?.length === 0 ? (
            <h1 className="text-2xl text-white py-14 text-center">
              No comment yet !
            </h1>
          ) : (
            postInfo?.comments?.map((singleComment) => (
              <CommentBox comment={singleComment} />
            ))
          )}
          {/* h */}
        </div>

        {/* Comment Input */}
        <div className="fixed bottom-1 flex justify-center items-center p-2 w-full bg-black">
          <input
            className="p-2 px-4 rounded-l-2xl bg-black text-white w-10/12"
            type="text"
            placeholder="Write about the post"
            value={commentText}
            onChange={handleCommentChange}
          />
          <button
            onClick={sendComment}
            className="p-2 rounded-r-2xl bg-slate-950 text-slate-400 w-2/12"
          >
            {commentText ? "Send" : <FaHeart />}
          </button>
        </div>
      </div>
    </>
  );
}
