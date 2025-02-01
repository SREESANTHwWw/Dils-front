import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductsContext } from "../Context/ProductsContext";
import { AuthContext } from "../Context/AuthContext";

const HomeProductsComponent = () => {
  const navigate = useNavigate();
  const { 
    filterData, 
    Addtocartfun, 
    formatPrice, 
    currentPage, 
    pageNumbers, 
    totalPages, 
    setCurrentPage ,
    loading
  } = useContext(ProductsContext);
  const { currentUser } = useContext(AuthContext);

  // Navigate to the Products page


  // Function to render price based on user type

  
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
      <p className="text-sm line-through  text-gray-500">
     
        {formatPrice(product.mRP)}
      </p>
    
      {/* Discount Percentage */}
      <p className="sm:text-sm text-[10px] font-semibold round-md text-red-500 bg-red-100 px-2 py-1 sm:rounded-full">
        {convert}% Off
      </p>
    </div>
    
    );
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
    <div className="w-full flex justify-center items-center bg-gray-50 py-10">
      <div className="w-full max-w-7xl flex flex-col items-center px-6 lg:px-0">
        {/* Header Section */}
        <div className="w-full flex justify-between items-center mb-8">
          <h2 className="sm:text-3xl text-md font-bold text-gray-800 tracking-wide">
            New Fast Moving Products
          </h2>
       
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:w-full w-[350px]  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {filterData.map((product, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden"
            >
              {/* Clickable Product Image */}
              <Link to={`/viewproduct/${product._id}`}>
                <img
                  className="w-35 h-35 sm:h-56 sm:w-full object-cover"
                  src={product.product_img}
                  alt={product.productname}
                />
              </Link>

              {/* Product Content */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <Link to={`/viewproduct/${product._id}`}>
                  {/* Product Name */}
                  <h3 className="sm:text-lg text-sm font-bold text-gray-800 mb-2 truncate">
                    {product.productname}
                  </h3>

                  {/* Product Description */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price Section */}
                  {renderPrice(product)}
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

        {/* Pagination */}
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
              className={`px-4 py-2 border rounded-md hover:bg-gray-200 ${currentPage === page ? 'bg-blue-900 text-white' : 'bg-white'}`}
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
    </div>
  );
};

export default HomeProductsComponent;
