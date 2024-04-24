"use client";
import { MineContext } from "@/Context/MineContextProvider";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import Post from "../Components/Box/Post";

export default function page() {
  const { fetchfriendpostData, allfriendPost, data } = useContext(MineContext);

  if (data?._id) {
    fetchfriendpostData(data?._id);
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
            src="https://t4.ftcdn.net/jpg/01/97/15/87/360_F_197158744_1NBB1dEAHV2j9xETSUClYqZo7SEadToU.jpg"
            alt=""
          />
          <h1 className="text-xl font-bold p-1 text-white">{data?.name}</h1>
          <div className="flex w-10/12 m-auto items-center text-slate-500 justify-center">
            <span className="inline-block">{data?.age} / </span>
            <span className="inline-block"> {data?.gender}</span>
          </div>
          <div className="flex w-10/12 m-auto items-center text-slate-500 justify-center">
            <span className="inline-block">{data?.country}</span>
          </div>

          {/* tag */}
          <div className="w-10/12 space-x-2 space-y-2 py-5 lg:6/12 m-auto">
            {data?.interesta?.map((i) => (
              <span
                key={i}
                className="inline-block p-1 text-xs px-3 rounded-2xl bg-slate-800"
              >
                {i}
              </span>
            ))}
          </div>

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
                  You don't have post
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
    </>
  );
}
