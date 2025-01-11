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

  const renderPrice = (product) => {
    if (!currentUser) return null; // Don't show prices if no user is logged in

    const priceTypes = {
      User: product.price,
      Medium: product.medium_price,
      Premium: product.premium_price,
    };

    const userType = currentUser.type;
    const price = priceTypes[userType];
    console.log(userType)

    return (
      <div className="flex flex-col gap-2">
      <span className="text-xl font-bold text-black">
      {formatPrice(price)}
      </span>
      <span className="line-through text-gray-500">
        M.R.P: {formatPrice(product.mRP)}
      </span>
    </div>
    );
    
  };
  const localdata = localStorage.getItem("user_id");

  const userId = localdata ? JSON.parse(localdata) : [];
  console.log(userId.length)

  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    axios.get(`${server}/getOneproduct/${id}`).then((res) => {
      setViewone(res.data);
    });
  }, [id]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const buyNow = (product) => {
    

    navigate("/checkout", {
      state: { price: product.price, premium: product.premium_price,medium:product.medium_price,  product: product },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Navbar />
      {viewOne.length > 0 ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mt-36 p-6 bg-white  w-full max-w-[98%]">
          {viewOne.map((e) => (
            <React.Fragment key={e.id}>
              {/* Product Image with Amazon-like Zoom */}
              <div
                className="relative flex justify-center items-center overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="w-[400px] h-[400px] object-cover border rounded-lg"
                  src={e.product_img}
                  alt={e.productname}
                />
                {/* Zoomed Area */}
                {isZoomed && (
                  <div
                    className="absolute inset-0 pointer-events-none rounded-lg cursor-zoom-in"
                    style={{
                      backgroundImage: `url(${e.product_img})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: "200%",
                      borderRadius: "0.5rem",
                    }}
                  ></div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between gap-6 p-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {e.productname}
                  </h1>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {e.description}
                  </p>
                </div>

                {/* Price Section */}
                 {renderPrice(e)}

                {/* Buttons */}
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => Addtocartfun(e)}
                    className="w-full py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => buyNow(e)}
                    className={`${!userId.length > 0? "hidden ":" " }w-full py-3  bg-yellow-500  text-white font-semibold rounded-md hover:bg-yellow-400 transition duration-300`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="mt-20 text-gray-500 text-lg font-semibold">
          Loading product details...
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
