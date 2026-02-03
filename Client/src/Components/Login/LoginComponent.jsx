import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdPermContactCalendar } from "react-icons/md";
import axios from "axios";
import { server } from "../../Server";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { ProductsContext } from "../Context/ProductsContext";
import Navbar from "../../Pages/Navbar";

const LoginComponent = () => {
  const { setCurrentUser, loginUsguest } = useContext(AuthContext);
  const { cartdata } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [pass, setPasswod] = useState("");

  const handleGuest = () => {
    if (loginUsguest) {
      toast.success("Guest Mode Enabled", { theme: "colored" });
    }
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${server}/login-user`, { username: name, password: pass })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user_id", JSON.stringify(res.data.user.id));
        setCurrentUser(res.data.user);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        toast.success("Welcome back!");
        cartdata();
        window.location.reload();
      })
      .catch(() => {
        toast.error("Invalid credentials");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col relative overflow-hidden">
    
     

      {/* Background Orbs - Lower Z-index to stay behind everything */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50 z-0" />

      {/* Main Content Area: flex-grow ensures it fills space, pt-20 accounts for Navbar */}
      <div className="flex-grow flex items-center justify-center p-4   z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden"
        >
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block p-3 bg-blue-50 rounded-2xl text-blue-600 mb-4"
              >
                <RiLock2Fill size={28} />
              </motion.div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-slate-500 mt-2 font-medium">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Input */}
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <FaRegUser size={18} />
                </div>
                <input
                  required
                  className="w-full h-14 pl-14 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 font-medium text-slate-700"
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <RiLock2Fill size={20} />
                </div>
                <input
                  required
                  className="w-full h-14 pl-14 pr-12 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all duration-300 font-medium text-slate-700"
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPasswod(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-2"
                >
                  {visible ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#1e1b4b" }} // text-blue-950 deepens
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-14 bg-blue-950 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-900/10 transition-all"
                  type="submit"
                >
                  Sign In <IoArrowForwardOutline size={20} />
                </motion.button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Or</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGuest}
                  type="button"
                  className="w-full h-14 bg-white text-yellow-600 border-2 border-yellow-500/20 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-50 transition-all"
                >
                  <MdPermContactCalendar size={20} /> Continue as Guest
                </motion.button>
              </div>

              <div className="text-center mt-8">
                <p className="text-slate-500 font-medium">
                  New here?{" "}
                  <Link to="/signup" className="text-blue-600 font-extrabold hover:text-blue-700 transition-colors">
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col justify-center items-center bg-white/60 backdrop-blur-xl"
          >
            <div className="relative">
              <div className="w-20 h-20 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
              </div>
            </div>
            <p className="mt-6 text-slate-900 font-bold tracking-tight text-lg">Securing your session...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginComponent;