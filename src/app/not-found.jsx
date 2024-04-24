import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">Not Found</h2>
      <p className="text-lg mb-4">Could not find the requested resource</p>
      <Link href="/">
        <a className="text-blue-500 hover:underline">Return Home</a>
      </Link>
    </div>
  );
}
