"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { MineContext } from "@/Context/MineContextProvider";

export default function page() {
  const { setData } = useContext(MineContext);
  const router = useRouter();
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
  const [ageArray, setASgeArray] = useState(
    Array.from({ length: 99 }, (_, index) => 12 + index)
  );

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
    gender: "",
    country: "",
    id: "",
    interest: [],
  });
  const [loginuserInfo, setLoginUserInfo] = useState({
    email: "",
    password: "",
  });
  const [Email, setEmail] = useState(true);
  const [Password, setPassword] = useState(false);
  const [loginPassword, setLoginPassword] = useState(false);
  const [nameBox, setNameBox] = useState(false);
  const [ageBox, setageBox] = useState(false);
  const [gencon, setgencon] = useState(false);
  const [interest, setInterest] = useState(false);
  const [Finish, setFinish] = useState(false);
  const [errmessage, seterrmessage] = useState("");

  // onclick
  const openEmail = async () => {

    if (userInfo.email !== "") {
      try {
        await axios
          .post("/api/user/create", userInfo)
          .then((data) => {
            if (data.data.statusCode === 404) {
              router.push("/login");
              setUserInfo((preData) => ({
                ...preData,
                id: data.data.id,
                email: data.data.email,
              }));
              setEmail(false);
              setPassword(true);
              seterrmessage(data.data.message);
            } else if (data.data.statusCode === 200) {
              setLoginUserInfo((preData) => ({
                ...preData,
                email: data.data.email,
              }));
              setEmail(false);
              setLoginPassword(true);
              seterrmessage(data.data.message);
            } else {
              seterrmessage(data.data.message);
            }
            setNameBox(false);
          })
          .catch((error) => {});
      } catch (error) {}
    } else {
      seterrmessage("Email is required!");
    }
  };
  const openPassword = () => {
    if (userInfo.password !== "") {
      setEmail(false);
      setPassword(false);
      setNameBox(true);
    } else {
      seterrmessage("password is required!");
    }
  };
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
    if (userInfo.country !== "" && userInfo.gender !== "") {
      setInterest(true);
      setFinish(false);
      setageBox(false);
      setgencon(false);
    } else {
      seterrmessage("Country and gender is required!");
    }
  };
  const backToRegister = () => {
    setEmail(true);
    setLoginPassword(false);
    setInterest(false);
    setFinish(false);
    setNameBox(false);
    setageBox(false);
    setgencon(false);
  };

  // create id
  const createid = async () => {
    if (userInfo.interest.length !== 0) {
      setInterest(false);
      try {
        await axios
          .put("/api/user/create", userInfo)
          .then((data) => {
            if (data.data.statusCode === 200) {
              Cookies.set("accesstoken", data.data.data, { expires: 36500 });
              setInterest(false);
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

  // login
  const loginForPassword = async () => {
    try {
      await axios
        .post("/api/user/login", loginuserInfo)
        .then((data) => {
          if (data.data.statusCode === 200) {
            Cookies.set("accesstoken", data.data.token, { expires: 36500 });
            setData(data?.data?.data);
            router.push("/");
          } else {
            seterrmessage(data.data.message);
          }
        })
        .catch((error) => {});
    } catch (error) {}
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

  // for quick login
  const hundleQuickLogin = async () => {

    try {
      await axios
        .post("/api/user/create", userInfo)
        .then((data) => {
          if (data.data.statusCode === 404) {
            router.push("/login");
            setUserInfo((preData) => ({
              ...preData,
              id: data.data.id,
              email: data.data.email,
            }));
            setEmail(false);
            setPassword(true);
            seterrmessage(data.data.message);
          } else if (data.data.statusCode === 200) {
            setLoginUserInfo((preData) => ({
              ...preData,
              email: data.data.email,
            }));
            setEmail(false);
            setLoginPassword(true);
            seterrmessage(data.data.message);
          } else {
            seterrmessage(data.data.message);
          }
          setNameBox(false);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <>
      <div className="lg:p-20 md:p-10">
        <div className="lg:w-4/12 md:w-8/12 h-screen lg:h-full m-auto bg-slate-900 shadow-xl">
          <h1 className="text-2xl font-bold p-5 text-center">Zane</h1>
          <h1 className="text-slate-600 text-sm bg-slate-900 text-center ">
            {errmessage}
          </h1>
          {/* email */}
          {Email && (
            <div className="p-2 lg:px-10 px-5">
              <label
                className="block p-2 text-lg text-slate-500"
                htmlFor="email"
              >
                <h1 className="text-xl text-white p-4 text-center">
                  Welcome Back
                </h1>
                To continue write your email
              </label>
              <input
                className="text-lg text-white font-bold block p-2 px-4 rounded-xl bg-slate-950 w-full"
                placeholder="Email"
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    [event.target.name]: event.target.value,
                  });
                }}
                type="email"
                name="email"
                id="email"
              />
              <button
                onClick={openEmail}
                className="block p-2 px-4 w-full bg-slate-600 my-5 text-black font-bold rounded-md"
              >
                Next
              </button>
              <h1 className="text-xl text-white p-4 text-center">Or</h1>
              <button
                onClick={hundleQuickLogin}
                className="block p-2 px-4 w-full bg-slate-600 my-5 text-black font-bold rounded-md"
              >
                Quick Login
              </button>
              <div className="p-4 mt-10 text-slate-500 text-sm">
                Read Our{" "}
                <Link
                  className="text-slate-600 hover:underline no-underline pb-2 hover:text-slate-500"
                  href={"/privecy-policy"}
                >
                  Privecy-Policy{" "}
                </Link>
                and{" "}
                <Link
                  className="text-slate-600 hover:underline no-underline pb-2 hover:text-slate-500"
                  href={"/term-service"}
                >
                  Term-Service
                </Link>
              </div>
            </div>
          )}

          {/* password */}
          {Password && (
            <div className="p-2 lg:px-10 px-5">
              <label
                className="block p-2 text-xl text-slate-500"
                htmlFor="password"
              >
                What is your password?
              </label>
              <input
                className="text-lg text-white font-bold block p-2 px-4 rounded-xl bg-slate-950 w-full"
                placeholder="Password"
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    [event.target.name]: event.target.value,
                  });
                }}
                type="password"
                name="password"
                id="password"
              />
              <button
                onClick={openPassword}
                className="block p-2 px-4 w-full bg-slate-600 my-10 text-black font-bold rounded-md"
              >
                Next
              </button>
              <div className="p-4 mt-10 text-slate-500 text-sm">
                Read Our{" "}
                <Link
                  className="text-slate-600 hover:underline no-underline pb-2 hover:text-slate-500"
                  href={"/privecy-policy"}
                >
                  Privecy-Policy{" "}
                </Link>
                and{" "}
                <Link
                  className="text-slate-600 hover:underline no-underline pb-2 hover:text-slate-500"
                  href={"/term-service"}
                >
                  Term-Service
                </Link>
              </div>
            </div>
          )}

          {/* login password */}
          {loginPassword && (
            <div className="p-2 lg:px-10 px-5">
              <label
                className="block p-2 text-xl text-slate-500"
                htmlFor="password"
              >
                Enter your password to login
              </label>
              <input
                className="text-lg text-white font-bold block p-2 px-4 rounded-xl bg-slate-950 w-full"
                placeholder="password"
                onChange={(event) => {
                  setLoginUserInfo({
                    ...userInfo,
                    [event.target.name]: event.target.value,
                  });
                }}
                type="text"
                name="password"
                id="password"
              />
              <button
                onClick={loginForPassword}
                className="block p-2 px-4 w-full bg-slate-600 my-10 text-black font-bold rounded-md"
              >
                Next
              </button>
              <div className="p-4 mt-10 text-slate-500 text-sm">
                Read Our{" "}
                <Link
                  className="text-slate-600 hover:underline no-underline pb-2 hover:text-slate-500"
                  href={"/privecy-policy"}
                >
                  Privecy-Policy{" "}
                </Link>
                and{" "}
                <Link
                  className="text-slate-600 hover:underline no-underline pb-2 hover:text-slate-500"
                  href={"/term-service"}
                >
                  Term-Service
                </Link>
              </div>
            </div>
          )}

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
                <option selected value="">
                  Select
                </option>
                {countries.map((country) => (
                  <>
                    <option key={country.cca2} value={country.name.common}>
                      {country.name.common}
                    </option>
                  </>
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
                <option value="" selected>
                  Select
                </option>
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
                  className={` inline-block rounded-3xl p-1 text-xs px-3 ${
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
                  Filish
                </button>
              </div>
            </div>
          )}

          {!Email && (
            <button
              onClick={backToRegister}
              className="block p-2 px-4 w-full my-20 text-slate-500 font-bold rounded-md"
            >
              Back to register
            </button>
          )}
        </div>
      </div>
    </>
  );
}