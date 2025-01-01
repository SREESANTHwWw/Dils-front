import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeftCircle, FiLogOut } from "react-icons/fi";
import { BiMessageSquareEdit } from "react-icons/bi";
import { AiFillShop } from "react-icons/ai";
import { FaRegUser, FaRegAddressBook } from "react-icons/fa";
import { PiPhoneCall, PiCity } from "react-icons/pi";
import { BsWhatsapp } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";
import Navbar from "./Navbar"; // Import your Navbar component
import Userorders from "../Components/Userorders/Userorders";
import { Useraddress } from "../Components/UserAddress/Useraddress";

const Profile = () => {
  const navigate = useNavigate();
  const editpage = () => navigate("/editpage");
  const navtoHome = () => navigate("/");

  const logout = () => {
    localStorage.clear();
    navigate("/");
   
    window.location.reload()
  };

  const localdata = localStorage.getItem("currentUser");
  const userData = localdata ? JSON.parse(localdata) : [];

  const [activeSection, setActiveSection] = useState("My Details");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile dropdown toggle

  const sidebarItems = [
    { label: "My Details", icon: <FaRegUser />, action: () => setActiveSection("My Details") },
    { label: "My Address Book", icon: <FaRegAddressBook />, action: () => setActiveSection("My Address Book") },
    { label: "My Orders", icon: <PiPhoneCall />, action: () => setActiveSection("My Orders") },
    { label: "Account Settings", icon: <FiLogOut />, action: () => setActiveSection("Account Settings") },
  ];

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
      <div className="flex flex-col md:flex-row flex-grow mt-32">

        {/* Sidebar */}
        <div
          className={`w-full md:w-1/4 ${isSidebarOpen ? "block" : "hidden"} md:block bg-white p-6 rounded-l-lg shadow-lg mb-6 md:mb-0`}
        >
          <h2 className="text-2xl font-semibold text-blue-950 mb-6">My Account</h2>
          <ul>
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                onClick={item.action} // Add click function
                className={`flex items-center gap-3 p-3 mb-2 rounded-md cursor-pointer hover:bg-blue-50 hover:text-blue-600 ${
                  activeSection === item.label
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {item.icon} {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 bg-white p-8 rounded-r-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-2xl text-blue-950"
            >
              ☰ {/* Hamburger icon */}
            </button>
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
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <span className="text-yellow-600 text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="text-sm text-gray-500">{item.placeholder}</h4>
                    <p className="text-lg text-blue-950 font-medium">{item.value || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Placeholder Content for Other Sections */}
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
    </div>
  );
};

export default Profile;
