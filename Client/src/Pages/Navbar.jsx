import React, { useState, useContext, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoSearch, IoClose } from "react-icons/io5";
import { TbHome } from "react-icons/tb";
import { TiThMenu } from "react-icons/ti";
import { ProductsContext } from "../Components/Context/ProductsContext";
import { CategoryContext } from "../Components/Context/CategoryContext";
import { AuthContext } from "../Components/Context/AuthContext";

const Navbar = () => {
  const { cartlength, product } = useContext(ProductsContext);
  const { category } = useContext(CategoryContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchProduct, setFilterData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Helper to go home and reset UI states
  const goHome = () => {
    setMenuOpen(false);
    setSearchData("");
    setMobileSearchOpen(false);
    navigate("/");
  };

  // Scroll logic for sticky effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync Search Filtering
  useEffect(() => {
    let filtered = product || [];
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.categoryProduct === selectedCategory);
    }
    if (searchData) {
      filtered = filtered.filter((item) =>
        item.productname.toLowerCase().includes(searchData.toLowerCase())
      );
    }
    setFilterData(filtered);
  }, [selectedCategory, searchData, product]);

  // UI helpers for route changes
  useEffect(() => {
    setMenuOpen(false);
    setMobileSearchOpen(false);
    setSearchData("");
  }, [location]);

  return (
    <>
      <nav className={`fixed top-0 w-full  z-[100] transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white py-4"
      }`}>
        {/* Top Header / Announcement */}
        {!isScrolled && (
          <div className="hidden md:flex h-8 bg-slate-900 text-white justify-center items-center text-[10px] uppercase tracking-[0.2em] font-bold">
            Standard Delivery: 2-4 Business Days • New Season Drops Live
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* 1. Mobile Menu Trigger */}
          <button 
            className="md:hidden p-2 text-slate-800"
            onClick={() => setMenuOpen(true)}
          >
            <TiThMenu size={28} />
          </button>

          {/* 2. Brand Identity (Home Button) */}
          <button 
            onClick={goHome} 
            className="flex-shrink-0 transition-transform active:scale-95 cursor-pointer"
          >
            <img src="/logodils.png" alt="Logo" className="h-10 md:h-14 w-auto object-contain" />
          </button>

          {/* 3. Search Bar - Desktop Only */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 bg-slate-100 rounded-2xl border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all overflow-hidden">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent pl-4 pr-2 py-3 text-xs font-bold text-slate-500 outline-none border-r border-slate-200 cursor-pointer"
            >
              <option value="">All</option>
              {category?.filter(i => !i.hasSubcategory).map((item) => (
                <option key={item._id} value={item._id}>{item.Category_name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <div className="px-4 flex items-center text-slate-400">
              <IoSearch size={20} />
            </div>
          </div>

          {/* 4. Action Icons */}
          <div className="flex items-center gap-1 sm:gap-4">
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileSearchOpen(true)}
            >
              <IoSearch size={24} />
            </button>

            {/* Desktop Explicit Home Button */}
            <button 
              onClick={goHome}
              className="hidden sm:flex p-2 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <TbHome size={26} />
            </button>

            <Link to="/profile" className="hidden sm:flex p-2 text-slate-600 hover:text-blue-600 transition-colors">
              <CgProfile size={26} />
            </Link>

            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
              <HiOutlineShoppingCart size={26} />
              <AnimatePresence>
                {cartlength?.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white"
                  >
                    {cartlength.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {!currentUser && (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-600 transition-all text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
      {/* --- MOBILE SEARCH OVERLAY --- */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[150] p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-1 flex items-center bg-slate-100 rounded-xl px-4 py-2">
                <IoSearch className="text-slate-400" size={20} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-base"
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />
              </div>
              <button 
                onClick={() => { setMobileSearchOpen(false); setSearchData(""); }}
                className="p-3 bg-slate-100 rounded-xl text-slate-600"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Live Search Results */}
            <div className="flex-1 overflow-y-auto">
              {searchData.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Results ({searchProduct.length})</p>
                  {searchProduct.map((item) => (
                    <div 
                      key={item._id} 
                      onClick={() => {
                        navigate(`/product/${item._id}`);
                        setMobileSearchOpen(false);
                      }}
                      className="flex items-center gap-4 p-2 active:bg-slate-50 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-12 bg-slate-100 rounded-md overflow-hidden">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 text-sm">{item.productname}</h4>
                        <p className="text-blue-600 font-bold text-xs">${item.price}</p>
                      </div>
                    </div>
                  ))}
                  {searchProduct.length === 0 && (
                    <div className="text-center py-10 text-slate-400">
                      No products found for "{searchData}"
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20">
                  <IoSearch size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-500">Search for your favorite items</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- RESPONSIVE MOBILE MENU --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-[120] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <button onClick={goHome} className="cursor-pointer">
                  <img src="/logodils.png" alt="" className="h-8" />
                </button>
                <button onClick={() => setMenuOpen(false)} className="p-2 bg-slate-100 rounded-full cursor-pointer"><IoClose size={20}/></button>
              </div>
              <div className="space-y-6 text-lg font-bold text-slate-800">
                <button onClick={goHome} className="flex items-center gap-4 w-full text-left cursor-pointer"><TbHome size={24}/> Home</button>
                <Link to="/profile" className="flex items-center gap-4"><CgProfile size={24}/> Profile</Link>
                <Link to="/cart" className="flex items-center gap-4"><HiOutlineShoppingCart size={24}/> My Cart</Link>
                
                {!currentUser && <button onClick={() => navigate("/login")} className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl cursor-pointer">Login</button>}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ... Search Overlays stay the same ... */}

      <main className="pt-20 md:pt-32">
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;