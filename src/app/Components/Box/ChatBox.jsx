import Link from "next/link";
import React from "react";

export default function ChatBox() {
  return (
    <>
      <div className="w-full rounded-2xl p-2">
        <h1 className="text-slate-500 p-2 text-center">Chat</h1>
        <div className="space-y-2">
          <div className="flex items-center p-2 px-1">
            <div className="w-2/12 rounded-full">
              <Link href={"/profile/id"}>
                <img
                  className="w-20 h-14 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43v0swxDseKQjPoEV3QHvzltyPL6pBVef_Jztx_pD&s"
                  alt=""
                />
              </Link>
            </div>
            <div className="w-10/12">
              <h1 className="text-lg px-2">Mim Sultana</h1>
              <h1 className="text-sm px-2 text-red-500">active 11 m ago</h1>
              <h1 className="text-lg px-2 text-red-400 text-right flex">
                <span className="w-8/12 text-left block">Hello</span>
                <span className="text-sm px-2 w-4/12 block text-red-500">
                  5 m ago
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
