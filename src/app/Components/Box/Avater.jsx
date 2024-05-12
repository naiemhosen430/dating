import React from "react";

export default function Avater({ text }) {
  return (
    <div className="text-[4rm] rounded-full text-center text-yellow-500 font-bold">
      <img className="w-full rounded-full block" src={text || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI0ewTXYok59AkFhhf1NPtgIzDVAv3KY4F9xtaqOJXNV-QQH8F_K6PvpHxa6UpjayvgbU&usqp=CAU"} alt="" />
      {/* {text?.slice(0, 2)} */}
    </div>
  );
}
