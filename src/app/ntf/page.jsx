"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { MineContext } from "@/Context/MineContextProvider";
import { CgArrowLeft, CgSearch } from "react-icons/cg";
import axios from "axios";
import { updateNtfData } from "@/firebase/ntf";
import Avater from "../Components/Box/Avater";

export default function page() {
  const { setPandingNtf, data } = useContext(MineContext);
  const [ntfs, setNtf] = useState(null)

  useEffect(() => {
    updateNtfData(data);
  }, [data]);
  
useEffect(()=>{
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/ntf`);
      if (response?.data){
        setNtf([...ntfs || [], ...response.data.data]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  fetchData()
},[])

const formattime = (time) => {
  const date = new Date(time);
  const now = new Date();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months}m ago`;
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else {
    return `${minutes}m ago`;
  }
};


  return (
<>
  <div className="w-full overflow-hidden rounded-2xl">
    <div className="rounded-full bg-slate-950 flex items-center sticky top-1">
      <div className="w-2/12 text-center text-2xl">
        <Link href={"/feed"}>
          <CgArrowLeft className="inline-block" />
        </Link>
      </div>
      <h1 className="text-white font-bold px-4">Notification</h1>
    </div>
    <div>
      {!ntfs ? (
        <h1 className="py-60 text-center">Notification loading....</h1>
      ) : (
        ntfs?.length === 0 ? (
          <h1 className="py-60 text-center">You have no notification.</h1>
        ) : (

          ntfs?.map((ntf) => (
            <Link key={ntf._id} href={ntf?.link}>
              <div className="flex items-center justify-center p-2 m-3 mx-4 bg-slate-950 px-1">
                <div className="w-2/12 flex items-center justify-end rounded-full pb-1">
                  <div className="w-12 h-12 overflow-hidden bg-slate-900 rounded-full inline-block">
                    <Avater text={ntf?.picture} />
                  </div>
                </div>
                <div className="w-10/12">
                  <h1 className="text-xs text-slate-300 px-2">{`${ntf?.host}: ${ntf?.action}`}</h1>
              <h1 className="text-xs px-2 text-red-400 text-right flex">
              <span className="w-8/12 text-left text-xs block">
    {ntf?.content?.slice(0, 40)}
  </span>
  
                <span className="text-xs text-right w-4/12 block text-red-500">
                  {formattime(ntf?.createdAt)}
                </span>
              </h1>
  
                </div>
              </div>
            </Link>
          ))
        )
      )}
    </div>
  </div>
</>

  );
}
