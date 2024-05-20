"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { off, onValue, ref, set } from "firebase/database";
import { db } from "@/app/firebaseConfig";
import { showNotification } from "@/utils/sendNotification";

export const MineContext = createContext();

const MineContextProvider = ({ children }) => {
  // Context state variables
  const router = useRouter();

  const [data, setData] = useState(null);
  const [chats, setChats] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [myfriendid, setMyfriendid] = useState(null);
  const [allPost, setAllPost] = useState([]);
  const [allMyPost, setAllMyPost] = useState(null);
  const [lilLoader, setLilLoader] = useState(null);
  const [allfriendPost, setAllfriendPost] = useState(null);
  const [pandingMsg, setPandingMsg] = useState(0);
  const [pandingNtf, setPandingNtf] = useState(0);
  const [error, setError] = useState(null);

  // request for permission 
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  }, []);

  
  // Fetch website information on component mount
  const fetchfriendpostData = async (id) => {
    try {
      const responseMyData = await axios.get(`/api/post/friendpost/${id}`);
      setAllfriendPost(responseMyData.data.data);
    } catch (error) {
      setAllfriendPost([]);
    }
  };

  const fetchMypostData = async () => {
    try {
      const responseMyData = await axios.get(`/api/post/mypost`);
      setAllMyPost(responseMyData.data.data);
    } catch (error) {
      setAllMyPost([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMyData = await axios.get(`/api/me`);
        setData(responseMyData.data.data);
      } catch (error) {
        setData("");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const chatDataResponse = await axios.get("/api/chat");
        const chatData = chatDataResponse.data.data || [];
        
        if (chatData.length !== 0) {
          const updatedChats = await Promise.all(chatData.map(async (chat) => {
            const otherUserId = chat?.chatids?.find((id) => id !== data?._id);
            try {
              if (otherUserId) {
                const profileResponse = await axios.get(`/api/profile/${otherUserId}`);
                const profileData = profileResponse.data.data;
                
                return {
                  ...chat,
                  profileInfo: profileData,
                };
              }
            } catch (error) {
              return chat;
            }
            return chat;
          }));
          
          setChats(updatedChats);
        } else {
          setChats([]);
        }
      } catch (err) {
        setChats(null);
      }
    };
  
    fetchChatData();
  }, [data]);
  

  useEffect(() => {
    if (data && chats) {

      const ntfRef = ref(db, "ntf/" + data?._id);





      const handleNotificationChange = (snapshot) => {
        if (snapshot.exists()) {
          const ntfData = snapshot.val();
          const neMsgData = ntfData?.neMsgData ? JSON.parse(ntfData?.neMsgData) : []
          const friendactiondata = ntfData?.friendactiondata ? JSON.parse(ntfData?.friendactiondata) : []
          


          
      // functions 
      const updateReciveMessage = async (msg,time) => {

        
        
        const checkChat = chats?.find((chat)=> chat._id === msg?.chatid)
        await showNotification(`${checkChat?.profilename} messaged you`, `${checkChat?.profileInfo?.name} has send you a message.`)
        if (!checkChat){
          try {
            const profileResponse = await axios.get(`/api/profile/${msg?.friendid}`);
            await showNotification(`${profileResponse?.name} messaged you`, `${profileResponse?.name} has send you a message.`)
            const profileData = profileResponse.data.data;
            const newChat = {
              chatids: [data._id, msg?.friendid],
              createdAt: time,
              type: "random",
              _id: msg?.chatid,
              profileInfo: profileData,
            };
            setChats((prevChats) => [...prevChats, newChat]);
  

            
            const haventf = ntfData.neMsgData ? JSON.parse(ntfData.neMsgData) : []
            const updatednotif = haventf.filter((item) => {
              item.friendid !== msg?.friendid
            });
  
            
            const ntfRef = ref(db, "ntf/" + data?._id);

            await set(ntfRef, {
              ...ntfData,
              neMsgData: JSON.stringify(updatednotif),
            });
            
  
          } catch (error) {
          }
        }

      };

      
      const updateFriendState = async (gettedData) => {
        switch (gettedData?.action) {
          case "friend":
            const indexToUpdate = chats?.find(
              (chatItem) => chatItem?.profileInfo?._id === gettedData?.friendid
            );
            await showNotification("friend request accepted.", `${indexToUpdate?.name} has accepted your friend request.`)


            if (indexToUpdate) {
              const newChatList = chats?.filter(
                (chatItem) => chatItem?.profileInfo?._id !== gettedData?.friendid
              );
              const updatedChat = {
                ...indexToUpdate,
                type: gettedData?.action,
              };


              setChats([...newChatList, {...updatedChat}]);
            }

            const haventf2 = ntfData.friendactiondata ? JSON.parse(ntfData.friendactiondata) : []
            const updatednotif2 = haventf2.filter((item) => item.friendid !== gettedData?.friendid);
            
            
            const ntfRef = ref(db, "ntf/" + data?._id);
            
            await set(ntfRef, {
              ...ntfData,
              friendactiondata: JSON.stringify(updatednotif2),
            });
            break;

          case "unfriend":

            const updatedChats = chats?.filter(
              (item) => item?.profileInfo?._id !== gettedData?.friendid
            );
            setChats(updatedChats);

            
            const haventf = ntfData.friendactiondata ? JSON.parse(ntfData.friendactiondata) : []
            const updatednotif = haventf.filter((item) => item.friendid !== gettedData?.friendid);

            const ntfRef2 = ref(db, "ntf/" + data?._id);
            
            await set(ntfRef2, {
              ...ntfData,
              friendactiondata: JSON.stringify(updatednotif),
            });
            break;


          case "sendfriendreq":
            const indexToUpdate2 = chats?.find(
              (chatItem) => chatItem?.profileInfo?._id === gettedData?.friendid
            );
            await showNotification("friend request send.", `${indexToUpdate2?.name} has send you friend request.`)

            const updatedChatssendreq = chats?.filter((chatItem) => {
              if (chatItem?.profileInfo?._id === gettedData?.friendid) {
                return {
                  ...chatItem,
                  profileInfo:{
                    friendrequest: [...chatItem?.profileInfo?.friendrequest, data?._id]
                  }
                };
              }
              return chatItem;
            });
            console.log({updatedChatssendreq})
            setChats(updatedChatssendreq);

            
            const haventf3 = ntfData.friendactiondata ? JSON.parse(ntfData.friendactiondata) : []
            const updatednotif3 = haventf3.filter((item) => item.friendid !== gettedData?.friendid);

            const ntfRef3 = ref(db, "ntf/" + data?._id);
            
            await set(ntfRef3, {
              ...ntfData,
              friendactiondata: JSON.stringify(updatednotif3),
            });
            break;
  
          default:
            break;
        }
      };


          if (neMsgData && neMsgData.length !== 0){
            neMsgData?.map((msg)=>{
              updateReciveMessage(msg, ntfData?.msgtime);
            })
          }

          if (friendactiondata && friendactiondata.length !== 0){
            friendactiondata?.map((action)=>{
              updateFriendState(action);
            })
          }

          setPandingMsg(ntfData.msgUnseen);
          setPandingNtf(ntfData.ntfUnseen);





        }
      };

      onValue(ntfRef, handleNotificationChange);

      return () => {
        off(ntfRef, "value", handleNotificationChange);
      };
    }

    // update chatid and id to database null
  }, [data, chats]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/profile/${myfriendid}`)
        .then((data) => {
          setProfileInfo(data.data.data);
        })
        .catch((err) => {
          setProfileInfo("none");
        });
    };
    if (myfriendid) {
      fetchData();
    }
  }, [myfriendid]);

  // useEffect(() => {
  //   if (data) {
  //     const fetchData = async () => {
  //       let newPosts = [];
  //       try {
  //         const postData = await axios.get(`/api/post`);
  //         const actualData = postData.data.data;

  //         if (actualData) {
  //           for (const post of actualData) {
  //             const profileData = await axios.get(
  //               `/api/profile/${post?.userid}`
  //             );
  //             const profile = profileData.data.data;

  //             const postWithProfile = {
  //               ...post,
  //               profile,
  //             };

  //             newPosts.push(postWithProfile);
  //           }
  //         }

  //         setAllPost(newPosts);
  //       } catch (error) {
  //         setAllPost([]);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [data]);

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
        const newPost = response?.data?.data;

        const newSinglePost = {
          ...newPost,
          profile: data,
        };
        const newAllPosts = [...allPost, newSinglePost];

        setAllPost(newAllPosts);
        router.push("/feed");
      } else {
        setError("Failed to add post");
      }
    } catch (error) {
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
        setPandingMsg,
        pandingNtf,
        setPandingNtf,
        error,
        setError,
        lilLoader,
        setLilLoader,
      }}
    >
      {children}
    </MineContext.Provider>
  );
};

export default MineContextProvider;
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const sortedNumArray = nums.slice().sort((a, b) => a - b); // Sorting the array numerically

  let firstIndex = 0;
  let secondIndex = null;

  function getIndex(firstIndex) {
    for (let i = 0; i < sortedNumArray.length; i++) {
      if (sortedNumArray[firstIndex] + sortedNumArray[i] === target) {
        secondIndex = sortedNumArray.indexOf(sortedNumArray[i]);
        break;
      }
    }
  }

  getIndex(firstIndex);

  return [firstIndex, secondIndex];
};
                                                      