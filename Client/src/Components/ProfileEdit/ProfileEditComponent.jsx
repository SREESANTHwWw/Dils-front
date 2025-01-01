import React, { useState, useEffect } from 'react';
import { IoArrowForwardOutline } from "react-icons/io5";
import { AiFillShop } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiPhoneCall } from "react-icons/pi";
import { FaRegAddressBook } from "react-icons/fa";
import { PiCity } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../Server';
import { toast } from 'react-toastify';

const ProfileEditComponent = () => {
    const [shopname, setShopname] = useState("");
    const [owner, setOwnername] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [gstno, setGstNumber] = useState("");
    const [stateid, setState] = useState("");
    const navigate = useNavigate();

    // Fetch user data from localStorage when component mounts
    useEffect(() => {
        const localStoredata = localStorage.getItem("currentUser");
        const userData = localStoredata ? JSON.parse(localStoredata) : null;

        if (userData) {
            // Set initial state with the current user data
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

    const toprofile = () => {
        navigate('/profile');
    };

    const localdata = localStorage.getItem("user_id");
    const id = localdata ? JSON.parse(localdata) : [];

    const handleEdit = (event) => {
        event.preventDefault(); // Prevent default form submission
        axios.patch(`${server}/edit-user/${id}`, {
            shopname,
            owner,
            phonenumber,
            address,
            city,
            pincode,
            gstno,
            stateid
        }).then((res) => {
            toast.success("Save changes")
           
            console.log(res);
            
            localStorage.setItem("currentUser", JSON.stringify(res.data.edituser))
            navigate("/profile")

        }).catch((err)=>{
            toast.error("invalid credentials")
        })
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4 bg-gray-50 py-6">
            <div className="sm:w-[60rem] w-full max-w-7xl bg-white rounded-3xl sm:h-full h-screen shadow-xl px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={toprofile}>
                        <FiArrowLeftCircle className="text-3xl text-yellow-500 hover:text-blue-950" />
                    </button>
                    <div className="text-center flex flex-col">
                        <span className="text-3xl font-bold text-blue-950">Edit Profile</span>
                        <span className="text-lg text-gray-500 mt-2">Edit Your Profile</span>
                    </div>
                    <div className="w-8"></div>
                </div>

                <form onSubmit={handleEdit} className="grid md:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 gap-8">
                    <div className="space-y-6">
                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="Shop Name"
                                value={shopname}
                                onChange={(e) => setShopname(e.target.value)}
                            />
                            <AiFillShop className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="Owner Name"
                                value={owner}
                                onChange={(e) => setOwnername(e.target.value)}
                            />
                            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="number"
                                placeholder="Phone Number"
                                value={phonenumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <PiPhoneCall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <FaRegAddressBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative">
                            <select
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-500 px-8"
                                value={stateid}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="" disabled>Select State</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                            </select>
                            <PiCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <PiCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                            <IoLocationSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="GST No. (Optional)"
                                value={gstno}
                                onChange={(e) => setGstNumber(e.target.value)}
                            />
                            <HiHashtag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>
                    </div>

                    {/* Center the Update button */}
                    <div className="flex justify-center mt-8">
                        <button 
                            type="submit" 
                            className="w-[14rem] h-[3rem] rounded-xl bg-blue-950 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                        >
                            <span className="text-lg font-semibold">Update</span>
                            <IoArrowForwardOutline className="text-white text-2xl ml-3" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileEditComponent;
