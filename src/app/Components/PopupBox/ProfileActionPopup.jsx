'use client'
import axios from 'axios';
import { db } from "@/app/firebaseConfig";
import { ref, get, set, push, off, onValue, remove } from "firebase/database";
import { MineContext } from '@/Context/MineContextProvider';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileActionPopup({chatData, toggleOption}) {
  const router = useRouter();
  const { chats, setChats, data } = useContext(MineContext);
    const deleChatHundler = async () => {
        try {
          const response = await axios.delete(`/api/chat/delete/${chatData?._id}`);
          if (response?.data) {
            const chatRef = ref(db, "conversations/" + chatData?._id);
            remove(chatRef).then(() => {
              setChats(chats.filter((chat) => chat?._id !== chatData._id));
            });
    
            const ntfRef = ref(db, "ntf/" + id);
    
            const snapshot = await get(ntfRef);
            if (snapshot.exists()) {
              const existingNtfData = snapshot.val();
              await set(ntfRef, {
                ...existingNtfData,
                newMsgId: chatData._id,
                friendaction: "block",
              });
            } else {
            }
    
            router.push("/chat");
            setOprionBoxState(false);
          }
        } catch (error) {}
      };


      const unfriendHundler = async () =>{
        alert("we are working on this frature")
      }
      
      const blockHundler = async () =>{
        alert("we are working on this frature")
      }

  return (
    <>
                <div className="w-screen h-screen z-40 fixed top-0 flex justify-center items-center rounded-lg bg-gradient-to-t from-slate-800">
          <div className="bg-black p-5 w-12/12 lg:w-4/12 rounded-lg">
            <button
              onClick={deleChatHundler}
              className="p-2 w-full px-4 hover:bg-slate-900 my-2 text-sm rounded-md"
            >
              Delete Chat
            </button>
            <button
              onClick={unfriendHundler}
              className="p-2 w-full px-4 hover:bg-slate-900 my-2 text-sm rounded-md"
            >
              Unfriend
            </button>
            <button
              onClick={blockHundler}
              className="p-2 w-full px-4 hover:bg-slate-900 my-2 text-sm rounded-md"
            >
              Block
            </button>

            <button
              onClick={toggleOption}
              className="p-2 w-full px-4 hover:bg-slate-800 bg-slate-900 my-2 text-sm rounded-md"
            >
              Cencel
            </button>
          </div>
        </div>
    </>
  )
}
