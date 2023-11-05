import Link from "next/link";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function Menu() {
  return (
    <>
      <div className="bg-slate-900 flex items-center p-4 px-4 shadow-md">
        <h1 className="text-white font-bold lg:w-2/12 w-6/12 text-3xl">
          <Link href={"/"}>Datting</Link>
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
            className="text-slate-500 text-2xl hover:text-white px-4 py-2 rounded-md"
            href={"/"}
          >
            <AiOutlineMessage />
          </Link>

          <Link
            className="text-slate-500 text-2xl hover:text-white px-4 py-2 rounded-md"
            href={"/"}
          >
            <MdOutlineNotificationsNone />
          </Link>
        </ul>

        <ul className="lg:w-3/12 w-2/12 flex justify-end items-center space-x-4">
          <Link
            className="text-slate-500 text-2xl space-x-2 flex items-center justify-center hover:text-white px-4 py-2 rounded-md"
            href={"/"}
          >
            <span className="text-white lg:inline-block hidden">
              naiemhosen
            </span>
            <CgProfile />
          </Link>
        </ul>
      </div>
    </>
  );
}
