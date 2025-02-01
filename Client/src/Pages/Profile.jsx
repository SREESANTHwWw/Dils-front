import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BiMessageSquareEdit } from "react-icons/bi";
import { AiFillShop, AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser, FaRegAddressBook, FaRegUserCircle } from "react-icons/fa";
import { PiPhoneCall, PiCity } from "react-icons/pi";
import { BsWhatsapp, BsCheckCircle } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";
import Navbar from "./Navbar"; // Import your Navbar component
import Userorders from "../Components/Userorders/Userorders";
import { Useraddress } from "../Components/UserAddress/Useraddress";
import axios from "axios";
import { requestFcmToken,  } from '../FirebaseUtils';
const Profile = () => {
  const navigate = useNavigate();
  const localdata = localStorage.getItem("currentUser");
  const userData = localdata ? JSON.parse(localdata) : [];
  const localdataStore = localStorage.getItem("user_id");
const userId = localdataStore ? JSON.parse(localdataStore) : [];
  const [token, setToken] = useState("");

  useEffect(() => {
   const FetchToken = async()=>{
    try {
      const fcmtoken = await requestFcmToken()
      if(fcmtoken){
        setToken(fcmtoken)
      }
    } catch (error) {
      console.log( "geting Token Error", error)
    }
 
   }
   FetchToken()
  }, []);
  const editpage = () => navigate("/editpage");

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
    axios.delete(`${server}/remove-fcm-token`,{
      userId,
      token
      
    }).then((res)=>{console.log("deleted") ,res }    )

  };

  

  const [activeSection, setActiveSection] = useState("My Details");

  const signupvalues = [
    { icon: <AiFillShop />, placeholder: "Shop Name", value: userData?.shopname || "" },
    { icon: <FaRegUser />, placeholder: "Owner Name", value: userData?.owner || "" },
    { icon: <PiPhoneCall />, placeholder: "Phone Number", value: userData?.phonenumber || "" },
    { icon: <BsWhatsapp />, placeholder: "WhatsApp", value: userData?.whatsappno || "" },
    { icon: <FaRegAddressBook />, placeholder: "Address", value: userData?.address || "" },
    { icon: <PiCity />, placeholder: "City", value: userData?.city || "" },
    { icon: <IoLocationSharp />, placeholder: "Pincode", value: userData?.pincode || "" },
    { icon: <HiHashtag />, placeholder: "GST No. (Optional)", value: userData?.gstno || "" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex-grow mt-32">
        {/* Main Content */}
        <div className="w-full bg-white p-8 rounded-lg ">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-950">{activeSection}</h2>
            <button
              onClick={logout}
              className={` ${userData.length < 1 ? "hidden" : ""} flex items-center text-sm text-red-600 hover:text-red-700 transition-all duration-300`}
            >
              <FiLogOut className="mr-2 text-lg" />
              Logout
            </button>
          </div>

          {/* Dynamic Content */}
          {activeSection === "My Details" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {signupvalues.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg ">
                  <span className="text-yellow-600 text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="text-sm text-gray-500">{item.placeholder}</h4>
                    <p className="text-lg text-blue-950 font-medium">{item.value || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "My Address Book" && (
            <div>
              <Useraddress />
            </div>
          )}
          {activeSection === "My Orders" && (
            <div>
              <Userorders />
            </div>
          )}

          {activeSection === "Account Settings" && (
            <div>
              <button
                onClick={editpage}
                className="flex items-center gap-2 px-6 py-2 bg-blue-950 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
              >
                Edit Profile
                <BiMessageSquareEdit className="text-lg" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-blue-950 flex justify-around items-center py-3 shadow-md">
        <button
          onClick={() => setActiveSection("My Details")}
          className={`flex flex-col items-center ${
            activeSection === "My Details" ? "text-yellow-400" : "text-white"
          } hover:text-yellow-500 transition-all duration-200`}
        >
          <FaRegUserCircle className="text-2xl" />
          <span className="text-sm">Details</span>
        </button>
        <button
          onClick={() => setActiveSection("My Address Book")}
          className={`flex flex-col items-center ${
            activeSection === "My Address Book" ? "text-yellow-400" : "text-white"
          } hover:text-yellow-500 transition-all duration-200`}
        >
          <FaRegAddressBook className="text-2xl" />
          <span className="text-sm">Address</span>
        </button>
        <button
          onClick={() => setActiveSection("My Orders")}
          className={`flex flex-col items-center ${
            activeSection === "My Orders" ? "text-yellow-400" : "text-white"
          } hover:text-yellow-500 transition-all duration-200`}
        >
          <AiOutlineShoppingCart className="text-2xl" />
          <span className="text-sm">Orders</span>
        </button>
        <button
          onClick={() => setActiveSection("Account Settings")}
          className={`flex flex-col items-center ${
            activeSection === "Account Settings" ? "text-yellow-400" : "text-white"
          } hover:text-yellow-500 transition-all duration-200`}
        >
          <FiLogOut className="text-2xl" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
