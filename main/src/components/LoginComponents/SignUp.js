import React from "react";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { ReactTyped } from "react-typed";

const SignUp = ({ setLogin, setUser, socket }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://collabo-hub-ten.vercel.app/api/v1/signUp",
        formdata
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        setUser(response.data);
        // console.log(response.data);
        socket.emit("login", {
          userId: response.data.data._id,
          socketId: socket.id,
        });
        navigate(`/dashboard/${response.data.data.username}`);
      } else {
        // Handle non-successful status codes
        setMessage("*Internal Error");
        setUser("");
      }
    } catch (error) {
      const { response } = error;
      console.error("Error making the POST request:", response);

      if (response.status === 400) {
        if (response.data.error === "400-EMAIL")
          setMessage("*Account Already Exists with this Email ID");
        else if (response.data.error === "400-USERNAME")
          setMessage("*Username not Available");
      } else setMessage("*Internal Error");
    }

    // const output = await response.json();
    //console.log(response)
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    //console.log(formdata);
    if (
      formdata["email"] === "" ||
      formdata["password"] === "" ||
      formdata["name"] === "" ||
      formdata["confirmPassword"] !== formdata["password"] ||
      formdata["username"] === ""
    ) {
      setMessage("*Required Feilds");
      return;
    }

    try {
      await fetchData();
      // navigate("/")
    } catch (err) {
      //console.log(err);
    }
  };

  const visibilityHandler = (name) => {
    setShowPassWord((state) => {
      return {
        ...state,
        [name]: !showPassword[name],
      };
    });

    //console.log(showPassword)
  };

  const [showPassword, setShowPassWord] = useState({
    visible1: false,
    visible2: false,
  });
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    username: "",
  });

  const validateData = () => {
    if (
      formdata.password.length !== 0 &&
      formdata.confirmPassword.length !== 0 &&
      formdata.confirmPassword !== formdata.password
    )
      setMessage("*Password not Matches");

    if (formdata.password)
      if (
        formdata.password[0] === " " ||
        formdata.password.split(" ").length > 1
      )
        setMessage("*Password should not contains Spaces");
      else if (formdata.password.length < 8)
        setMessage("*Password should have minimum 8 characters");
  };

  useEffect(() => {
    validateData();
  }, [formdata]);

  const changeHandler = (event) => {
    const { value, id, type, checked, name } = event.target;
    setFormdata((state) => {
      return {
        ...state,
        [name]: type === "checkbox" ? checked : value,
      };
    });

    setMessage("");

    console.log(formdata);
  };

  return (


    <div className="flex bg-amber-500 items-center justify-center w-full h-full select-none">
      <div className=" flex w-full gap-4 justify-center h-full items-center flex-wrap">
        <div className=" text-white pt-[12vh] pb-[2vh] bg-amber-500 rounded-xl max-w-[400px] gap-2  w-full min-w-[30%] px-2 group flex flex-col items-center    transition-all duration-200 ">
          <div className="text-5xl xs:text-3xl font-poppins  text-white font-bold group-hover:scale-110  transitiom-all duration-1000 text-bold text-center">
            Sign Up
          </div>

          <div className="flex flex-col items-center w-full h-full">
            <form className="flex h-full flex-col items-center justify-center w-full space-y-3">
              <label className="w-full px-10">
                <p className="py-1 text-xl font-poppins">
                  Name<sup className="text-orange-400">*</sup>
                </p>
                <input
                  onChange={changeHandler}
                  className=" font-poppins placeholder:text-gray-500 text-black text-lg w-full px-3 py-2   shadow border-4 border-transparent focus:border-amber-500 outline-0 bg-amber-200 rounded-lg  "
                  type="text"
                  value={formdata["name"]}
                  placeholder="Name"
                  name="name"
                ></input>
              </label>
              <label className="w-full px-10">
                <p className="py-1 text-xl font-poppins">
                  Email Address<sup className="text-orange-400">*</sup>
                </p>
                <input
                  onChange={changeHandler}
                  className=" font-poppins placeholder:text-gray-500 text-black text-lg w-full px-3 py-2   shadow border-4 border-transparent focus:border-amber-500 outline-0 bg-amber-200 rounded-lg  "
                  type="email"
                  value={formdata["email"]}
                  placeholder="Email Address"
                  name="email"
                ></input>
              </label>
              <label className="w-full px-10">
                <p className="py-1 text-xl font-poppins">
                  Username<sup className="text-orange-400">*</sup>
                </p>
                <input
                  onChange={changeHandler}
                  className=" font-poppins placeholder:text-gray-500 text-black text-lg w-full px-3 py-2   shadow border-4 border-transparent focus:border-amber-500 outline-0 bg-amber-200 rounded-lg  "
                  type="text"
                  value={formdata["username"]}
                  placeholder="Username"
                  name="username"
                ></input>
              </label>
              <label className="w-full px-10">
                <p className="py-1 font-poppins text-xl">
                  Password<sup className="text-orange-400">*</sup>
                </p>
                <div className="relative">
                  <input
                    onChange={changeHandler}
                    className=" font-poppins placeholder:text-gray-500 text-black text-lg w-full px-3 py-2   shadow border-4 border-transparent focus:border-amber-500 outline-0 bg-amber-200 rounded-lg  "
                    type={showPassword["visible1"] ? "text" : "password"}
                    value={formdata["password"]}
                    placeholder="Password"
                    name="password"
                  ></input>
                  <span
                    id="visible1"
                    onClick={() => visibilityHandler("visible1")}
                    className="absolute top-4 right-5"
                  >
                    {showPassword["visible1"] ? (
                      <MdVisibilityOff />
                    ) : (
                      <MdVisibility />
                    )}
                  </span>
                </div>
              </label>
              <label className="w-full px-10">
                <p className="py-1 font-poppins text-xl">
                  Confirm Password<sup className="text-orange-400">*</sup>
                </p>
                <div className="relative">
                  <input
                    onChange={changeHandler}
                    className=" font-poppins placeholder:text-gray-500 text-black text-lg w-full px-3 py-2   shadow border-4 border-transparent focus:border-amber-500 outline-0 bg-amber-200 rounded-lg  "
                    type={showPassword["visible2"] ? "text" : "password"}
                    value={formdata["confirmPassword"]}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  ></input>
                  <span
                    id="visible2"
                    onClick={() => visibilityHandler("visible2")}
                    className="absolute top-4 right-5"
                  >
                    {showPassword["visible2"] ? (
                      <MdVisibilityOff />
                    ) : (
                      <MdVisibility />
                    )}
                  </span>
                </div>
              </label>
              <div className=" px-10 w-full">
                <label htmlFor="remId" className="w-full relative flex">
                  <input
                    onChange={changeHandler}
                    id="remId"
                    type="checkbox"
                    value={formdata["rememberMe"]}
                    className="absolute bottom-[0.2rem] hidden"
                    name="rememberMe"
                  />
                  <div className="flex space-x-1 text-xl cursor-pointer justify-center items-center ">
                    {formdata["rememberMe"] ? (
                      <IoMdCheckboxOutline />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank />
                    )}
                    <p>Remember Me</p>
                  </div>
                </label>
                <span className=" italic-text mb-10 text-pink-500">
                  {message}
                </span>
              </div>
              <button
                onClick={loginHandler}
                className="loginButton px-5 py-2 flex items-center font-poppins text-xl rounded-xl hover:scale-110 transition-all"
              >
                SignUp <CiLogin />
              </button>
            </form>
          </div>
        </div>

        <div className="text-white  px-4 font-bold flex-grow items-center justify-center bg-indigo-500 h-full group flex flex-col transition-all duration-200 ">
          <div className="flex flex-col ">
            <p className="text-5xl xs:text-4xl font-roboto-slab leading-relaxed">
              Welcome to <br />{" "}
              <span className="text-7xl transition-all xs:text-5xl duration-300 font-poppins text-lime-200 group-hover:text-amber-300">
                <ReactTyped
                  strings={["CollaboHub!"]}
                  showCursor={true}
                  typeSpeed={300}
                  backSpeed={50}
                  loop
                />
              </span>
            </p>
            <br />
            <p className="text-3xl xs:text-xl text-pretty max-w-[800px] min-w-0 font-exo leading-13 text-gray-200">
              Collaborate, Innovate, let your talents combine, Hit signup now,
              where your brilliance will shine!
            </p>
          </div>

          <div className="flex items-center justify-center m-4 ">
            <button
              onClick={() => setLogin(true)}
              className="flex  group  hover:scale-105   border-slate-200 transition-all duration-300 font-roboto-slab text-xl items-center justify-center rounded-e-3xl rounded-t-3xl p-4 space-x-2 border "
            >
              <p>Login</p>
              <FaArrowRight className="animate-pulse group-hover:scale-105 group-hover:border-indigo-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
