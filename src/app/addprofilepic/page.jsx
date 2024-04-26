'use client';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CgSearch } from 'react-icons/cg';

import { MineContext } from '@/Context/MineContextProvider';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
  const { data, setData } = useContext(MineContext);
  const [text, setText] = useState('');
  const [adPicturePopup, setAdPicturePopup] = useState(false);
  const [allImages, setAllImages] = useState(null);
  const [error, setError] = useState(null);
  const [pictureState, setPictureState] = useState({
    name: '',
    link: '',
    tag: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/picture');
        if (res.data.statusCode === 200) {
          setAllImages(res.data.data);
        }
      } catch (error) {
        setError('Error fetching images.');
      }
    };

    fetchData();
  }, []);

  const updateProfilePic = async (link) => {
    const confirmed = window.confirm('Are you sure you want to update your profile picture?');

    if (!confirmed) {
      return;
    }

    try {
      const res = await axios.post('/api/user/editprofile', {
        ...data,
        profilepicture: link,
      });
      if (res.data.statusCode === 200) {
        setData(res.data.data);
        router.push('/');
      }
    } catch (error) {
      setError('Error updating profile picture.');
    }
  };

  const toggleAddPicturePopup = () => {
    setAdPicturePopup(!adPicturePopup);
  };

  const handleAddPicture = () => {
    if (!pictureState.name || !pictureState.link || !pictureState.tag) {
      setError('Please fill out all fields.');
      return;
    }

    axios
      .post('/api/picture', pictureState)
      .then((response) => {
        console.log(response)
        if (response.data.statusCode === 200) {
          setAllImages([...allImages, response.data.data]);
          setAdPicturePopup(false);
        }
      })
      .catch((error) => {
        setError('Error adding picture.');
      });
  };

  console.log(allImages)

  return (
    <>
      {adPicturePopup && (
        <div className="fixed justify-center py-5 items-start overflow-y-auto top-0 left-0 bg-gradient-to-r z-50 from-blue-500 to-transparent h-screen w-screen">
          <div className="lg:w-8/12 w-12/12 text-center bg-white opacity-100 m-auto p-10 rounded-2xl shadow-2xl">
            <div className="">
              <h1 className="font-bold text-black text-2xl py-5">Add image</h1>
              <div className="lg:w-full m-auto">
                <div className="py-4 lg:w-5/12 px-4">
                  <label className="p-2 lg:text-lg text-sm block" htmlFor="name">
                    Image name
                  </label>
                  <input
                    className="p-2 px-4 text-black lg:text-lg text-sm block w-full border rounded-lg shadow-md"
                    id="name"
                    value={pictureState.name}
                    onChange={(e) => setPictureState({ ...pictureState, name: e.target.value })}
                    name="name"
                    placeholder="Type name"
                    type="text"
                  />
                </div>
                <div className="py-4 lg:w-5/12 px-4">
                  <label className="p-2 lg:text-lg text-sm block" htmlFor="link">
                    Image link
                  </label>
                  <input
                    className="p-2 px-4 text-black lg:text-lg text-sm block w-full border rounded-lg shadow-md"
                    id="link"
                    value={pictureState.link}
                    onChange={(e) => setPictureState({ ...pictureState, link: e.target.value })}
                    name="link"
                    placeholder="Enter link"
                    type="text"
                  />
                </div>
                <div className="py-4 lg:w-5/12 px-4">
                  <label className="p-2 lg:text-lg text-sm block" htmlFor="tag">
                    Image tag
                  </label>
                  <input
                    className="p-2 px-4 text-black lg:text-lg text-sm block w-full border rounded-lg shadow-md"
                    id="tag"
                    value={pictureState.tag}
                    onChange={(e) => setPictureState({ ...pictureState, tag: e.target.value })}
                    name="tag"
                    placeholder="Enter tag"
                    type="text"
                  />
                </div>
                {error && (
                  <h1 className="border flex items-center rounded-lg text-xs bg-red-950 text-black shadow-xl bg-transparent p-2 text-center">
                    {error}
                  </h1>
                )}
              </div>
              <div className="flex lg:justify-end mt-10 justify-between">
                <button
                  onClick={toggleAddPicturePopup}
                  className="p-2 px-4 bg-slate-900 text-white text-sm inline-block font-bold rounded-md shadow-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPicture}
                  className="p-2 px-4 bg-slate-700 mx-2 text-white text-sm inline-block font-bold rounded-md shadow-lg"
                >
                  Add
                </button>
              </div>
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
            onChange={(event) => setText(event.target.value)}
            placeholder="Search for picture"
          />
          <div className="text-2xl block w-2/12 text-center">
            <CgSearch className="inline-block text-slate-600" />
          </div>
        </div>
        <div className="p-2 text-center">
          <button className="text-xs text-slate-500 border p-1 px-2 rounded-2xl my-2" onClick={toggleAddPicturePopup}>
            Add Picture
          </button>
        </div>
        <div className="p-2 text-center">
          {!allImages ? (
            <h1 className="text-white text-center text-xl py-10">Loading images....</h1>
          ) : (
            allImages.map((item) => (
              <img
                key={item._id}
                className="inline-block w-5/12 m-2"
                onClick={() => updateProfilePic(item.link)}
                src={item.link}
                alt="no image"
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
