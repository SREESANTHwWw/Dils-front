import React, { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { TbHome } from "react-icons/tb";
import { ProductsContext } from '../Components/Context/ProductsContext';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";

const Navbar = () => {
  const { searchfunction, searchData, cartlength } = useContext(ProductsContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const navLoginPage = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const localdata = localStorage.getItem("user_id");
  const userId = localdata ? JSON.parse(localdata) : [];
 

  return (
    <>
      <div className="w-full h-auto bg-white shadow-lg flex flex-col sm:w-full md:w-full fixed top-0 z-50">

        {/* Top Scrolling Announcement */}
        <div className="w-full h-[2rem] bg-gradient-to-r from-blue-600 to-blue-800 text-white flex justify-center items-center">
          <div className="overflow-hidden w-full max-w-7xl mx-auto">
            <div className="flex whitespace-nowrap animate-marquee">
              <span className="mr-8 font-medium text-white">Up to 40% Off</span>
              <span className="mr-8 font-medium text-white">Exclusive Deals</span>
              <span className="mr-8 font-medium text-white">New Arrivals</span>
              <span className="mr-8 font-medium text-white">Shop Now</span>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between py-4 px-6 bg-white shadow-md relative">
          {/* Left Section */}
          <div className="flex items-center gap-4 w-full justify-between sm:w-[50%]">
            <img className="h-10" src="" alt="Logo" />
            

            {/* Search Bar */}
            <div className="relative w-[400px] right-6">
              <input
                className="w-full h-[40px] rounded-md px-6 sm:px-10 pl-14 outline-none shadow-lg border-2 border-blue-950 focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                type="search"
                placeholder="Search"
                value={searchData}
                onChange={searchfunction}
              />
              <IoSearch className="absolute rounded-md top-1/2 transform -translate-y-1/2 text-yellow-500 text-lg bg-blue-800 h-[38px] w-[40px] hover:text-blue-900 transition-all duration-300" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-3xl text-blue-950 absolute top-4 right-4 z-10"
            onClick={toggleMenu}
          >
            {menuOpen ? <IoMdCloseCircleOutline className="text-4xl" /> : <TiThMenu className="text-4xl" />}
          </button>

          {/* Navbar Links */}
          <div className={`hidden sm:flex items-center gap-10`}>
            {/* Home */}
            <div className="flex flex-col items-center gap-1">
              <Link to="/">
                <TbHome className="text-3xl text-blue-950 hover:text-yellow-500 transition-all duration-300 transform hover:scale-110" />
              </Link>
              <span className="text-xs font-semibold text-blue-950 hover:text-yellow-500">Home</span>
            </div>

            {/* Cart with Badge */}
            <div className="flex flex-col items-center gap-1 relative">
              <Link to="/cart" className="relative">
                <HiOutlineShoppingCart className="text-3xl text-blue-950 hover:text-yellow-500 transition-all duration-300 transform hover:scale-110" />
                {cartlength.length > 0 && (
                  <span className="absolute top-[-8px] right-[-10px] bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartlength.length}
                  </span>
                )}
              </Link>
              <span className="text-xs font-semibold text-blue-950 hover:text-yellow-500">Cart</span>
            </div>

            {/* Account */}
            <div className="flex flex-col items-center gap-1">
              <Link to="/profile">
                <CgProfile className="text-3xl text-blue-950 hover:text-yellow-500 transition-all duration-300 transform hover:scale-110" />
              </Link>
              <span className="text-xs font-semibold text-blue-950 hover:text-yellow-500">Account</span>
            </div>

            {/* Login Button */}
            <button
              className={`${userId.length > 0 ? "hidden" : ""} w-28 h-10 bg-blue-950 text-white font-medium rounded-xl hover:bg-yellow-600 hover:text-blue-950 hover:border-2 hover:border-blue-950 transition-all duration-300`}
              onClick={navLoginPage}
            >
              Login
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden ${menuOpen ? 'block' : 'hidden'} absolute top-[115px] h-screen right-0 bg-white shadow-lg py-4 flex flex-col items-center gap-4 z-20 transform transition-all duration-300 ease-in-out w-[100%] max-w-[400px] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Link to="/" className="text-lg text-blue-950 hover:text-yellow-500 transition-all duration-300 transform hover:scale-110">
            Home
          </Link>
          <Link to="/cart" className="text-lg text-blue-950 hover:text-yellow-500 transition-all duration-300 transform hover:scale-110">
            Cart
          </Link>
          <Link to="/profile" className="text-lg text-blue-950 hover:text-yellow-500 transition-all duration-300 transform hover:scale-110">
            Account
          </Link>
          <button
            className="w-28 h-10 bg-blue-950 text-white font-medium rounded-xl hover:bg-yellow-600 hover:text-blue-950 hover:border-2 hover:border-blue-950 transition-all duration-300"
            onClick={navLoginPage}
          >
            Login
          </button>
        </div>

      </div>

      <Outlet />
    </>
  );
};

export default Navbar;  