"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CommentBox({ singleComment }) {
  const [profile, setProfile] = useState(null);
  console.log(singleComment);

  useEffect(() => {
    const fatchData = async () => {
      await axios
        .get(`/api/profile/${singleComment?.userid}`)
        .then((data) => {
          setProfile(data.data.data);
        })
        .catch((err) => {
          setProfile("none");
          console.log(err);
        });
    };
    fatchData();
  }, [singleComment]);

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
  const createdAt = new Date(singleComment?.cmnttime);

  const year = createdAt.getFullYear();
  const month = String(createdAt.getMonth() + 1).padStart(2, "0");
  const day = String(createdAt.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return (
    <>
      <div className="bg-slate-950 p-5">
        <div className="flex items-center p-4">
          <div className="w-/12 text-center">
            <Link href={`/profile/${singleComment?.userid}`}>
              <img
                className="w-8 h-8 rounded-full inline-block"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfhHGR8bTVzFRi4LjAKEbCXe3Nm7wSxh3H3g&usqp=CAU"
                alt=""
              />
            </Link>
          </div>
          <div className="w-10/12">
            <Link href={`/profile/${singleComment?.userid}`}>
              <h5 className="text-slate-400">{profile?.name}</h5>
            </Link>
            <p className="py-2 text-white">{singleComment?.message}</p>
          </div>
        </div>
        <h6 className="text-slate-500">{formattedDate}</h6>
      </div>
    </>
  );
}
