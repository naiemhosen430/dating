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
  const { allPost, setAllPost } = useContext(MineContext);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    fetchData();
    addScrollListener();
  }, []);

  const fetchData = async () => {
    if (!loading) { // Only fetch if loading state is false
      setLoading(true); // Set loading state to true
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

              newPosts.push(postWithProfile);
            }
          }
        }

        setAllPost((prevData) => [...prevData, ...newPosts]); // Concatenate new posts
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      } finally {
        setLoading(false); // Set loading state to false after fetching is done
      }
    }
  };

  const addScrollListener = () => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      if (scrollHeight - (scrollTop + clientHeight) < 40) {
        fetchData();
      }
    };
    window.addEventListener("scroll", handleScroll); // Attach event listener to window
    return () => {
      window.removeEventListener("scroll", handleScroll); // Remove event listener on cleanup
    };
  };

  return (
    <>
      <div className="fixed bottom-32 right-4">
        <Link href="/addpost">
          <IoIosNotifications className="text-4xl block bg-black text-teal-50 p-2 my-5 rounded-full shadow-2xl" />
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
              <h1 className="text-white text-xl text-center p-4">
                No posts available
              </h1>
            )}
            {loading && (
              <h1 className="text-white text-xl text-center p-4">
                Loading more posts....
              </h1>
            )}
          </div>
          <div className="w-5/12 lg:inline-block hidden">Hello</div>
        </div>
      </div>
      <ButtonBer />
    </>
  );
}
