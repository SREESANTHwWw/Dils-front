import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../Context/ProductsContext";
import Navbar from "../../Pages/Navbar";

import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { server } from "../../Server";

const ProductsComponent = () => {
  const { Addtocartfun, formatPrice,searchData } = useContext(ProductsContext);
  const { currentUser } = useContext(AuthContext);
 
  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1);
  const [product, setProducts] = useState([]);
  const perpage = 4;
  const renderPrice = (product) => {
    if (!currentUser) return null; // Don't show prices if no user is logged in

    const priceTypes = {
      User: product.price,
      Medium: product.medium_price,
      Premium: product.premium_price,
    };
    
    const mrp = product.mRP 
   

    const userType = currentUser.type;
    const price = priceTypes[userType];
    const percentage = ((mrp -price )/mrp)*100
    const convert = percentage.toFixed()



    return (
      <div className="flex justify-between items-center space-x-4">
      {/* MRP with Line-Through */}
      <p className="sm:text-xl text-sm font-medium  text-black  ">
      {formatPrice(price)}
      </p>
    
      {/* Discount Price */}
      <p className="text-sm font-bold line-through  text-gray-500">
     
        {formatPrice(product.mRP)}
      </p>
    
      {/* Discount Percentage */}
      <p className="sm:text-sm text-[10px] font-semibold text-red-500 bg-red-100 px-2 py-1 sm:rounded-full">
        {convert}% Off
      </p>
    </div>
    
    );
  };

  const FetchProduct = () => {
    const offset = (currentPage - 1) * perpage;

    axios
      .get(`${server}/get-all-products?page=${currentPage}`)
      .then((res) => {
        
        setProducts(res.data.results);
        setTotalPages(res.data.totalPages); // Set products data
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch products"); // Show error toast
      });
  };
  useEffect(() => {
    FetchProduct();
  }, [currentPage, perpage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    if (!searchData) {
      setFilterData(product);
    } else {
      const filteredSearchData = product.filter((res) =>
        res.productname.toLowerCase().includes(searchData)
      );
      setFilterData(filteredSearchData);
    }
  }, [searchData, product]);

  const searchfunction = (e) => {
    setSearchData(e.target.value.toLowerCase());
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col mt-[7rem]">
      {/* Navbar */}
      <Navbar />

      {/* Product Grid */}
      <div className="sm:w-[85%] grid grid-cols-2  w-[350px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10">
        {filterData.map((product, index) => (
          <div
            key={index}
            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden"
          >
            {/* Product Image */}
            <Link to={`/viewproduct/${product._id}`}>
              <img
                className=" w-35 h-35 sm:w-full sm:h-56 object-cover"
                src={product.product_img}
                alt={product.productname}
              />
            </Link>

            {/* Product Content */}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <Link to={`/viewproduct/${product._id}`}>
                <div>
                  {/* Product Name */}
                  <h3 className="sm:text-lg text-sm font-bold text-gray-800 mb-2 truncate">
                    {product.productname}
                  </h3>

                  {/* Product Description */}
                  <p className="sm:text-sm text-[10px] text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price Section */}
                  {renderPrice(product)}
                </div>
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={() => Addtocartfun(product)}
                className="mt-4 w-full py-2 bg-blue-950 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-6 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 border rounded-md hover:bg-gray-200 ${
              currentPage === page ? "bg-blue-900 text-white" : "bg-white"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsComponent;
