import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineShoppingCart, HiOutlineLocationMarker, HiOutlineCash } from "react-icons/hi";
import { IoArrowBackOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaCheck, FaTrash, FaPlus } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { server } from "../../Server";
import { ProductsContext } from "../Context/ProductsContext";

const CheckOutComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, medium, premium, product } = location.state || {};
  const { formatPrice, cartlength } = useContext(ProductsContext);

  const [address, setAddress] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [addAddress, setAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Address Form States
  const [fullname, setFullname] = useState("");
  const [Pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [state, setState] = useState("");

  const localdata = localStorage.getItem("user_id");
  const userId = localdata ? JSON.parse(localdata) : null;
  const token = localStorage.getItem("token");
  const tokedata = token ? jwtDecode(token) : null;

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const res = await axios.get(`${server}/getAll-cart/${userId}`);
        setCart(res.data.cart.items);
        setSubtotal(res.data.cart.subtotal);
      } catch (error) {
        console.error("Cart fetch failed:", error);
      }
    };

    if (price || medium || premium) {
      setSubtotal(price || medium || premium);
      setCart([product]);
    } else {
      fetchCartDetails();
    }
  }, [price, medium, premium, product, userId]);

  useEffect(() => {
    if (userId) {
      axios.get(`${server}/getAddress/${userId}`).then((res) => setAddress(res.data));
    }
  }, [userId]);

  const ordering = () => {
    if (!selectedAddress) {
      toast.warning("Please select a shipping address.", { theme: "colored" });
      return;
    }
    setLoading(true);
    
    const orderDetails = cart.map((item) => ({
      product_img: item.product_img,
      productname: item.productname,
      price: item.price,
      unitid: item.unitid,
      minimum_order_quantity: item.minimum_order_quantity,
    }));

    const userinfo = [{
      shopname: tokedata?.shopname,
      username: tokedata?.username,
      phonenumber: tokedata?.phonenumber
    }];

    axios.post(`${server}/create-order`, {
      userId,
      orderDetails,
      address: selectedAddress,
      userinfo,
      subtotal,
      paymentMethod,
    })
    .then(() => {
      toast.success("Order placed successfully!", { theme: "colored" });
      navigate("/");
    })
    .catch(() => toast.error("Failed to place order."))
    .finally(() => setLoading(false));
  };

  const handleAddress = () => {
    axios.post(`${server}/add-address`, { userId, fullname, Pincode, city, phonenumber, landmark, state })
      .then(() => {
        toast.success("Address added");
        axios.get(`${server}/getAddress/${userId}`).then((res) => setAddress(res.data));
        setAddAddress(false);
        // Clear fields
        setFullname(""); setPhonenumber(""); setCity(""); setPincode(""); setLandmark(""); setState("");
      });
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Delete this address?")) {
      axios.delete(`${server}/delete-address/${userId}/${id}`).then(() => {
        setAddress(address.filter(a => a._id !== id));
        toast.success("Address removed");
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Premium Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <IoArrowBackOutline size={24} className="text-slate-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Checkout</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Secure Checkout</p>
          </div>
          <Link to="/cart" className="relative p-2">
            <HiOutlineShoppingCart size={26} className="text-slate-600" />
            {cartlength?.length > 0 && (
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartlength.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Address & Payment */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Address Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-md font-bold text-slate-800 flex items-center gap-2">
                <HiOutlineLocationMarker className="text-blue-600" size={20} /> Shipping Address
              </h2>
              <button onClick={() => setAddAddress(true)} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1">
                <FaPlus size={10} /> Add New
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {address.length > 0 ? (
                address.map((e, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.005 }}
                    onClick={() => setSelectedAddress(e)}
                    className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedAddress?._id === e._id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{e.fullname}</span>
                          {selectedAddress?._id === e._id && <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">Selected</span>}
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{e.phonenumber}</p>
                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                          {e.landmark}, {e.city}, {e.state} - <span className="font-bold">{e.Pincode}</span>
                        </p>
                      </div>
                      <button 
                        onClick={(ev) => { ev.stopPropagation(); handleDeleteAddress(e._id); }}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-slate-400 text-sm">No saved addresses found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-6">
              <HiOutlineCash className="text-blue-600" size={20} /> Payment Method
            </h2>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <input 
                type="radio" 
                checked={paymentMethod === "Cash on Delivery"} 
                className="w-5 h-5 accent-blue-600" 
                readOnly
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Cash on Delivery</p>
                <p className="text-xs text-slate-500">Pay when you receive your order</p>
              </div>
              <HiOutlineCash size={24} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-blue-950 rounded-[2.5rem] p-8 text-white sticky top-28 shadow-xl shadow-blue-900/20">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <img src={item.product_img} className="w-14 h-14 rounded-xl object-cover bg-white/10" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{item.productname}</p>
                    <p className="text-xs text-blue-200">Qty: {item.minimum_order_quantity || 1}</p>
                  </div>
                  <p className="text-sm font-bold">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 space-y-3">
              <div className="flex justify-between text-blue-200 text-sm font-medium">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-blue-200 text-sm font-medium">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-white/10">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={ordering}
              disabled={loading}
              className="w-full mt-8 h-14 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Processing..." : "Place Order Now"}
            </motion.button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-blue-300 text-[10px] font-bold uppercase tracking-widest">
              <IoShieldCheckmarkOutline size={16} /> 100% Secure Transaction
            </div>
          </div>
        </div>
      </div>

      {/* Modern Address Modal */}
      <AnimatePresence>
        {addAddress && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setAddAddress(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Add New Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Full Name" value={fullname} onChange={(e)=>setFullname(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-none rounded-xl text-sm" />
                <input placeholder="Phone" value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-none rounded-xl text-sm" />
                <input placeholder="Pincode" value={Pincode} onChange={(e)=>setPincode(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-none rounded-xl text-sm" />
                <input placeholder="Landmark" value={landmark} onChange={(e)=>setLandmark(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-none rounded-xl text-sm" />
                <input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-none rounded-xl text-sm" />
                <select value={state} onChange={(e)=>setState(e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-500">
                  <option value="">Select State</option>
                  <option value="kerala">Kerala</option>
                  <option value="tamilnadu">Tamil Nadu</option>
                </select>
              </div>
              <div className="flex gap-4 mt-10">
                <button onClick={() => setAddAddress(false)} className="flex-1 h-12 rounded-xl font-bold text-slate-500 bg-slate-100">Cancel</button>
                <button onClick={handleAddress} className="flex-1 h-12 rounded-xl font-bold text-white bg-blue-600 shadow-lg shadow-blue-600/20">Save Address</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[200] bg-white/60 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 font-bold text-slate-800 tracking-tight">Processing Order...</p>
        </div>
      )}
    </div>
  );
};

export default CheckOutComponent;