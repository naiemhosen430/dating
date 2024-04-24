import React from "react";

export default function Avater({ text }) {
  return (
    <div className="text-[4rm] rounded-full text-center text-yellow-500 font-bold">
      {text?.slice(0, 2)}
    </div>
  );
}
