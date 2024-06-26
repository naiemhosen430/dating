"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { CgSearch } from "react-icons/cg";
import Post from "../Components/Box/Post";
import Link from "next/link";
import { IoIosNotifications, IoMdAdd } from "react-icons/io";
import { MineContext } from "@/Context/MineContextProvider";
import ButtonBer from "../Components/Shared/ButtonBer";

export default function Page() {
  const { allPost, setAllPost, pandingNtf } = useContext(MineContext);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!loading) { 
      setLoading(true); 
      try {
        const postData = await axios.get(`/api/post`);
        const actualData = postData.data.data;
        let newPosts = [];

        if (actualData && actualData.length !== 0) {
          for (const post of actualData) {
            if (post?.userid) {
              const profileData = await axios.get(`/api/profile/${post?.userid}`);
              const profile = profileData.data.data;

              const postWithProfile = {
                ...post,
                profile,
              };

              setAllPost((prevData) => [...prevData, postWithProfile]); 
            }
          }
        }

        setLoading(false); 
      } catch (error) {
        setLoading(false); 
        console.error("Error fetching data:", error);
        // Handle error
      } finally {
        setLoading(false); 
      }
    }
  };


  return (
    <>
      <div className="fixed bottom-32 right-4">
        <Link href="/ntf" className="text-4xl block bg-black text-teal-50 p-2 my-5 rounded-full shadow-2xl">
        {pandingNtf === 0 ? (
                ""
              ) : (
                <span className="text-xs top-0 bg-black text-white font-bold rounded-full p-1 px-2 ntftop">
                  {pandingNtf}
                </span>
              )}
          <IoIosNotifications />
        </Link>
        <Link href="/addpost">
          <IoMdAdd className="text-4xl block bg-black text-teal-50 p-2 rounded-full shadow-2xl" />
        </Link>
      </div>
      <div className="space-y-4 p-2" ref={scrollRef}>
        <div className="rounded-full bg-slate-900 flex items-center justify-center sticky top-1">
          <input
            className="lg:text-xl text-sm p-2 px-4 rounded-full bg-slate-900 text-teal-50 w-10/12"
            type="search"
            name="text"
            id="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Search for person or post"
          />
          <Link href={`/search/${text}`}>
            <div className="text-2xl block w-2/12 text-center">
              <CgSearch className="inline-block text-slate-600" />
            </div>
          </Link>
        </div>

        <div className="lg:flex space-x-2">
          <div className="lg:w-7/12">
            {allPost && allPost.length > 0 ? (
              allPost.map((post) => <Post key={post._id} post={post} />)
            ) : (
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
            )}
              <h1  onClick={fetchData} className="text-white bg-slate-700 text-xl text-center p-4 mb-48">
                {loading ? "Loading More Post ...." : "Click to Load more posts"}
                
              </h1>
          </div>
          <div className="w-5/12 lg:inline-block hidden">Hello</div>
        </div>
      </div>
      <ButtonBer />
    </>
  );
}
