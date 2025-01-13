 import React, { useState, useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { TbHome } from "react-icons/tb";
import { ProductsContext } from "../Components/Context/ProductsContext";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { CategoryContext } from "../Components/Context/CategoryContext";
import { AuthContext } from "../Components/Context/AuthContext";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaFacebookSquare } from "react-icons/fa";

import { FaInstagramSquare } from "react-icons/fa";

import { FaYoutube } from "react-icons/fa";

const Navbar = () => {
  const { cartlength, product, formatPrice } = useContext(ProductsContext);
  const navigate = useNavigate();
  const { category } = useContext(CategoryContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // Initial state should be an empty string
  const [searchProduct, setFilterData] = useState([]); // Filtered product state
  const [searchData, setSearchData] = useState("");
  const [responsive, setResponsive] = useState(false); // Search query state
  const [searchShow, setSearchShow] = useState(false);

  const checkResponsive = () => {
    if (window.innerWidth <= 640 ) {
      setResponsive(true); // Set to true for mobile screens
    } else {
      setResponsive(false); // Set to false for larger screens
    }
  };
  useEffect(() => {
    checkResponsive();

    // Add event listener to handle window resize
    window.addEventListener("resize", checkResponsive);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", checkResponsive);
  }, []);

  const navLoginPage = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const localdata = localStorage.getItem("user_id");
  const userId = localdata ? JSON.parse(localdata) : [];

  const categoryfilter = category.filter(
    (item) => item.hasSubcategory === false
  );

  // Update filtered products whenever selectedCategory or searchData changes
  useEffect(() => {
    let filteredProducts = product;

    // Filter by selected category if available
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (item) => item.categoryProduct === selectedCategory
      );
    }

    // Further filter by search query
    if (searchData) {
      filteredProducts = filteredProducts.filter((item) =>
        item.productname.toLowerCase().includes(searchData.toLowerCase())
      );
    }

    setFilterData(filteredProducts); // Update filtered data state
  }, [selectedCategory, searchData, product]); // Re-run the effect when category, search query, or product changes

  console.log(selectedCategory);
  const { currentUser } = useContext(AuthContext);

  // Function to render price based on user type
  const renderPrice = (product) => {
    if (!currentUser) return null; // Don't show prices if no user is logged in

    const priceTypes = {
      User: product.price,
      Medium: product.medium_price,
      Premium: product.premium_price,
    };

    const userType = currentUser.type;
    const price = priceTypes[userType];

    return (
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-500 line-through">
          MRP: {formatPrice(product.mRP)}
        </p>
        <p className="text-sm font-bold text-green-600">{formatPrice(price)}</p>
      </div>
    );
  };

  const navigateProduct = (productId) => {
    setSearchData("");
    navigate(`/viewproduct/${productId}`);
  };

  const responsiveSearch = () => {
    setSearchShow(true);
  };
const closeThesearch=()=>{
  setSearchShow(false)
  setSearchData("")

}
  return (
    <>
      <div
        className={`${
          searchData ? "" : ""
        }w-full h-auto  bg-white shadow-lg flex flex-col fixed top-0 z-50`}
      >
        {/* Top Scrolling Announcement */}
        <div className="w-full h-[2rem] bg-gradient-to-r from-blue-900  to-blue-800 text-white flex justify-center items-center">
  <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4">
    {/* Left Section */}
    <div className="flex items-center space-x-4">
      <MdOutlineMail aria-label="Email Icon" />
      <span className="text-sm">Info@gmail.com</span>
      <FiPhone aria-label="Phone Icon"  />
      <span className=" text-sm">0002010223</span>
    </div>

    {/* Right Section */}
    <div className="flex items-center space-x-4">
      <FaFacebookSquare aria-label="Facebook Icon" />
      <FaInstagramSquare aria-label="Instagram Icon" />
      <FaYoutube aria-label="YouTube Icon" />
    </div>
  </div>
</div>


        {/* Navbar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between py-4 px-6 bg-white shadow-md relative">
          {/* Left Section */}
          <div className="flex items-center gap-4 w-full justify-between sm:w-[70%]">
            {/* <img
              className="h-10 w-10"
              src={
                "https://res.cloudinary.com/dkz8fh4jt/image/upload/v1736509842/e3fkw0uklsogg4hyknjn.png"
              }
              alt="Logo"
            /> */}
            <span className="font-bold text-blue-800 text-[30px] font-mono tracking-tighter hover:text-yellow-600"> Dils Trades</span>

            {/* Search Bar and Category Dropdown */}
            {responsive === true ? (
              <button
                className="absolute right-14 top-[17px] h-[33px] w-[33px] flex items-center rounded-md justify-center  bg-blue-800 text-white hover:bg-blue-900 transition-all duration-300"
                aria-label="Search Button"
                onClick={responsiveSearch}
              >
                <IoSearch className="text-xl" />
              </button>
            ) : (
              <div
                className={`items-center sm:flex rounded-md   w-full sm:w-[600px] shadow-lg border-2  border-gray-200 transition-all duration-300 z-[60]`}
              >
                {/* Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-[50px] rounded-l-md px-2 font-thin outline-none transition-all duration-300 w-[120px] sm:w-[120px]"
                  aria-label="Select Category"
                >
                  <option value="">All</option>
                  {categoryfilter.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.Category_name}
                    </option>
                  ))}
                </select>

                {/* Search Bar */}
                <div className="relative w-full sm:w-[600px]">
                  <input
                    className="w-full h-[50px] pl-3 pr-14 outline-none shadow-lg [&::-webkit-search-cancel-button]:appearance-none"
                    type="search"
                    placeholder="Search...."
                    value={searchData}
                    onChange={(e) =>
                      setSearchData(e.target.value.toLowerCase())
                    }
                    aria-label="Search"
                  />
                  <button
                    className="absolute right-0 top-0 h-[50px] w-[50px] flex items-center rounded-r-md justify-center bg-blue-800 text-white hover:bg-blue-900 transition-all duration-300"
                    aria-label="Search Button"
                  >
                    <IoSearch className="text-xl" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {responsive && searchShow === true && (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between py-4 px-6 bg-white shadow-md relative">
            <div
              className={`items-center flex justify-center absolute  bottom-5 left-1   w-full sm:w-[600px] rounded-md shadow-lg border-2 border-gray-500 transition-all duration-300 z-[60]`}
            >
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-[50px] rounded-l-md px-2 outline-none transition-all duration-300 w-[110px] sm:w-[120px]"
                aria-label="Select Category"
              >
                <option value="">All</option>
                {categoryfilter.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.Category_name}
                  </option>
                ))}
              </select>

              {/* Search Bar */}
              <div className="relative w-full sm:w-[600px]">
                <input
                  className="w-full h-[50px] pl-3 pr-14 outline-none shadow-lg [&::-webkit-search-cancel-button]:appearance-none"
                  type="search"
                  placeholder="Search...."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value.toLowerCase())}
                  aria-label="Search"
                />
                  {responsive&& searchShow ===true  ?<button
                  className="absolute right-0 top-0 h-[50px] w-[50px] flex items-center justify-center bg-blue-800 text-white hover:bg-blue-900 transition-all duration-300"
                  aria-label="Search Button"
                  onClick={closeThesearch}
                >
                  X 
                </button> :<button
                  className="absolute right-0 top-0 h-[50px] w-[50px] flex items-center justify-center bg-blue-800 text-white hover:bg-blue-900 transition-all duration-300"
                  aria-label="Search Button"
                >
                  <IoSearch className="text-xl" />
                </button> } 
              </div>
            </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-3xl text-blue-950 absolute top-4 right-4 z-10"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <IoMdCloseCircleOutline className="text-4xl" />
            ) : (
              <TiThMenu className="text-4xl" />
            )}
          </button>

          {/* Navbar Links */}
          <div className={`hidden sm:flex items-center gap-10`}>
            {/* Home */}
            <Link to="/">
              <TbHome className="text-3xl text-blue-950 hover:text-yellow-500 transition-all duration-300 transform hover:scale-110" />
            </Link>

            {/* Cart with Badge */}
            <Link to="/cart" className="relative">
              <HiOutlineShoppingCart className="text-3xl text-blue-950 hover:text-yellow-500 transition-all duration-300 transform hover:scale-110" />
              {cartlength.length > 0 && (
                <span className="absolute top-[-8px] right-[-10px] bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartlength.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link to="/profile">
              <CgProfile className="text-3xl text-blue-950 hover:text-yellow-500 transition-all duration-300 transform hover:scale-110" />
            </Link>

            {/* Login Button */}
            {!userId.length && (
              <button
                className="w-28 h-10 bg-blue-950 text-white font-medium rounded-xl hover:bg-yellow-600 hover:text-blue-950 hover:border-2 hover:border-blue-950 transition-all duration-300"
                onClick={navLoginPage}
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden ${
            menuOpen ? "block" : "hidden"
          } absolute top-[115px] h-screen right-0 bg-white shadow-lg py-4 flex flex-col items-center gap-4 z-20 transform transition-all duration-300 ease-in-out w-full max-w-[400px]`}
        >
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Account</Link>
          {!userId.length && (
            <button
              className="w-28 h-10 bg-blue-950 text-white font-medium rounded-xl hover:bg-yellow-600 hover:text-blue-950 hover:border-2 hover:border-blue-950 transition-all duration-300"
              onClick={navLoginPage}
            >
              Login
            </button>
          )}
        </div>

        {/* Search Results Modal */}
        {searchData && (
          <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-50 items-start pt-32">
            <div className="bg-white rounded-lg shadow-lg overflow-auto max-h-[80vh] w-full max-w-xl">
              <h1 className="text-lg font-semibold px-4 py-3 bg-gray-100 border-b">
                Search Results
              </h1>

              {/* Product Suggestions */}
              <div className="px-4 py-2 border-t">
                <h2 className="text-gray-600 font-medium mb-2">
                  Product Suggestions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchProduct.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gray-50 border rounded-md shadow-sm hover:shadow-lg cursor-pointer transition"
                      onClick={() => navigateProduct(item._id)}
                    >
                      <img
                        src={item.product_img}
                        alt={item.productname}
                        className="w-12 h-12 object-cover rounded-md mr-4"
                      />
                      <div>
                        <p className="font-medium text-gray-800 truncate">
                          {item.productname}
                        </p>
                        <p className="text-sm text-green-600 font-semibold">
                          {renderPrice(item)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
