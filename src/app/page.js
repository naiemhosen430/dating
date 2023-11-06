import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ4Hk-8m9Cl5hs6vUw5yHfz59sPO66UxI5pw&usqp=CAU")',
          backgroundRepeat: "no-repeat",
        }}
        className="h-screen w-screen opacity-40 lg:bg-cover text-center bg-contain bg-bottom pt-20"
      >
        <button className="lg:inline-block hidden hover:bg-slate-900 text-xl w-5/12 rounded-lg py-2 px-4 bg-slate-600 text-white font-bold">
          Action
        </button>
        <div className="p-5 text-left h-4/6 bg-slate-800 w-11/12 lg:w-5/12 rounded-lg border m-auto">
          hello
        </div>
        <button className="inline-block lg:hidden hover:bg-slate-900 text-xl rounded-lg py-2 px-4 bg-slate-600 text-white font-bold">
          Action
        </button>
      </div>
    </>
  );
}
