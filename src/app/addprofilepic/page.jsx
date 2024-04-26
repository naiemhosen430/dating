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
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        fetchData();
    }, [text]); 

    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const fetchData = debounce(async () => {
        if (text.trim() === '') {
            try {
                setLoading(true); // Set loading state to true
                const res = await axios.get('/api/picture');
                if (res.data.statusCode === 200) {
                    setAllImages(res.data.data);
                }
            } catch (error) {
                setError('Error fetching images.');
            } finally {
                setLoading(false); // Set loading state to false
            }
        } else {
            try {
                setLoading(true); 
                const res = await axios.get(`/api/picture?tag=${text}`);
                if (res.data.statusCode === 200) {
                    setAllImages(res.data.data);
                }
            } catch (error) {
                setError('Error fetching images.');
            } finally {
                setLoading(false); 
            }
        }
    }, 300); 

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
                console.log(response);
                if (response.data.statusCode === 200) {
                    setAllImages([...allImages, response.data.data]);
                    setAdPicturePopup(false);
                }
            })
            .catch((error) => {
                setError('Error adding picture.');
            });
    };

    return (
        <>
            {adPicturePopup && (
                <div className="fixed justify-center py-5 items-start overflow-y-auto top-0 left-0 bg-gradient-to-r z-50 from-blue-500 to-transparent h-screen w-screen">
                    {/* Add Picture Popup */}
                </div>
            )}
            <div>
                <div className="rounded-full bg-slate-900 flex items-center justify-center sticky top-1">
                    {/* Search Input */}
                </div>
                <div className="p-2 text-center">
                    {/* Add Picture Button */}
                </div>
                <h1 className="text-white text-center text-xs py-5">Select a picture and click on it to add it as your profile picture.</h1>
                <div className="p-2 text-center">
                    {/* Images List */}
                    {loading ? (
                        <h1 className="text-white text-center text-xl py-10">Loading images....</h1>
                    ) : (
                        allImages &&
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
