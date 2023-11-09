"use client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { MdHelp } from "react-icons/md";

export default function page() {
  const { text } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fatchData = async () => {
      axios
        .get(`/api/people/${text}`)
        .then((data) => {
          setUsers(data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fatchData();
  }, [text]);

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

        <div className="overflow-y-auto h-screen">
          {/* name box */}
          <div className="text-center text-2xl font-bold p-10">text</div>

          {/* people */}
          <div className="text-center pb-10">
            {users.map((user) => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <div className="inline-block w-28 m-2 rounded-2xl shadow-lg p-3 bg-slate-950 text-center">
                  <h1 className="text-sm text-slate-600 font-bold p-1">
                    {user.name}
                  </h1>
                  {user.profilepicture == "undefined" ? (
                    <img
                      className="inline-block w-24 h-24 rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvJKg6aXJNnwv4EpwvCyU-E7gOXGlS_TCygX4YhPpQ4cObKtqPdn_OrDE_c5RwwCdYW0&usqp=CAU"
                      alt=""
                    />
                  ) : (
                    <img
                      className="inline-block w-24 h-24 rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvJKg6aXJNnwv4EpwvCyU-E7gOXGlS_TCygX4YhPpQ4cObKtqPdn_OrDE_c5RwwCdYW0&usqp=CAU"
                      alt=""
                    />
                  )}
                  <div className="flex w-10/12 m-auto items-center text-slate-500 justify-center">
                    <span className="inline-block text-xs">{user.country}</span>
                  </div>
                  <div className="flex w-full m-auto items-center py-2 text-slate-500 justify-center">
                    <span className="inline-block">{user.age} / </span>
                    <span className="inline-block"> {user.gender}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
