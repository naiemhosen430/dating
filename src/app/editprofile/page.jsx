"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function page() {
  const router = useRouter();
  const [errmessage, seterrmessage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  // get me
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: 0,
    country: "",
    interest: [],
  });
  const [interesta, setinteresta] = useState([]);
  useEffect(() => {
    const fatchData = async () => {
      await axios
        .get("/api/me")
        .then((data) => {
          setUserInfo({
            name: data.data.data.name,
            age: data.data.data.age,
            country: data.data.data.country,
            interest: data.data.data.interest,
          });
          setSelectedOptions(data.data.data.interest);
        })
        .catch((err) => {});
    };
    fatchData();
  }, []);

  // for interest
  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      -+setSelectedOptions([...selectedOptions, option]);
    }

    setUserInfo((preinfo) => ({
      ...preinfo,
      interest: selectedOptions,
    }));
  };

  // interest array
  const [interestOption, setInterestOption] = useState([
    "Anime",
    "BTS",
    "Horror-Movies",
    "Coding",
    "Music",
    "Fitness",
    "Travel",
    "Gaming",
    "Art",
    "Books",
    "Photography",
    "Fashion",
    "Food",
    "Movies",
    "Tech",
    "Sports",
    "Pets",
    "Yoga",
    "DIY",
    "Dance",
    "Cooking",
    "Gardening",
    "Crafts",
    "Podcasts",
    "Writing",
    "Social-Media",
    "Reading",
    "Hiking",
    "Sustainability",
    "Finance",
    "Volunteering",
    "Comedy",
    "Space",
    "Marketing",
    "Blockchain",
    "Genealogy",
    "Minimalism",
    "Woodworking",
    "Motorsports",
    "Foraging",
    "Astrophotography",
    "Culinary",
  ]);

  // age array
  const [ageArray, setASgeArray] = useState(
    Array.from({ length: 99 }, (_, index) => 12 + index)
  );

  // for countrys
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        // Sort the countries array alphabetically by country name
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // editProfile
  const editProfile = async () => {
    if (userInfo.interest.length !== 0) {
      try {
        await axios
          .post("/api/user/editprofile", userInfo)
          .then((data) => {
            if (data.data.statusCode === 200) {
              router.push("/");
            } else {
              seterrmessage(data.data.message);
            }
          })
          .catch((error) => {});
      } catch (error) {}
    } else {
      seterrmessage("Choose interest!");
    }

    localStorage.setItem("userinfo", userInfo);
  };
  return (
    <>
      <div className="p-2 flex items-center text-3xl">
        <div className="w-6/12">
          <Link href={"/"}>
            <CgArrowLeft />
          </Link>
        </div>
        <div className="w-6/12 text-right">
          <BsThreeDotsVertical className="inline-block" />
        </div>
      </div>
      <h1 className="text-slate-600 text-sm bg-slate-900 text-center ">
        {errmessage}
      </h1>

      {/* name */}
      <div className="p-2 lg:px-10 px-5">
        <label className="block p-2 text-xl text-slate-500" htmlFor="name">
          What is your name?
        </label>
        <input
          className="text-lg text-white font-bold block p-2 px-4 rounded-xl bg-slate-950 w-full"
          placeholder="Name"
          onChange={(event) => {
            setUserInfo({
              ...userInfo,
              [event.target.name]: event.target.value,
            });
          }}
          type="text"
          value={userInfo.name}
          name="name"
          id="name"
        />
      </div>

      {/* age */}
      <div className="p-2 lg:px-10 px-5">
        <label className="block p-2 text-xl text-slate-500" htmlFor="name">
          What is your age?
        </label>
        <select
          className="text-lg text-white font-bold block p-2 px-4 rounded-xl bg-slate-950 w-full"
          name="age"
          id="age"
          onChange={(event) => {
            setUserInfo({
              ...userInfo,
              [event.target.name]: event.target.value,
            });
          }}
          value={userInfo.age}
        >
          <option selected value="">
            Select
          </option>
          {ageArray.map((age) => (
            <>
              <option key={age} value={age}>
                {age}
              </option>
            </>
          ))}
        </select>
      </div>

      {/* gender and country */}
      <div className="p-2 lg:px-10 px-5">
        <label className="block p-2 text-xl text-slate-500" htmlFor="country">
          What is your Country?
        </label>
        <select
          className="text-lg text-white font-bold block p-2 px-4 rounded-xl bg-slate-950 w-full"
          name="country"
          id="country"
          onChange={(event) => {
            setUserInfo({
              ...userInfo,
              [event.target.name]: event.target.value,
            });
          }}
          value={userInfo.country}
        >
          <option selected value="">
            Select
          </option>
          {countries.map((country) => (
            <>
              <option key={country.name.common} value={country.name.common}>
                {country.name.common}
              </option>
            </>
          ))}
        </select>
      </div>

      {/* Interest */}
      <div className="p-2 lg:px-10 overflow-y-auto h-screen space-x-2 space-y-2 pb-52">
        <h1 className="text-xl text-white font-bold p-4 text-center">
          Choose your interest
        </h1>
        {interestOption.map((item) => (
          <label
            key={item}
            className={`p-1 text-xs px-3 inline-block rounded-3xl ${
              selectedOptions.includes(item) ? "bg-red-500 " : "bg-slate-800"
            } text-slate-50`}
          >
            <input
              className="text-sm text-white hidden font-bold p-1 px-2 rounded-xl bg-slate-800"
              type="checkbox"
              checked={selectedOptions.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            {item}
          </label>
        ))}
        <div className="block fixed bottom-0 left-0 w-full bg-slate-900 text-center">
          <button
            onClick={editProfile}
            className="block p-2 px-4 w-full bg-slate-600 my-2 text-black font-bold rounded-md"
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
}
