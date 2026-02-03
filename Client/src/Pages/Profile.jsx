import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiSettings, FiShoppingBag, FiMapPin, FiUser, FiChevronRight } from "react-icons/fi";
import { BiMessageSquareEdit } from "react-icons/bi";
import { AiFillShop } from "react-icons/ai";
import { FaRegUser, FaWhatsapp, FaHashtag } from "react-icons/fa";
import { PiPhoneCall } from "react-icons/pi";
import Userorders from "../Components/Userorders/Userorders";
import { Useraddress } from "../Components/UserAddress/Useraddress";
import axios from "axios";
import { requestFcmToken } from '../FirebaseUtils';
import { server } from "../Server";


const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("My Details");
  const [token, setToken] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userData = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userId = JSON.parse(localStorage.getItem("user_id") || "null");

  useEffect(() => {
    const FetchToken = async () => {
      try {
        const fcmtoken = await requestFcmToken();
        if (fcmtoken) setToken(fcmtoken);
      } catch (error) {
        console.log("Token Error", error);
      }
    };
    FetchToken();
  }, []);

  const logout = async () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (!isConfirmed) return;

    setIsLoggingOut(true);
    try {
      // 1. Attempt to remove FCM token from backend
      if (userId && token) {
        await axios.delete(`${server}/remove-fcm-token`, { 
          data: { userId, token } 
        });
      }
    } catch (error) {
      console.error("Logout API error:", error);
      // We continue with local logout even if API fails so user isn't stuck
    } finally {
      // 2. Clear local data
      localStorage.clear();
      
      // 3. Redirect and Refresh
      navigate("/");
      window.location.reload();
    }
  };

  const menuItems = [
    { id: "My Details", label: "Profile Info", icon: <FiUser /> },
    { id: "My Address Book", label: "Address Book", icon: <FiMapPin /> },
    { id: "My Orders", label: "Order History", icon: <FiShoppingBag /> },
    { id: "Account Settings", label: "Settings", icon: <FiSettings /> },
  ];

  const detailCards = [
    { icon: <AiFillShop />, label: "Shop Name", value: userData?.shopname },
    { icon: <FaRegUser />, label: "Owner", value: userData?.owner },
    { icon: <PiPhoneCall />, label: "Contact", value: userData?.phonenumber },
    { icon: <FaWhatsapp />, label: "WhatsApp", value: userData?.whatsappno, color: "text-emerald-500" },
    { icon: <FiMapPin />, label: "Location", value: userData?.city ? `${userData.city}, ${userData.pincode}` : "Not Set" },
    { icon: <FaHashtag />, label: "GST Number", value: userData?.gstno || "Not Provided" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR --- */}
          <aside className="hidden lg:flex flex-col w-72 shrink-0 gap-2">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-4 text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-black mb-4 shadow-lg shadow-indigo-200">
                {userData?.shopname?.charAt(0) || "S"}
              </div>
              <h3 className="font-bold text-slate-800 truncate">{userData?.shopname}</h3>
              <p className="text-xs text-slate-400 font-medium">Verified Merchant</p>
            </div>

            <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 flex flex-col gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-semibold text-sm ${
                    activeSection === item.id 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                    : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </div>
                  <FiChevronRight className={activeSection === item.id ? "opacity-100" : "opacity-0"} />
                </button>
              ))}
              <hr className="my-2 border-slate-100" />
              <button 
                onClick={logout}
                disabled={isLoggingOut}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-500 font-semibold text-sm hover:bg-rose-50 transition-all disabled:opacity-50"
              >
                <FiLogOut className="text-lg" /> {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </aside>

          {/* --- MAIN CONTENT AREA --- */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-10 min-h-[500px]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeSection}</h2>
                  {activeSection === "My Details" && (
                    <button 
                      onClick={() => navigate("/editpage")}
                      className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                    >
                      <BiMessageSquareEdit size={22} />
                    </button>
                  )}
                </div>

                {activeSection === "My Details" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {detailCards.map((card, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div className={`text-2xl ${card.color || "text-indigo-600"} opacity-80`}>
                          {card.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{card.label}</p>
                          <p className="font-bold text-slate-800">{card.value || "Not Set"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSection === "My Address Book" && <Useraddress />}
                {activeSection === "My Orders" && <Userorders />}
                
                {activeSection === "Account Settings" && (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-2">Profile Security</h4>
                      <p className="text-sm text-slate-500 mb-4">Update your shop credentials or modify account ownership details.</p>
                      <button 
                        onClick={() => navigate("/editpage")}
                        className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-all"
                      >
                        Modify Profile
                      </button>
                    </div>
                    <button 
                      onClick={logout}
                      disabled={isLoggingOut}
                      className="lg:hidden w-full py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold flex items-center justify-center gap-2"
                    >
                      <FiLogOut /> {isLoggingOut ? "Logging out..." : "Logout Account"}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* --- MOBILE NAV --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex justify-around items-center py-3 z-50">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeSection === item.id ? "text-indigo-600 scale-110" : "text-slate-400"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase">{item.id.split(' ')[1] || "Info"}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Profile;