import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import { RiLock2Fill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../Server";
import { ProductsContext } from "../Context/ProductsContext";

import validator from "validator";

import { AiFillShop } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiPhoneCall } from "react-icons/pi";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { PiCity } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";


// Component
const SignUpComponent = () => {

  const navigate = useNavigate();

  // Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [shopPhoto, setShopPhoto] = useState("");
  const [shopname, setShopname] = useState("");
  const [owner, setOwnername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [whatsappno, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstno, setGstNumber] = useState("");
  const [stateid, setStateCity] = useState("");
  const [validmsg, setValidmsg] = useState("");

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

  

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const formData = new FormData();
    formData.append("shopname", shopname);
    formData.append("owner", owner);
    formData.append("phonenumber", phonenumber);
    formData.append("address", address);
    formData.append("gstno", gstno);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("pincode", pincode);
    formData.append("city", city);
    formData.append("whatsappno", whatsappno);
    formData.append("stateid", stateid);
    formData.append("shopPhoto", shopPhoto);

    try {
      const res = await axios.post(`${server}/registration`, formData, config);

      if (res.data.msg === "success") {
        toast.success("Registered successfully", { theme: "colored" });
        // Reset form
        setUsername("");
        setPassword("");
        setShopPhoto("");
        setShopname("");
        setOwnername("");
        setPhoneNumber("");
        setWhatsapp("");
        setAddress("");
        setCity("");
        setPincode("");
        setGstNumber("");
        setStateCity("");
        navigate("/login");
      } else {
        toast.error(res.error || "Registration failed. Please check your input.");
      }
    } catch (error) {
      toast.error(error.response.data.msg || "An error occurred during registration.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="sm:w-[85%] sm:max-w-[800px] w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-950">Register</h1>
          <p className="text-gray-600 text-sm">Create your new account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="shopname"
                value={shopname}
                onChange={(e) => setShopname(e.target.value)}
                required
                aria-label="Username"
                className="w-full h-12 pl-10 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-blue-950"
              />
              <AiFillShop className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Ownername"
                value={owner}
                onChange={(e) => setOwnername(e.target.value)}
                required
                aria-label="Username"
                className="w-full h-12 pl-10 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-blue-950"
              />
              <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="PhoneNumber"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                aria-label="Username"
                className="w-full h-12 pl-10 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-blue-950"
              />
              <PiPhoneCall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="whatsappno"
                value={whatsappno}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
                aria-label="Username"
                className="w-full h-12 pl-10 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-blue-950"
              />
              <BsWhatsapp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                aria-label="Username"
                className="w-full h-12 pl-10 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-blue-950"
              />
              <FaRegAddressBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                aria-label="Username"
                className="w-full h-12 pl-10 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-blue-950"
              />
              <PiCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
                aria-label="Username"
                className="w-full h-12 pl-10 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-blue-950"
              />
              <IoLocationSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="GST (Optional)"
                value={gstno}
                onChange={(e) => setGstNumber(e.target.value)}
                required
                aria-label="Username"
                className="w-full h-12 pl-10 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-blue-950"
              />
              <HiHashtag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="state"
                value={stateid}
                onChange={(e) => setStateCity(e.target.value)}
                required
                aria-label="Username"
                className="w-full h-12 pl-10 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-blue-950"
              />
              <PiCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              
            </div>
          
          
           
            <div className="grid gap-4">
  {/* Username Field */}
  <div className="relative ">
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      aria-label="Username"
      className="w-full h-12 pl-10 pr-4 rounded-lg shadow-sm outline-none border border-gray-300 focus:ring-1 focus:ring-blue-950 focus:border-blue-950 transition"
    />
    <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
  </div>

  {/* Password Field */}
  <div className="relative">
    <input
      type={visible ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      aria-label="Password"
      className="w-full h-12 pl-10 pr-12 rounded-lg shadow-sm outline-none border border-gray-300 focus:ring-1 focus:ring-blue-950 focus:border-blue-950 transition"
    />
    <RiLock2Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
    {visible ? (
      <AiOutlineEye
        size={20}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500 transition"
        onClick={() => setVisible(false)}
      />
    ) : (
      <AiOutlineEyeInvisible
        size={20}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500 transition"
        onClick={() => setVisible(true)}
      />
    )}
  </div>
</div>


            {/* Shop Photo */}
            <div className="relative w-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Shop Image
  </label>
  <div className="flex  items-center justify-center">
    <label
      className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
    >
      {shopPhoto ? (
        <img
          src={URL.createObjectURL(shopPhoto)}
          alt="Shop"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="flex flex-col items-center">
          <svg
            className="w-4 h-4 text-gray-500 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V8m0 0l4-4m-4 4l-4-4M3 8v12a2 2 0 002 2h14a2 2 0 002-2V8m-6 4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span className="text-sm text-gray-500">
            Click to upload or drag and drop
          </span>
        </div>
      )}
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => setShopPhoto(e.target.files[0])}
        required
      />
    </label>
  </div>
</div>


            {/* Password */}
         
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-6 bg-blue-950 text-white rounded-lg shadow-md hover:bg-blue-900 transition-colors"
          >
            Sign Up
            <IoArrowForwardOutline className="inline ml-2" />
          </button>
          {validmsg && <p className="text-red-500 mt-4">{validmsg}</p>}

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-950 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
