import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import axios from "axios";
import { server } from "../../Server";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Pages/Navbar";
import { AuthContext } from "../Context/AuthContext";

const ViewProduct = () => {
  const { id } = useParams();
  const [viewOne, setViewone] = useState([]);
  const { Addtocartfun, formatPrice } = useContext(ProductsContext);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    axios.get(`${server}/getOneproduct/${id}`).then((res) => {
      setViewone(res.data);
    });
  }, [id]);

  const renderPrice = (product) => {
    if (!currentUser) return null;

    const priceTypes = {
      User: product.price,
      Medium: product.medium_price,
      Premium: product.premium_price,
    };

    const mrp = product.mRP;
    const userType = currentUser.type;
    const price = priceTypes[userType];
    const discount = ((mrp - price) / mrp) * 100;
    const discountPercentage = discount.toFixed();

    return (
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold text-gray-800">{formatPrice(price)}</p>
        <p className="text-sm line-through text-gray-500">
          MRP: {formatPrice(mrp)}
        </p>
        <p className="text-sm font-semibold w-20 text-red-500 bg-red-100 px-3 py-1 rounded-full">
          {discountPercentage}% Off
        </p>
      </div>
    );
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const buyNow = (product) => {
    if (!currentUser) {
      console.error("User not logged in.");
      return;
    }

    const priceTypes = {
      User: product.price,
      Medium: product.medium_price,
      Premium: product.premium_price,
    };
    const userType = currentUser.type;
    const selectedPrice = priceTypes[userType];

    navigate("/checkout", {
      state: { price: selectedPrice, product: product },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Navbar />
      {viewOne.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-32 p-6 bg-white w-full max-w-full  rounded-lg">
          {viewOne.map((product) => (
            <React.Fragment key={product.id}>
              <div
                className="relative flex justify-center items-center overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="w-[400px] h-[400px] object-cover border rounded-lg"
                  src={product.product_img}
                  alt={product.productname}
                />
                {isZoomed && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url(${product.product_img})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: "200%",
                      borderRadius: "0.5rem",
                    }}
                  ></div>
                )}
              </div>

              <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  {product.productname}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {renderPrice(product)}

                <div className="flex flex-row  items-end h-40 gap-4">
                  <button
                    onClick={() => Addtocartfun(product)}
                    className="w-full h-12 py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
                  >
                    Add to Cart
                  </button>
                  {currentUser && (
                    <button
                      onClick={() => buyNow(product)}
                      className="w-full h-12  py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-400 transition duration-300"
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="mt-24 text-gray-500 text-lg font-semibold">
          Loading product details...
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
