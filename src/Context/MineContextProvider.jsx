"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const MineContext = createContext();

const MineContextProvider = ({ children }) => {
  // Context state variables
  const router = useRouter();

  const [data, setData] = useState(null);
  const [chats, setChats] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [myfriendid, setMyfriendid] = useState(null);
  const [allPost, setAllPost] = useState(null);
  const [allMyPost, setAllMyPost] = useState(null);
  const [allfriendPost, setAllfriendPost] = useState(null);
  const [pandingMsg, setPandingMsg] = useState(0);
  const [error, setError] = useState("");

  // Fetch website information on component mount
  const fetchfriendpostData = async (id) => {
    try {
      const responseMyData = await axios.get(`/api/post/friendpost/${id}`);
      setAllfriendPost(responseMyData.data.data);
    } catch (error) {
      setAllfriendPost("");
      console.error({ error });
    }
  };

  const fetchMypostData = async () => {
    try {
      const responseMyData = await axios.get(`/api/post/mypost`);
      setAllMyPost(responseMyData.data.data);
    } catch (error) {
      setAllMyPost("");
      console.error({ error });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMyData = await axios.get(`/api/me`);
        setData(responseMyData.data.data);
      } catch (error) {
        setData("");
        console.error({ error });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await axios.get("/api/chat");
        setChats(chatData.data.data);
      } catch (err) {
        setChats([]);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/profile/${myfriendid}`)
        .then((data) => {
          setProfileInfo(data.data.data);
        })
        .catch((err) => {
          setProfileInfo("none");
          console.log(err);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/post`)
        .then((data) => {
          setAllPost(data.data.data);
        })
        .catch((err) => {
          setAllPost([]);
          console.log(err);
        });
    };

    fetchData();
  }, []);

  // Function to add a new post
  const handleAddPost = async (postContent, selectedOptions) => {
    try {
      if (!postContent.trim()) {
        setError("Post content is required");
        return;
      }

      const response = await axios.post("/api/post/add", {
        content: postContent,
        tags: selectedOptions,
        hidefrom: [],
        mentions: [],
        bgcolor: "",
        textcolor: "",
      });

      if (response?.data.statusCode === 200) {
        setAllPost(response?.data.data);
        setAllMyPost(response?.data.myPost);
        router.push("/feed");
        console.log("Post added successfully!");
      } else {
        setError("Failed to add post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      setError("Failed to add post");
    }
  };

  return (
    <MineContext.Provider
      value={{
        data,
        chats,
        profileInfo,
        myfriendid,
        allPost,
        error,
        setData,
        setChats,
        setProfileInfo,
        setMyfriendid,
        setAllPost,
        handleAddPost,
        allMyPost,
        setAllMyPost,
        allfriendPost,
        setAllfriendPost,
        fetchMypostData,
        fetchfriendpostData,
        pandingMsg, 
        setPandingMsg
      }}
    >
      {children}
    </MineContext.Provider>
  );
};

export default MineContextProvider;
