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
    const [adpicturepopup, setadpicturepopup] = useState(false);
    const [allImages, setAllImages] = useState(null);
    const [error, setError] = useState(null);
      // for picture action
  const [pictureState, setPictureState] = useState({
    name: null,
    link: null,
    tag: null,
  });

    useEffect(()=>{
        const fatchData = async () => {
            axios.get(`/api/picture`).then((res)=>{
                if (res.data.statusCode === 200) {
                    setAllImages(res.data.data)
                }
            })

            setAllImages([])
        }
        fatchData()
    },[])

    // for update profile pic 
    const updateProfilepic = async (link) => {
        const confirmed = confirm("Are you sure you want to update your profile picture?");
        
        if (!confirmed) {
            return;
        }
    
        axios.post(`/api/user/editprofile`, {
            ...data,
            profilepicture: link
        }).then((res)=>{
            if (res.data.statusCode === 200) {
                setData(res.data.data);
                router.push("/");
            }
        });
    }
    
    const toggleAddPicturepopup = () => {
        if (adpicturepopup){
            setadpicturepopup(false)
        }else{
            setadpicturepopup(true)
        }
    }

    const hundleAddPicture = () => {
        if(!pictureState.name || pictureState.link || pictureState.tag){
            axios.post("/api/picture", pictureState)
            .then((data)=>{
                if (data,data.statusCode === 200){
                    setAllImages([...allImages , data,data.data])
                    adpicturepopup(false)
                }
            })
        }
    }
  return (


    <>
    {adpicturepopup && (
            <div className="fixed justify-center py-5 items-start overflow-y-auto top-0 left-0 bg-gradient-to-r z-50 from-blue-500 to-transparent h-screen w-screen">
              <div className="lg:w-8/12 w-12/12 text-center bg-white opacity-100 m-auto p-10 rounded-2xl shadow-2xl">
                <div className="">
                  <h1 className="font-bold text-2xl py-5">
                   Add image
                  </h1>
    
                  <div className="lg:w-full m-auto">
                  <div className="py-4 lg:w-5/12 px-4">
                          <label
                            className="p-2 lg:text-lg text-sm block"
                            htmlFor="name"
                          >
                            Image name
                          </label>
                          <input
                            className="p-2 px-4 lg:text-lg text-sm block w-full border rounded-lg shadow-md"
                            id="name"
                            value={pictureState?.name}
                            onChange={(e) =>
                              setPictureState({
                                ...pictureState,
                                name: e.target.value,
                              })
                            }
                            list="name"
                            name="name"
                            placeholder="Type name"
                            type="text"
                          />
                        </div>
    
                        <div className="py-4 lg:w-5/12 px-4">
                          <label
                            className="p-2 lg:text-lg text-sm block"
                            htmlFor="link"
                          >
                            Image link
                          </label>
                          <input
                            className="p-2 px-4 lg:text-lg text-sm block w-full border rounded-lg shadow-md"
                            id="link"
                            value={pictureState.link}
                            onChange={(e) =>
                              setPictureState({
                                ...pictureState,
                                quantity: parseInt(e.target.value),
                              })
                            }
                            name="link"
                            placeholder="Enter"
                            type="text"
                          />
                        </div>

                        <div className="py-4 lg:w-5/12 px-4">
                          <label
                            className="p-2 lg:text-lg text-sm block"
                            htmlFor="tag"
                          >
                            Image tag
                          </label>
                          <input
                            className="p-2 px-4 lg:text-lg text-sm block w-full border rounded-lg shadow-md"
                            id="tag"
                            value={pictureState.tag}
                            onChange={(e) =>
                              setPictureState({
                                ...pictureState,
                                quantity: parseInt(e.target.value),
                              })
                            }
                            name="tag"
                            placeholder="Enter"
                            type="text"
                          />
                        </div>
    
                    {error && (
                      <h1 className="border flex items-center rounded-lg text-xs bg-red-950 text-black shadow-xl bg-transparent p-2 text-center">
                        <MdErrorOutline className="mx-2" /> {error}
                      </h1>
                    )}
                  </div>
                </div>
                <div className="flex lg:justify-end mt-10 justify-between">
                  <button
                    onClick={toggleAddPicturepopup}
                    className="p-2 px-4 bg-slate-900 text-white text-sm inline-block font-bold rounded-md shadow-lg"
                  >
                    Cencel
                  </button>
                  <button
                    onClick={hundleAddPicture}
                    className="p-2 px-4 bg-slate-700 mx-2 text-white text-sm inline-block font-bold rounded-md shadow-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
    )}
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

            <div className="p-2 text-center">
                <button className="text-xs text-slate-500 border p-1 px-2 rounded-2xl my-2" onClick={toggleAddPicturepopup}>Add Picture</button>
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
