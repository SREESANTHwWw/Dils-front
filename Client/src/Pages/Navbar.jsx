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

const Navbar = () => {
  const { cartlength, product, formatPrice } = useContext(ProductsContext);
  const navigate = useNavigate();
  const { category } = useContext(CategoryContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // Initial state should be an empty string
  const [searchProduct, setFilterData] = useState([]); // Filtered product state
  const [searchData, setSearchData] = useState(""); // Search query state

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

  console.log(selectedCategory)
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
        <p className="text-xl font-bold text-green-600">{formatPrice(price)}</p>
      </div>
    );
  };

  const navigateProduct = (productId) => {
    setSearchData("");
    navigate(`/viewproduct/${productId}`);
  };

  return (
    <>
      <div className="w-full h-auto bg-white shadow-lg flex flex-col fixed top-0 z-50">
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
          <div className="flex items-center gap-4 w-full justify-between sm:w-[70%]">
            <img className="h-10" src="" alt="Logo" />

            {/* Search Bar and Category Dropdown */}
            <div className="flex items-center w-full sm:w-[600px] rounded-md shadow-lg border-2 border-gray-500 transition-all duration-300">
              {/* Category Dropdown */}
              <select
                value={selectedCategory} // Use selected category value
                onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
                className="h-[30px] rounded-md px-2 outline-none transition-all duration-300 w-[150px] sm:w-[120px]"
              >
                <option value="">All</option> {/* Default option */}
                {categoryfilter.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.Category_name}
                  </option>
                ))}
              </select>

              {/* Search Bar */}
              <div className="relative w-full sm:w-[600px]">
                {/* Search Input */}
                <input
                  className="w-full h-[50px] rounded-md pl-3 pr-14 outline-none shadow-lg"
                  type="search"
                  placeholder="Search...."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value.toLowerCase())} // Update search data
                />

                {/* Search Button */}
                <button className="absolute right-0 top-0 h-[50px] w-[50px] flex items-center justify-center bg-blue-800 text-white rounded-r-md hover:bg-blue-900 transition-all duration-300">
                  <IoSearch className="text-xl" />
                </button>
              </div>
            </div>
          </div>

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
          <div className="inset-0 z-50 flex justify-center items-center">
            <div className="bg-white rounded-b-lg shadow-lg overflow-auto max-h-[80vh] w-full max-w-4xl m-2">
              <h1 className="text-xl font-bold px-6 py-4 border-b">Search Results</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 px-6">
                {searchProduct.map((item, index) => (
                  <div
                  onClick={() => navigateProduct(item._id)}
                  key={index}
                  className="text-black py-2 shadow-lg border-1 border-gray-500 transition-all duration-300 "
                >
                  <p>{item.productname}</p>
                  <img
                    src={item.product_img}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <p>{renderPrice(item)}</p>
                </div>
                ))}
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
