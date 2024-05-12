"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { MineContext } from "@/Context/MineContextProvider";
import { CgArrowLeft, CgSearch } from "react-icons/cg";
import axios from "axios";

export default function page() {
  const { setPandingNtf } = useContext(MineContext);
  const [ntfs, setNtf] = useState([])

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/ntf`);
      if (response?.data){
        setNtf((prevNtf) => [...prevNtf, ...response.data.data]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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


        {ntfs.map((ntf) => (
              <Link key={ntf._id} href={ntf?.link}>
                <div className="block w-full m-4 rounded-2xl shadow-lg p-3 bg-slate-950 text-center">
                  <h1 className="text-sm text-white font-bold p-1">
                    `${ntf?.host}, ${ntf?.action}`
                  </h1>

                </div>
              </Link>
            ))}

      </div>
    </>
  );
}
