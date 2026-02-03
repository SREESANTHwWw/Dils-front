import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../../Server';
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2, FiMapPin, FiPhone, FiPlus } from "react-icons/fi"; 
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';

export const Useraddress = () => {
  const localdata = localStorage.getItem('user_id');
  const userId = localdata ? JSON.parse(localdata) : null;
  const [address, setAddress] = useState([]);
  const [editAddressOpen, setEditAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form States
  const [fullname, setFullname] = useState("");
  const [Pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [state, setState] = useState("");
  const [addressId, setAddressid] = useState("");

  const fetchAddress = () => {
    axios.get(`${server}/getAddress/${userId}`).then((res) => {
      setAddress(res.data);
    });
  };

  const openEditModal = (ad) => {
    setAddressid(ad._id);
    setFullname(ad.fullname);
    setPhonenumber(ad.phonenumber);
    setLandmark(ad.landmark);
    setPincode(ad.Pincode);
    setCity(ad.city);
    setState(ad.state);
    setEditAddress(true);
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.patch(`${server}/editAddress/${addressId}`, {
      fullname, Pincode, city, phonenumber, landmark, state,
    }).then((res) => {
      const editedAddress = res.data.editedAddress;
      setAddress((prev) =>
        prev.map((unit) => (unit._id === editedAddress._id ? editedAddress : unit))
      );
      setEditAddress(false);
      toast.success("Address updated!");
    }).finally(() => setLoading(false));
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      axios.delete(`${server}/delete-address/${userId}/${id}`)
        .then(() => {
          toast.success("Address deleted successfully!");
          setAddress((prev) => prev.filter((ad) => ad._id !== id));
        })
        .catch(() => toast.error("Failed to delete address."));
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [userId]);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Your Addresses</h2>
            <p className="text-slate-500 text-sm">Manage your shipping and billing locations</p>
          </div>
        </header>

        {address.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {address.map((e, index) => (
                <motion.div
                  key={e._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                      <FiMapPin size={20} />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(e)}
                        className="p-2 bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteAddress(e._id)}
                        className="p-2 bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-1">{e.fullname}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4 font-medium">
                    <FiPhone size={14} /> {e.phonenumber}
                  </div>

                  <div className="space-y-1 text-slate-600 text-sm leading-relaxed">
                    <p>{e.landmark}</p>
                    <p>{e.city}, {e.state} - <span className="font-bold text-slate-900">{e.Pincode}</span></p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-12 text-center border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <FiMapPin size={40} />
            </div>
            <h2 className="text-xl text-slate-900 font-bold">No saved addresses!</h2>
            <p className="text-slate-500 mt-2">Add a new address during checkout to see it here.</p>
          </div>
        )}
      </div>

      {/* Edit Address Modal */}
      <AnimatePresence>
        {editAddressOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setEditAddress(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Edit Address</h2>
                  <button onClick={() => setEditAddress(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <IoClose size={24} className="text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleUpdateAddress} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={fullname} 
                        onChange={(e)=>setFullname(e.target.value)}
                        className="w-full h-14 px-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                      <input 
                        type="number" 
                        value={phonenumber} 
                        onChange={(e)=>setPhonenumber(e.target.value)}
                        className="w-full h-14 px-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Pincode</label>
                      <input 
                        type="number" 
                        value={Pincode} 
                        onChange={(e)=>setPincode(e.target.value)}
                        className="w-full h-14 px-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Landmark</label>
                      <input 
                        type="text" 
                        value={landmark} 
                        onChange={(e)=>setLandmark(e.target.value)}
                        className="w-full h-14 px-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">City</label>
                      <input 
                        type="text" 
                        value={city} 
                        onChange={(e)=>setCity(e.target.value)}
                        className="w-full h-14 px-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">State</label>
                      <select 
                        value={state} 
                        onChange={(e)=>setState(e.target.value)}
                        className="w-full h-14 px-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700 appearance-none"
                      >
                        <option value="kerala">Kerala</option>
                        <option value="tamilnadu">Tamil Nadu</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button 
                      type="button" 
                      onClick={() => setEditAddress(false)}
                      className="flex-1 h-14 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 h-14 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Update Address"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};