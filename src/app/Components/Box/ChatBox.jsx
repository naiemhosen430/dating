import Link from "next/link";
import React from "react";

export default function ChatBox() {
  return (
    <>
      <div className="w-full rounded-2xl">
        <h1 className="text-slate-500 p-1 px-2 flex items-center">
          <span className="block w-6/12">Friend and chat</span>
          <Link
            className="block w-6/12 text-right text-slate-600"
            href={"/interests"}
          ></Link>
        </h1>
        <div className="space-y-2">
          <div className="flex items-center justify-center p-2 px-1">
            <div className="w-2/12 flex items-center rounded-full pb-1">
              <Link className="block" href={"/profile/id"}>
                <img
                  className="w-12 h-12 rounded-full inline-block"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43v0swxDseKQjPoEV3QHvzltyPL6pBVef_Jztx_pD&s"
                  alt=""
                />
              </Link>
            </div>
            <div className="w-10/12">
              <Link href={"/converssion/id"}>
                <h1 className="text-sm px-2">Mim Sultana</h1>
                <h1 className="text-xs px-2 text-red-500">active 11 m ago</h1>
                <h1 className="text-xs px-2 text-red-400 text-right flex">
                  <span className="w-8/12 text-left text-base block">
                    Hello
                  </span>
                  <span className="text-xs text-right w-4/12 block text-red-500">
                    5 m ago
                  </span>
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
