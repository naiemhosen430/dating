"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Avater from "./Avater";

export default function CommentBox({ comment }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fatchData = async () => {
      await axios
        .get(`/api/profile/${comment?.userid}`)
        .then((data) => {
          setProfile(data.data.data);
        })
        .catch((err) => {
          setProfile("none");
        });
    };
    fatchData();
  }, [comment]);

  if (!profile) {
    return (
      <>
        <div className="bg-slate-950 loadingbig p-5">
          <div className="flex items-center p-4">
            <div className="w-/12 text-center">
              <div className="w-8 h-8 rounded-full inline-block loading"></div>
            </div>
            <div className="w-10/12">
              <h5 className="loading p-5"></h5>
            </div>
          </div>
          <h5 className="p-2 loading"></h5>
        </div>
      </>
    );
  }

  //   format time
  const createdAt = new Date(comment?.cmnttime);

  const year = createdAt.getFullYear();
  const month = String(createdAt.getMonth() + 1).padStart(2, "0");
  const day = String(createdAt.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return (
    <>
      <div className="bg-slate-950 rounded-md">
        <div className="flex p-4">
          <div className="w-2/12 text-center">
            <Link href={`/profile/${comment?.userid}`}>
              <div className=" bg-slate-900 rounded-full inline-block">
                <Avater text={profile?.profilepicture} />
              </div>
              {/* <img
                className="w-8 h-8 rounded-full inline-block"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfhHGR8bTVzFRi4LjAKEbCXe3Nm7wSxh3H3g&usqp=CAU"
                alt=""
              /> */}
            </Link>
          </div>
          <div className="w-10/12 px-4">
            <Link href={`/profile/${comment?.userid}`}>
              <h5 className="text-slate-400">{profile?.name}</h5>
            </Link>
            <p className="py-2 text-white">
              {comment?.message ? (
                comment?.message
              ) : (
                <FaHeart className="text-5xl text-black shadow-xl" />
              )}
            </p>
          </div>
        </div>
        <h6 className="text-slate-500 px-4 p-2text-xs">{formattedDate}</h6>
      </div>
    </>
  );
}
