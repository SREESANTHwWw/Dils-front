import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { IoArrowForwardOutline } from "react-icons/io5";
import { AiFillShop } from "react-icons/ai";
import { FaRegUser, FaRegAddressBook } from "react-icons/fa";
import { PiPhoneCall, PiCity } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../Server';
import { toast } from 'react-toastify';
import Navbar from '../../Pages/Navbar';

const ProfileEditComponent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form States
    const [shopname, setShopname] = useState("");
    const [owner, setOwnername] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [gstno, setGstNumber] = useState("");
    const [stateid, setState] = useState("");

    useEffect(() => {
        const localStoredata = localStorage.getItem("currentUser");
        const userData = localStoredata ? JSON.parse(localStoredata) : null;

        if (userData) {
            setShopname(userData.shopname || "");
            setOwnername(userData.owner || "");
            setPhoneNumber(userData.phonenumber || "");
            setAddress(userData.address || "");
            setCity(userData.city || "");
            setPincode(userData.pincode || "");
            setGstNumber(userData.gstno || "");
            setState(userData.stateid || "");
        }
    }, []);

    const handleEdit = (event) => {
        event.preventDefault();
        setLoading(true);
        const localdata = localStorage.getItem("user_id");
        const id = localdata ? JSON.parse(localdata) : null;

        axios.patch(`${server}/edit-user/${id}`, {
            shopname, owner, phonenumber, address, city, pincode, gstno, stateid
        }).then((res) => {
            toast.success("Profile updated successfully!");
            localStorage.setItem("currentUser", JSON.stringify(res.data.edituser));
            navigate("/profile");
        }).catch(() => {
            toast.error("Failed to update profile");
        }).finally(() => setLoading(false));
    };

    const inputWrapper = "relative group";
    const inputStyle = "w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 font-medium text-slate-700 text-sm";
    const iconStyle = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors";

    return (
        <div className="min-h-screen w-full  bg-slate-50 flex flex-col relative overflow-hidden">
           

            {/* Background Orbs */}
            <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 z-0" />
            <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-40 z-0" />

            <div className="flex-grow flex items-center justify-center  z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden"
                >
                    <div className="p-8 md:p-12">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-10">
                            <button 
                                onClick={() => navigate('/profile')}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-blue-600"
                            >
                                <FiArrowLeftCircle size={32} />
                            </button>
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
                                <p className="text-slate-500 mt-1 font-medium text-sm">Update your business profile</p>
                            </div>
                            <div className="w-10"></div>
                        </div>

                        <form onSubmit={handleEdit} className="space-y-10">
                            {/* Business Info Section */}
                            <div>
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-blue-600"></span> Business Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className={inputWrapper}>
                                        <AiFillShop className={iconStyle} size={20} />
                                        <input type="text" placeholder="Shop Name" value={shopname} onChange={(e) => setShopname(e.target.value)} className={inputStyle} />
                                    </div>
                                    <div className={inputWrapper}>
                                        <FaRegUser className={iconStyle} size={18} />
                                        <input type="text" placeholder="Owner Name" value={owner} onChange={(e) => setOwnername(e.target.value)} className={inputStyle} />
                                    </div>
                                    <div className={inputWrapper}>
                                        <PiPhoneCall className={iconStyle} size={20} />
                                        <input type="number" placeholder="Phone Number" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} className={inputStyle} />
                                    </div>
                                    <div className={inputWrapper}>
                                        <HiHashtag className={iconStyle} size={20} />
                                        <input type="text" placeholder="GST Number (Optional)" value={gstno} onChange={(e) => setGstNumber(e.target.value)} className={inputStyle} />
                                    </div>
                                </div>
                            </div>

                            {/* Address Section */}
                            <div>
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-yellow-600 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-yellow-600"></span> Location Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className={`${inputWrapper} md:col-span-2`}>
                                        <FaRegAddressBook className={iconStyle} size={18} />
                                        <input type="text" placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} className={inputStyle} />
                                    </div>
                                    <div className={inputWrapper}>
                                        <PiCity className={iconStyle} size={20} />
                                        <select value={stateid} onChange={(e) => setState(e.target.value)} className={inputStyle}>
                                            <option value="" disabled>Select State</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                        </select>
                                    </div>
                                    <div className={inputWrapper}>
                                        <PiCity className={iconStyle} size={20} />
                                        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className={inputStyle} />
                                    </div>
                                    <div className={inputWrapper}>
                                        <IoLocationSharp className={iconStyle} size={20} />
                                        <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className={inputStyle} />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-64 h-14 bg-blue-950 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:bg-blue-900 transition-all disabled:opacity-70"
                                >
                                    {loading ? "Saving..." : "Update Profile"}
                                    {!loading && <IoArrowForwardOutline size={20} />}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProfileEditComponent;