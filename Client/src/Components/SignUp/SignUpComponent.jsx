import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowForwardOutline } from "react-icons/io5";
import { RiLock2Fill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillShop } from "react-icons/ai";
import { FaRegUser, FaRegAddressBook, FaUpload } from "react-icons/fa";
import { PiPhoneCall, PiCity } from "react-icons/pi";
import { BsWhatsapp } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../Server";
import Navbar from "../../Pages/Navbar";

const SignUpComponent = () => {
  const navigate = useNavigate();

  // Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [shopPhoto, setShopPhoto] = useState(null);
  const [shopname, setShopname] = useState("");
  const [owner, setOwnername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [whatsappno, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstno, setGstNumber] = useState("");
  const [stateid, setStateCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      const res = await axios.post(`${server}/registration`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.msg === "success") {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 font-medium text-slate-700 text-sm";
  const iconStyle = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600";

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col relative overflow-hidden">
    

      {/* Background Decor */}
      <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 z-0" />
      <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-40 z-0" />

      <div className="flex-grow flex items-center justify-center mt-2 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[900px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h1>
              <p className="text-slate-500 mt-2 font-medium">Join our marketplace today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Shop Details */}
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-blue-600"></span> Shop Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="relative group">
                    <AiFillShop className={iconStyle} size={20} />
                    <input type="text" placeholder="Shop Name" value={shopname} onChange={(e) => setShopname(e.target.value)} required className={inputStyle} />
                  </div>
                  <div className="relative group">
                    <FaRegUser className={iconStyle} size={18} />
                    <input type="text" placeholder="Owner Name" value={owner} onChange={(e) => setOwnername(e.target.value)} required className={inputStyle} />
                  </div>
                  <div className="relative group">
                    <HiHashtag className={iconStyle} size={20} />
                    <input type="text" placeholder="GST Number (Optional)" value={gstno} onChange={(e) => setGstNumber(e.target.value)} className={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Section 2: Contact & Location */}
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-yellow-600 mb-6 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-yellow-600"></span> Contact & Location
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="relative group">
                    <PiPhoneCall className={iconStyle} size={20} />
                    <input type="number" placeholder="Phone Number" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} required className={inputStyle} />
                  </div>
                  <div className="relative group">
                    <BsWhatsapp className={iconStyle} size={18} />
                    <input type="number" placeholder="WhatsApp Number" value={whatsappno} onChange={(e) => setWhatsapp(e.target.value)} required className={inputStyle} />
                  </div>
                  <div className="relative group lg:col-span-1">
                    <FaRegAddressBook className={iconStyle} size={18} />
                    <input type="text" placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} required className={inputStyle} />
                  </div>
                  <div className="relative group">
                    <PiCity className={iconStyle} size={20} />
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required className={inputStyle} />
                  </div>
                  <div className="relative group">
                    <IoLocationSharp className={iconStyle} size={20} />
                    <input type="text" placeholder="State" value={stateid} onChange={(e) => setStateCity(e.target.value)} required className={inputStyle} />
                  </div>
                  <div className="relative group">
                    <HiHashtag className={iconStyle} size={20} />
                    <input type="number" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required className={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Section 3: Credentials & Upload */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4 border-t border-slate-50">
                <div className="space-y-5">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-slate-900"></span> Login Credentials
                  </h2>
                  <div className="relative group">
                    <FaRegUser className={iconStyle} size={18} />
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className={inputStyle} />
                  </div>
                  <div className="relative group">
                    <RiLock2Fill className={iconStyle} size={20} />
                    <input type={visible ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputStyle} />
                    <button type="button" onClick={() => setVisible(!visible)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 p-2">
                      {visible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-slate-900"></span> Shop Verification
                  </h2>
                  <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all overflow-hidden group">
                    {shopPhoto ? (
                      <img src={URL.createObjectURL(shopPhoto)} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-slate-400 group-hover:text-blue-500">
                        <FaUpload size={24} className="mb-2" />
                        <span className="text-xs font-bold uppercase tracking-wider">Upload Shop Photo</span>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setShopPhoto(e.target.files[0])} required />
                  </label>
                </div>
              </div>

              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-blue-950 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-900/10 hover:bg-blue-900 transition-all disabled:opacity-70"
                >
                  {loading ? "Creating Account..." : "Complete Registration"} 
                  {!loading && <IoArrowForwardOutline size={20} />}
                </motion.button>
                <p className="text-center text-slate-500 mt-6 font-medium text-sm">
                  Already have an account? <Link to="/login" className="text-blue-600 font-extrabold hover:underline">Sign In</Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex flex-col justify-center items-center bg-white/60 backdrop-blur-xl">
            <div className="w-20 h-20 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-6 text-slate-900 font-bold tracking-tight text-lg">Setting up your shop...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpComponent;