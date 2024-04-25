'use client'
import { MineContext } from '@/Context/MineContextProvider';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { CgSearch } from 'react-icons/cg';

export default function page() {
    const {  data,setData } = useContext(MineContext);
    if (!data){
        return (
            <h1 className="text-white text-center text-xl py-10">Loading....</h1>
        )
    }

    const [text, setText] = useState("");
    const [allImages, setAllImages] = useState(null);

    useEffect(()=>{
        const fatchData = async () => {
            axios.get(`/api/picture`).then((res)=>{
                if (res.data.statusCode === 200) {
                    setAllImages(res.data.data)
                }
            })
        }
        fatchData()
    },[])

    // for update profile pic 
    const updateProfilepic = async (link) => {
        axios.post(`/api/user/editprofile`, {
            ...data,
            profilepicture: link
        }).then((res)=>{
            if (res.data.statusCode === 200) {
                setData(res.data.data)
                router.push("/");
            }
        })
    }
    
  return (
    <>
        <div>
            <div className="rounded-full bg-slate-900 flex items-center justify-center sticky top-1">
            <input
                className="lg:text-xl text-sm p-2 px-4 rounded-full bg-slate-900 text-teal-50 w-10/12"
                type="search"
                name="text"
                id="text"
                value={text}
                onChange={(event) => {
                setText(event.target.value);
                }}
                placeholder="Search for picture"
            />

                <div className="text-2xl block w-2/12 text-center">
                <CgSearch className="inline-block text-slate-600" />
                </div>

            </div>

            <div className='p-2 text-center'>
                {!allImages ? <h1 className="text-white text-center text-xl py-10">Loading images....</h1>: (
                    allImages?.map((item)=>(
                        <img className='inline-block w-5/12 m-2' onClick={()=> updateProfilepic(item?.link)} src={item?.link} alt="no image" />
                    ))
                )}
            </div>

        </div>
    </>
  )
}
