"use client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avater from "@/app/Components/Box/Avater";

export default function Page() {
  const { text } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    fetchData();
    addScrollListener();
  }, [text]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/people/${text}`);
      setUsers((prevUsers) => [...prevUsers, ...response.data.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addScrollListener = () => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      if (scrollHeight - (scrollTop + clientHeight) < 20) {
        fetchData();
      }
    };
    scrollRef.current.addEventListener("scroll", handleScroll);
    return () => {
      scrollRef.current.removeEventListener("scroll", handleScroll);
    };
  };

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
            <BsThreeDotsVertical className="inline-block" />
          </div>
        </div>

        <div className="overflow-y-auto h-screen" ref={scrollRef}>
          {/* name box */}
          <div className="text-center bg-slate-800 text-2xl font-bold p-10">
            {text}
          </div>

          {/* people */}
          <div className="text-center pb-10">
            {users.map((user) => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <div className="inline-block w-32 m-4 rounded-2xl shadow-lg p-3 bg-slate-950 text-center">
                  <h1 className="text-sm text-white font-bold p-1">
                    {user.name.slice(0, 9)}
                    {user?._id === "65fd48a78af4b8a1e16a7b1d" ? (
                      <span className="px-2 text-[10px] text-slate-800">
                        (Zane official)
                      </span>
                    ) : (
                      ""
                    )}
                  </h1>
                  <div className="inline-block w-24 h-24 rounded-full">
                    <div className="flex items-center justify-center bg-slate-900 w-24 h-24 rounded-full overflow-hidden">
                      <Avater text={user?.profilepicture} />
                    </div>
                  </div>
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
            {loading && <div>Loading...</div>}
          </div>
        </div>
      </div>
    </>
  );
}
