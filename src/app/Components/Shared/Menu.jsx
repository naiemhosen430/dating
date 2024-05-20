"use client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Menu() {
  const [mobileBox, setMobileBox] = useState(false);

  const [profileInfo, setProfileInfo] = useState([]);
  const [interesta, setinteresta] = useState([]);
  useEffect(() => {
    const fatchData = async () => {
      await axios.get("/api/me").then((data) => {
        setProfileInfo(data.data.data);
        setinteresta(data.data.data.interest);
      });
    };
    fatchData();
  }, []);

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
      <div className="flex bg-slate-900 fixed z-10 top-0 w-full items-center px-4 shadow-md">
        <h1 className="text-white font-bold lg:w-2/12 w-6/12 text-3xl space-x-4">
          <Link href={"/"} onClick={toggleMenu}>
            Zane
          </Link>
        </h1>

        <ul className="lg:w-8/12 hidden lg:flex lg:items-center lg:justify-end">
          <Link
            className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
            href={"/myprofile"}
          >
            Profile
          </Link>

          <Link
            className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
            href={"/editprofile"}
          >
            Edit Profile
          </Link>
          <Link
            className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
            href={"/"}
          >
            About Us
          </Link>
          <Link
            className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
            href={"/"}
          >
            Help
          </Link>
          <Link
            className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
            href={"/term-service"}
          >
            Term-Service
          </Link>
          <Link
            className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
            href={"/privecy-policy"}
          >
            Privecy-Policy
          </Link>

          <Link
            className="text-slate-500 my-4 bg-slate-800 rounded-lg shadow-md hover:text-white px-4 py-2 block hover:bg-slate-500 text-center"
            href={"/login"}
          >
            Log out
          </Link>
        </ul>

        <ul className="lg:w-2/12 w-6/12 flex justify-end items-center space-x-4">
          <h1
            className="text-slate-500 cursor-pointer text-2xl space-x-2 flex items-center justify-end hover:text-white py-2 rounded-md"
            onClick={toggleMenu}
          >
            <span className="text-white lg:inline-block hidden">
              {profileInfo.name}
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
              href={"/myprofile"}
            >
              Profile
            </Link>

            <Link
              className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
              onClick={toggleMenu}
              href={"/editprofile"}
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
              className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
              onClick={toggleMenu}
              href={"/term-service"}
            >
              Term-Service
            </Link>
            <Link
              className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
              onClick={toggleMenu}
              href={"/privecy-policy"}
            >
              Privecy-Policy
            </Link>
            <Link
              className="text-slate-500 hover:text-white px-4 py-2 block rounded-md"
              onClick={toggleMenu}
              href={""}
            >
              Download Zane Latest App
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
