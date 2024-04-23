"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Something went wrong!</strong>
      <span className="block sm:inline"> Please try again later.</span>
      <button
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={reset}
      >
        <svg
          className="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.354 5.646a.5.5 0 0 1 .708.708L10.707 10l4.355 4.646a.5.5 0 1 1-.708.708L10 10.707l-4.646 4.355a.5.5 0 1 1-.708-.708L9.293 10 4.646 5.354a.5.5 0 1 1 .708-.708L10 9.293l4.646-4.355z" />
        </svg>
      </button>
    </div>
  );
}
