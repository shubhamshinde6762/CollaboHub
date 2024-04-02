import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
const EditProfile = ({ user, editProfile, setEditProfile }) => {
  const { data } = user;
  const [showPassword, setShowPassWord] = useState({
    visible1: false,
    visible2: false,
    visible3: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState("");
  const cancelForm = (event) => {
    setEditProfile(!editProfile);
  };
  const visibilityHandler = (name) => {
    setShowPassWord((state) => {
      return {
        ...state,
        [name]: !showPassword[name],
      };
    });
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const fileType = file.type;
      if (
        fileType === "image/jpeg" ||
        fileType === "image/png" ||
        fileType === "image/jpg"
      ) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const profileImage = document.getElementById("profileImage");
          profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a JPG or PNG file.");
      }
    }
    setShowConfirmation(true);
  };
  const confirmImage = () => {
    setShowConfirmation(false);
  };
  const cancelImage = () => {
    setSelectedFile(null);
    setShowConfirmation(false);
    const profileImage = document.getElementById("profileImage");
    if (profileImage) {
      profileImage.src = data.profilePhoto;
    }
  };
  const [editData, setEditdata] = useState({
    username: data.username,
    email: data.email,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePhoto: "",
  });
  const editHandler = async (event) => {
    event.preventDefault();

    if (
      editData["oldPassword"] === "" ||
      editData["newPassword"] === "" ||
      editData["confirmPassword"] === ""
    ) {
      setMessage("*Required fields");
    } else if (editData["newPassword"] !== editData["confirmPassword"]) {
      setMessage("Passwords do not match");
    } else {
      try {
        const formData = new FormData();
        formData.append("userId", data._id);
        formData.append("username", editData.username);
        formData.append("email", editData.email);
        formData.append("oldPassword", editData.oldPassword);
        formData.append("password", editData.newPassword);
        formData.append("confirmPassword", editData.confirmPassword);
        if (selectedFile) {
          formData.append("file", selectedFile);
        }

        let response = null;
        toast.promise(
          axios
            .post(
              "https://collabo-hub-ten.vercel.app/api/v1/updateUser",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              response = res;
              console.log("Image uploaded successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error uploading image:", error);
            }),
          {
            loading: "Sending Media...",
            success: () => {
              localStorage.setItem("token", response.data.data.token);
              console.log(response);
              return <b>Media Sent!</b>;
            },
            error: (error) => {
              console.error(error);
              return <b>Error while Sending.</b>;
            },
          }
        );

        console.log("Image uploaded successfully:", response.data);
      } catch (err) {
        console.log("Not done", err);
      }
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setEditdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(editData);
  };
  const validateData = () => {
    if (editData && editData.newPassword && editData.confirmPassword) {
      if (
        editData.newPassword.length !== 0 &&
        editData.confirmPassword.length !== 0
      ) {
        if (editData.confirmPassword !== editData.newPassword) {
          setMessage("*Passwords do not match");
        } else if (editData.newPassword.trim() !== editData.newPassword) {
          setMessage("*Password should not start or end with spaces");
        } else if (editData.newPassword.length < 8) {
          setMessage("*Password should have a minimum of 8 characters");
        } else {
          setMessage(""); // Clear the message if all validations pass
        }
      }
    }
  };

  useEffect(() => {
    validateData();
  }, [editData]);

  return (
    <div className="absolute h-screen w-screen top-0 left-0 overflow-x-hidden flex justify-center items-center">
      <div
        style={{ animation: "dropTop 0.8s " }}
        className="flex z-50 relative min-w-32 mx-2  flex-col justify-center  items-center font-poppins text-black rounded-xl bg-white p-2 select-none shadow-gray-300 shadow-lg transition-all duration-1000"
      >
        <div onClick={cancelForm}>
          <ImCross className="absolute -right-2 -top-2 bg-red-600 p-2 scale-125 text-3xl transition-all duration-200 rounded-full hover:scale-150 text-white" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-3 m-3">
          <div className="relative">
            <img
              width="500px"
              id="profileImage"
              src={data.profilePhoto}
              className="min-w-8 max-w-64 aspect-square rounded-full"
            />
            <label htmlFor="fileInput">
              <MdEdit className="absolute right-8 bg-black text-white rounded-full p-1 text-2xl top-56 scale-150" />
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
            {showConfirmation && (
              <div className="flex gap-x-2 mt-3 justify-center">
                <button
                  className="px-4 py-2 hover:scale-110 transition-all duration-300 outline-slate-950 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={confirmImage}
                >
                  Confirm
                </button>
                <button
                  className="px-4 py-2 hover:scale-110 transition-all duration-300 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={cancelImage}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div>
            <form className="flex relative flex-col gap-y-4 my-3 justify-center text-lg  outline-none font-poppins max-w-60 ">
              <label className="w-full">
                <span>UserName</span>
                <input
                  type="text"
                  onChange={changeHandler}
                  placeholder=""
                  value={editData["username"]}
                  name="username"
                  className="border rounded-md py-1 px-2 min-w-0 max-w-full shadow shadow-gray-400"
                />
              </label>
              <label>
                <span className="mt-3">Email</span>
                <input
                  type="email"
                  placeholder=""
                  value={editData["email"]}
                  name="email"
                  className="border bg-gray-300 select-none rounded-md py-1 px-2 min-w-0 max-w-full"
                />
              </label>

              <label className="relative">
                <span>Old Password</span>
                <input
                  type={showPassword["visible1"] ? "text" : "password"}
                  onChange={changeHandler}
                  placeholder=""
                  value={editData["oldPassword"]}
                  name="oldPassword"
                  className="border rounded-md py-1 px-2 outline-non min-w-0 max-w-full shadow shadow-gray-400"
                />

                <span
                  id="visible1"
                  onClick={() => visibilityHandler("visible1")}
                  className="absolute right-5 top-10"
                >
                  {showPassword["visible1"] ? (
                    <MdVisibilityOff />
                  ) : (
                    <MdVisibility />
                  )}
                </span>
              </label>

              <label className="relative">
                <span className="relative">New Password</span>
                <input
                  type={showPassword["visible2"] ? "text" : "password"}
                  onChange={changeHandler}
                  placeholder=""
                  value={editData["newPassword"]}
                  name="newPassword"
                  className="border rounded-md py-1 px-2 outline-none min-w-0 max-w-full shadow shadow-gray-400"
                />

                <span
                  id="visible1"
                  onClick={() => visibilityHandler("visible2")}
                  className="absolute right-5 top-10 min-w-0 max-w-full"
                >
                  {showPassword["visible2"] ? (
                    <MdVisibilityOff />
                  ) : (
                    <MdVisibility />
                  )}
                </span>
              </label>

              <label className="relative">
                <span className="relative">Confirm Password</span>
                <input
                  type={showPassword["visible3"] ? "text" : "password"}
                  onChange={changeHandler}
                  placeholder=""
                  value={editData["confirmPassword"]}
                  name="confirmPassword"
                  className="border rounded-md py-1 px-2 outline-none min-w-0 max-w-full shadow shadow-gray-400"
                />

                <span
                  id="visible1"
                  onClick={() => visibilityHandler("visible3")}
                  className="absolute right-5 top-10 min-w-0 max-w-full"
                >
                  {showPassword["visible3"] ? (
                    <MdVisibilityOff />
                  ) : (
                    <MdVisibility />
                  )}
                </span>
              </label>
            </form>
          </div>
        </div>
        <span className=" italic-text rounded-md text-pink-500  px-2">
          {message}
        </span>
        <div
          onClick={editHandler}
          className="w-fit my-2 py-1 px-2 rounded-xl loginButton"
        >
          Confirm
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
