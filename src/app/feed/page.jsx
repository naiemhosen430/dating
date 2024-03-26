"use client";
import React, { useContext, useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import Post from "../Components/Box/Post";
import ButtonBer from "../Components/Shared/ButtonBer";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { MineContext } from "@/Context/MineContextProvider";

export default function page() {
  const { allPost } = useContext(MineContext);
  const [text, setText] = useState({
    text: "",
  });

  return (
    <>
      {/* options  */}
      <div className="fixed bottom-32 right-4">
        <Link href="/addpost">
          <IoMdAdd className="text-6xl block text-teal-50 p-2 rounded-full shadow-lg" />
        </Link>
      </div>
      {/* options  */}
      <div className="space-y-4 p-2">
        <div className="rounded-full bg-slate-900 flex items-center justify-center sticky top-1">
          <input
            className="lg:text-xl text-sm p-2 px-4 rounded-full bg-slate-900 text-teal-50 w-10/12"
            type="search"
            name="text"
            id="text"
            onChange={(event) => {
              setText({
                ...text, // Corrected from ...userInfo to ...text
                [event.target.name]: event.target.value,
              });
            }}
            placeholder="Search for person or post"
          />
          <Link href={`/search/${text.text}`}>
            <div className="text-2xl block w-2/12 text-center">
              <CgSearch className="inline-block text-slate-600" />
            </div>
          </Link>
        </div>

        {/* post */}
        <div className="lg:flex space-x-2">
          <div className="lg:w-7/12">
            {!allPost ? (
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
            ) : allPost?.length === 0 ? (
              <h1 className="text-4xl text-white p-5 text-center my-20">
                There is no post
              </h1>
            ) : (
              allPost?.map((post) => (
                <>
                  <Post key={post._id} post={post} />
                </>
              ))
            )}
          </div>
          <div className="w-5/12 lg:inline-block hidden">Hello</div>
        </div>
      </div>
      <ButtonBer />
    </>
  );
}
