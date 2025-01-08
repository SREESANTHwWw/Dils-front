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
    loading,
    setLoading
  } = useContext(ProductsContext);
  const { currentUser } = useContext(AuthContext);

  // Navigate to the Products page
  const navtoProducts = () => {
    setLoading(true)
    navigate("/products")};

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
        <p className="text-xl font-bold text-green-600">
          {formatPrice(price)}
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
          <button
            onClick={navtoProducts}
            className="text-sm w-[80px] font-medium h-[30px] bg-blue-950 rounded-md text-yellow-500 hover:bg-blue-700 transition-colors duration-300"
          >
            Show More
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {filterData.map((product, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden"
            >
              {/* Clickable Product Image */}
              <Link to={`/viewproduct/${product._id}`}>
                <img
                  className="w-full h-56 object-cover"
                  src={product.product_img}
                  alt={product.productname}
                />
              </Link>

              {/* Product Content */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <Link to={`/viewproduct/${product._id}`}>
                  {/* Product Name */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
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
        {
            loading&&(
              <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
          
          <img class="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon"/>
         
          </div>
            )
          }
      </div>
    </div>
  );
};

export default HomeProductsComponent;
