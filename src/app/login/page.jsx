"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function page() {
  const [interestOption, setInterestOption] = useState([
    "Sustainable Living",
    "Mental Health and Wellness",
    "Outdoor Activities",
    "Plant-Based Diets",
    "Tech Gadgets and AI",
    "Gaming",
    "Home Improvement",
    "Fitness and Exercise",
    "Culinary Exploration",
    "Travel",
    "Fashion and Streetwear",
    "Online Learning",
    "Art and Creativity",
    "Music",
    "Film and Streaming",
    "Photography",
    "Entrepreneurship",
    "Pets and Pet Care",
    "Sports",
    "Astrology and Spirituality",
    "Social Activism",
    "Books and Reading",
    "Cryptocurrencies",
    "Fashion Resale",
    "Gardening",
    "Food Blogging and Influencing",
    "Board Games and Puzzles",
    "Fitness Tech",
    "Craft Beer and Brewing",
    "Retro and Vintage",
    "Cycling",
    "DIY Electronics",
    "Yoga and Pilates",
    "Coding and Programming",
    "Fishing and Angling",
    "Collectibles",
    "Sustainability Advocacy",
    "Volunteering",
    "Stand-up Comedy",
    "Cultural Experiences",
    "Space Exploration",
    "Hiking and Backpacking",
    "Dance",
    "Astronomy and Stargazing",
    "Podcasting",
    "Local and Artisanal Products",
    "Environmental Conservation",
    "Skateboarding",
    "Fashion Sustainability",
    "Financial Literacy",
    "Geocaching",
    "Paranormal Investigation",
    "Tea Culture",
    "Aerial Sports",
    "Social Media Marketing",
    "Whale Watching",
    "Blockchain and NFTs",
    "Off-Roading",
    "Genealogy and Ancestry",
    "Renewable Energy",
    "Crossword Puzzles",
    "Horseback Riding",
    "Birdwatching",
    "Scuba Diving",
    "Classic Cars",
    "Beekeeping",
    "Astrophotography",
    "Permaculture Gardening",
    "Kite Surfing",
    "Aquascaping",
    "Robotics and DIY Drones",
    "Historical Reenactment",
    "Retro Gaming",
    "Mythology and Folklore",
    "LARPing",
    "Silversmithing",
    "Hiking Challenges",
    "Woodworking",
    "Motorsports",
    "Space Tourism",
    "Culinary foraging",
    "Minimalism",
  ]);

  const [userInfo, setUserInfo] = useState({
    name: "",
    age: 0,
    gender: "",
    country: "",
    interest: [],
  });
  const [nameBox, setNameBox] = useState(true);
  const [ageBox, setageBox] = useState(false);
  const [gencon, setgencon] = useState(false);
  const [interest, setInterest] = useState(false);
  const [errmessage, seterrmessage] = useState("");

  // onclick
  const showagebox = () => {
    if (userInfo.name !== "") {
      setageBox(true);
      setNameBox(false);
    } else {
      seterrmessage("Name is required!");
    }
  };
  const openGenCon = () => {
    if (userInfo.age !== 0) {
      setageBox(false);
      setgencon(true);
    } else {
      seterrmessage("Age is required!");
    }
  };
  const openIntarest = () => {
    if (userInfo.country !== "" || userInfo.gender !== "") {
      setInterest(true);
      setageBox(false);
      setgencon(false);
    } else {
      seterrmessage("Country and gender is required!");
    }
  };

  // for interest
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }

    setUserInfo((preinfo) => ({
      ...preinfo,
      interest: selectedOptions,
    }));
  };

  // for countrys
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // create id
  const createid = () => {
    console.log(selectedOptions);
    console.log(userInfo);
  };

  return (
    <>
      <div className="lg:p-20 md:p-10">
        <div className="lg:w-4/12 md:w-8/12 h-screen lg:h-full m-auto bg-slate-900 shadow-xl">
          <h1 className="text-2xl font-bold p-5 text-center">Name</h1>
          <h1 className="text-slate-700 text-center ">{errmessage}</h1>
          {/* name */}
          {nameBox && (
            <div className="p-2 lg:px-10 px-5">
              <label
                className="block p-2 text-xl text-slate-500"
                htmlFor="name"
              >
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
                name="name"
                id="name"
              />
              <button
                onClick={showagebox}
                className="block p-2 px-4 w-full bg-slate-600 my-10 text-black font-bold rounded-md"
              >
                Next
              </button>
            </div>
          )}

          {/* age */}
          {ageBox && (
            <div className="p-2 lg:px-10 px-5">
              <label
                className="block p-2 text-xl text-slate-500"
                htmlFor="name"
              >
                What is your age?
              </label>
              <input
                className="text-lg text-white font-bold block p-2 px-4 rounded-xl bg-slate-950 w-full"
                placeholder="1 to 100"
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    [event.target.name]: event.target.value,
                  });
                }}
                type="text"
                name="age"
                id="age"
              />
              <button
                onClick={openGenCon}
                className="block p-2 px-4 w-full bg-slate-600 my-10 text-black font-bold rounded-md"
              >
                Next
              </button>
            </div>
          )}

          {/* gender and country */}
          {gencon && (
            <div className="p-2 lg:px-10 px-5">
              <label
                className="block p-2 text-xl text-slate-500"
                htmlFor="country"
              >
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
                {countries.map((country) => (
                  <option key={country.cca2} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>

              {/* gender */}
              <label
                className="block p-2 text-xl text-slate-500"
                htmlFor="gender"
              >
                What is your gender?
              </label>
              <select
                className="text-lg text-white font-bold block p-2 px-4 rounded-xl bg-slate-950 w-full"
                name="gender"
                id="gender"
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    [event.target.name]: event.target.value,
                  });
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <button
                onClick={openIntarest}
                className="block p-2 px-4 w-full bg-slate-600 my-10 text-black font-bold rounded-md"
              >
                Next
              </button>
            </div>
          )}

          {/* Interest */}
          {interest && (
            <div className="p-2 lg:px-10 overflow-y-auto h-screen space-x-2 space-y-2 pb-52">
              <h1 className="text-xl text-white font-bold p-4 text-center">
                Choose your interest
              </h1>
              {interestOption.map((item) => (
                <label
                  key={item}
                  className={`p-1 px-3 inline-block rounded-3xl text-lg ${
                    selectedOptions.includes(item)
                      ? "bg-red-500 "
                      : "bg-slate-800"
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
              <div className="block fixed bottom-0 pb-14 left-0 w-full bg-slate-900 text-center">
                <button
                  onClick={createid}
                  className="bg-slate-600 my-2 p-2 w-6/12 m-auto inline-block text-black font-bold rounded-md"
                >
                  Finish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
