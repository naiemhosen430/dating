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
  const [ntfs, setNtf] = useState([])

  useEffect(() => {
    updateNtfData(data);
  }, [data]);
  
useEffect(()=>{
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/ntf`);
      if (response?.data){
        setNtf((prevNtf) => [...prevNtf, ...response.data.data]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  fetchData()
},[])


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
      {!ntfs || ntfs?.length === 0 ? (
        <h1 className="py-60 text-center">No notification have</h1>
      ) : (
        ntfs?.map((ntf) => (
          <Link key={ntf._id} href={ntf?.link}>
            <div className="flex items-center justify-center p-2 px-1">
              <div className="w-2/12 flex items-center rounded-full pb-1">
                <div className="w-12 h-12 overflow-hidden bg-slate-900 rounded-full inline-block">
                  <Avater text={ntf?.picture} />
                </div>
              </div>
              <div className="w-10/12">
                <h1 className="text-sm px-2">{`${ntf?.host}, ${ntf?.action}`}</h1>
                <h1 className="text-xs px-2 text-red-400 text-right flex">
                  {ntf?.content}
                </h1>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  </div>
</>

  );
}
