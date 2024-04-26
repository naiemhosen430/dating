"use client";
import { MineContext } from "@/Context/MineContextProvider";
import Post from "@/app/Components/Box/Post";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function page() {
  const { fetchfriendpostData, allfriendPost } = useContext(MineContext);
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = useState([]);
  const [interesta, setinteresta] = useState([]);
  useEffect(() => {
    const fatchData = async () => {
      await axios
        .get(`/api/profile/${id}`)
        .then((data) => {
          setProfileInfo(data.data.data);
          setinteresta(data.data.data.interest);
        })
        .catch((err) => {});
    };
    fatchData();
  }, []);

  if (profileInfo?._id) {
    fetchfriendpostData(profileInfo?._id);
  }

  return (
    <>
      <div className="p-2">
        {/* header */}
        <div className="p-2 flex items-center text-3xl">
          <div className="w-6/12">
            <Link href={"/"}>
              <CgArrowLeft />
            </Link>
          </div>
          <div className="w-6/12 text-right">
            <BsThreeDotsVertical className="inline-block" />
          </div>
        </div>

        {/* profile head */}
        <div className="text-center">
          <img
            className="w-20 h-20 inline-block m-4 mb-2 rounded-full"
            src={profileInfo?.profilepicture}
            alt=""
          />
          <h1 className="text-xl font-bold p-1 text-white">
            {profileInfo.name}
          </h1>
          <div className="flex w-10/12 m-auto items-center text-slate-500 justify-center">
            <span className="inline-block">{profileInfo.age} / </span>
            <span className="inline-block"> {profileInfo.gender}</span>
          </div>
          <div className="flex w-10/12 m-auto items-center text-slate-500 justify-center">
            <span className="inline-block">{profileInfo.country}</span>
          </div>

          {/* tag */}
          <div className="w-10/12 space-x-2 space-y-2 py-5 lg:6/12 m-auto">
            {interesta.map((i) => (
              <span
                key={i}
                className="inline-block p-1 text-xs px-3 rounded-2xl bg-slate-800"
              >
                {i}
              </span>
            ))}
          </div>

          {/* post */}
          {/* post */}
          <div className="lg:flex space-x-2">
            <div className="lg:w-7/12">
              {!allfriendPost ? (
                <>
                  <div className="p-2 my-5 loadingbig">
                    {/* header */}
                    <div className="flex items-center space-x-2">
                      <div className="w-2/12 text-center">
                        <Link
                          className="w-10 m-auto h-10 loading rounded-full block"
                          href={""}
                        ></Link>
                      </div>
                      <div className="w-8/12">
                        <h1 className="text-xl loading text-white font-bold">
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
                      <div className="w-6/12 text-xl loading cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
                      <div className="w-6/12 loading text-xl cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
                    </div>
                  </div>
                  <div className="p-2 my-5 loadingbig">
                    {/* header */}
                    <div className="flex items-center space-x-2">
                      <div className="w-2/12 text-center">
                        <Link
                          className="w-10 m-auto h-10 loading rounded-full block"
                          href={""}
                        ></Link>
                      </div>
                      <div className="w-8/12">
                        <h1 className="text-xl loading text-white font-bold">
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
                      <div className="w-6/12 text-xl loading cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
                      <div className="w-6/12 loading text-xl cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
                    </div>
                  </div>
                  <div className="p-2 my-5 loadingbig">
                    {/* header */}
                    <div className="flex items-center space-x-2">
                      <div className="w-2/12 text-center">
                        <Link
                          className="w-10 m-auto h-10 loading rounded-full block"
                          href={""}
                        ></Link>
                      </div>
                      <div className="w-8/12">
                        <h1 className="text-xl loading text-white font-bold">
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
                      <div className="w-6/12 text-xl loading cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
                      <div className="w-6/12 loading text-xl cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
                    </div>
                  </div>
                  <div className="p-2 my-5 loadingbig">
                    {/* header */}
                    <div className="flex items-center space-x-2">
                      <div className="w-2/12 text-center">
                        <Link
                          className="w-10 m-auto h-10 loading rounded-full block"
                          href={""}
                        ></Link>
                      </div>
                      <div className="w-8/12">
                        <h1 className="text-xl loading text-white font-bold">
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
                      <div className="w-6/12 text-xl loading cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
                      <div className="w-6/12 loading text-xl cursor-pointer hover:bg-slate-600 text-center bg-slate-950 p-1 rounded-xl"></div>
                    </div>
                  </div>
                </>
              ) : allfriendPost?.length === 0 ? (
                <h1 className="text-sm text-white p-5 text-center my-20">
                  There is no post
                </h1>
              ) : (
                allfriendPost?.reverse().map((post) => (
                  <>
                    <Post key={post._id} post={post} />
                  </>
                ))
              )}
            </div>
            <div className="w-5/12 lg:inline-block hidden">Hello</div>
          </div>
        </div>
      </div>

      <div className="fixed w-full bottom-0">
        <Link
          className="text-lg block w-12/12 m-auto text-center p-2  font-bold text-black bg-slate-400"
          href={`/converssion/${profileInfo?._id}`}
        >
          Talk with {profileInfo?.name}
        </Link>
      </div>
    </>
  );
}
