"use client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgArrowLeft, CgSearch } from "react-icons/cg";

export default function page() {
  const { text } = useParams();
  const [users, setUsers] = useState([]);
  const [text2, setText2] = useState({
    text: text,
  });

  useEffect(() => {
    const fatchData = () => {
      axios
        .get(`/api/search/${text}`)
        .then((data) => {
          console.log(data.data.data);
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
        <div className="rounded-full bg-slate-900 flex items-center justify-center sticky top-1">
          <div className="w-1/12">
            <Link href={"/"}>
              <CgArrowLeft />
            </Link>
          </div>
          <input
            className="lg:text-xl text-sm p-2 px-4 rounded-full bg-slate-900 text-teal-50 w-9/12"
            type="search"
            name="text"
            id="text"
            onChange={(event) => {
              setText2({
                ...text, // Corrected from ...userInfo to ...text
                [event.target.name]: event.target.value,
              });
            }}
            value={text2.text}
            placeholder="Search for person or post"
          />
          <Link href={`/search/${text2.text}`}>
            <div className="text-2xl block w-2/12 text-center">
              <CgSearch className="inline-block text-slate-600" />
            </div>
          </Link>
        </div>
        <h1 className="text-sm text-slate-500 p-4">Result for: {text}</h1>
        <div className="p-4">
          {users.length === 0 ? (
            <p className="text-slate-500 text-center text-xl p-10 py-20">
              No data found.
            </p>
          ) : (
            users.map((user) => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <div className="flex items-center">
                  <div className="w-2/12 rounded-xl py-2 px-4 my-2 bg-slate-950 hover:bg-slate-900">
                    {user.profilepicture == "undefined" ? (
                      <img
                        className="inline-block w-5 h-5 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvJKg6aXJNnwv4EpwvCyU-E7gOXGlS_TCygX4YhPpQ4cObKtqPdn_OrDE_c5RwwCdYW0&usqp=CAU"
                        alt=""
                      />
                    ) : (
                      <img
                        className="inline-block w-5 h-5 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvJKg6aXJNnwv4EpwvCyU-E7gOXGlS_TCygX4YhPpQ4cObKtqPdn_OrDE_c5RwwCdYW0&usqp=CAU"
                        alt=""
                      />
                    )}
                  </div>
                  <h1 className="w-10/12">{user.name}</h1>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
