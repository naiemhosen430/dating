import Link from 'next/link';
import React, { useState } from 'react'
import { CgSearch } from 'react-icons/cg';

export default function SearchBar() {

    const [text, setText] = useState({
        text: "",
      });
  return (
    <>
                <div className="rounded-full bg-slate-900 flex items-center justify-center sticky top-1">
          <input
            className="lg:text-xl text-sm p-2 px-4 rounded-full bg-slate-900 text-teal-50 w-10/12"
            type="search"
            name="text"
            id="text"
            onChange={(event) => {
              setText({
                ...text, // Corrected from ...userInfo to ...text
                [event.target.name]: event.target.value,
              });
            }}
            placeholder="Search for person or post"
          />
          <Link href={`/search/${text.text}`}>
            <div className="text-2xl block w-2/12 text-center">
              <CgSearch className="inline-block text-slate-600" />
            </div>
          </Link>
        </div>
    </>
  )
}
