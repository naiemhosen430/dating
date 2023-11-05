import React from "react";
import { CgSearch } from "react-icons/cg";

export default function page() {
  return (
    <>
      <div className="space-y-4 p-2">
        <div className="rounded-full bg-slate-900 flex items-center justify-center sticky top-1">
          <input
            className="text-xl p-2 px-4 rounded-full bg-slate-900 text-teal-50 w-10/12"
            type="search"
            name="text"
            id="text"
          />
          <div className="text-2xl block w-2/12 text-center">
            <CgSearch className="inline-block text-slate-600" />
          </div>
        </div>
      </div>
    </>
  );
}
