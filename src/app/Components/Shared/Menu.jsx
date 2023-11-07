"use client";
import Link from "next/link";
import { MdHelp, MdOutlineNotificationsNone } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

export default function Menu() {
  const [mobileBox, setMobileBox] = useState(false);

  // onclick functions
  const toggleMenu = () => {
    if (mobileBox === true) {
      setMobileBox(false);
    } else {
      setMobileBox(true);
    }
  };
  return (
    <>
      <div className="flex fixed z-10 top-2 w-full items-center p-4 px-4 shadow-md">
        <h1 className="text-white font-bold lg:w-2/12 w-6/12 text-3xl space-x-4">
          <Link href={"/"} onClick={toggleMenu}>
            Name
          </Link>
        </h1>
        <ul className="lg:w-3/12 hidden lg:flex items-center space-x-4">
          <Link
            className="text-slate-500 hover:text-white px-4 py-2 rounded-md"
            href={"/"}
          >
            Person
          </Link>

          <Link
            className="text-slate-500 hover:text-white px-4 py-2 rounded-md"
            href={"/"}
          >
            Video
          </Link>
        </ul>
        <ul className="lg:w-4/12 w-4/12 justify-end flex items-center lg:space-x-4 space-x-2">
          <Link
            className="text-slate-500 my-4 bg-slate-800 rounded-lg shadow-md hover:text-white px-4 py-2 block hover:bg-slate-500 text-center"
            href={"/login"}
            onClick={toggleMenu}
          >
            Log out
          </Link>
        </ul>

        <ul className="lg:w-3/12 w-2/12 flex justify-end items-center space-x-4">
          <h1
            className="text-slate-500 cursor-pointer text-2xl space-x-2 flex items-center justify-center hover:text-white px-4 py-2 rounded-md"
            onClick={toggleMenu}
          >
            <span className="text-white lg:inline-block hidden">
              naiemhosen
            </span>
            <CgProfile />
          </h1>
        </ul>
      </div>

      {mobileBox && (
        <div className="lg:hidden fixed py-10 p-5 top-0 z-10 w-screen h-screen bg-slate-900">
          <ul className="space-y-2">
            <Link
              className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
              onClick={toggleMenu}
              href={"/"}
            >
              Profile
            </Link>

            <Link
              className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
              onClick={toggleMenu}
              href={"/"}
            >
              Edit Profile
            </Link>
            <Link
              className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
              onClick={toggleMenu}
              href={"/"}
            >
              About Us
            </Link>
            <Link
              className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
              onClick={toggleMenu}
              href={"/"}
            >
              Help
            </Link>
            <Link
              className="text-slate-500 my-4 bg-slate-800 rounded-lg shadow-md hover:text-white px-4 py-2 block hover:bg-slate-500 text-center"
              href={"/login"}
              onClick={toggleMenu}
            >
              Log out
            </Link>
          </ul>
        </div>
      )}
    </>
  );
}
