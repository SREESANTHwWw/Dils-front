import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Pages/Navbar";
import { ProductsContext } from "../Context/ProductsContext";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../Server";
import { AuthContext } from "../Context/AuthContext";

const CartComponent = () => {
  const { formatPrice, cartdata,setLoading ,loading} = useContext(ProductsContext);
  const localdata = localStorage.getItem("user_id");
  const userId = localdata ? JSON.parse(localdata) : [];
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
    const [responsive, setResponsive] = useState(false); 

  const userType = currentUser?.userType || "User"; // Default to 'user' type

  const updateQuantity = async (productId, action) => {
 
    try {
      const response = await axios.post(`${server}/addToCart`, {
        userId,
        Product_id: productId,
        action, // 'increase' or 'decrease'
      });
      setCart(response.data.cart.items);
      setSubtotal(response.data.cart.subtotal);
      cartdata();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };


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


  const removeItem = (id) => {
   
    
    axios
      .delete(`${server}/removeFromcart/${userId}/${id}`)
      .then((res) => {
        setCart(res.data.cart.items);
        setSubtotal(res.data.cart.subtotal);
        cartdata();
      })
      .catch((err) => console.error("Error removing item:", err));
  };


  const checkout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    axios.get(`${server}/getAll-cart/${userId}`).then((res) => {
      setCart(res.data.cart.items);
      setSubtotal(res.data.cart.subtotal);
   
    });
  }, [userId]);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen mt-[8rem]">
      <Navbar />
      <div className="w-[90%] sm:w-[80%] lg:w-[60%] flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-950">Shopping Cart</h2>
      </div>
      {
        responsive&& (<div className="flex flex-col items-center gap-6">
          {cart.length > 0 ? (
            <div className="flex flex-col items-center gap-6">
              <span className="text-xl font-semibold text-gray-700">
                Subtotal: {formatPrice(subtotal)}
              </span>
              <button
                className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                onClick={checkout}
              >
                Proceed to Buy
              </button>
            </div>
          ) : (
            <span className="text-gray-600">Your cart is empty</span>
          )}
        </div>)
      }

      {/* Cart Items */}
      <div className="w-full flex flex-col sm:flex-row justify-center gap-5">
        <div className="w-full sm:w-[80%] lg:w-[60%] flex flex-col gap-8">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center p-4 bg-white rounded-lg shadow-md border border-gray-300 hover:shadow-xl transition duration-200 relative"
              >
                 <Link to={`/viewproduct/${item.Product_id}`}>
                 {console.log(item)}
                <img
                  className="w-[120px] h-[120px] object-contain rounded-md"
                  src={item.product_img}
                  alt={item.productname}
                />
              </Link>
                {/* Product Details */}
                <div className="flex-1 flex flex-col gap-2 ml-6">
                <Link to={`/viewproduct/${item.Product_id}`}>
                  <span className="text-lg font-semibold text-blue-950">
                    {item.productname}
                  </span>
                  <div className="flex items-center w-[10rem]">
                  <span className="text-sm text-gray-600">
                    {item.description}
                  </span>
                  </div>
                 
                  </Link>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-2">
                    {item.minimum_order_quantity ==1 ?  <button
                    className="text-red-500 hover:text-red-700 transition duration-200"
                    onClick={() => removeItem(item.Product_id)}
                  >
                    <MdDelete size={24} />
                  </button>: <button
                      className="w-[30px] h-[30px] flex items-center justify-center border border-gray-300 text-black font-extrabold rounded-md hover:bg-gray-200"
                      onClick={() => updateQuantity(item.Product_id, "decrease")}
                    >
                      -
                    </button> }
                    
                    <span className="font-bold text-lg">
                      {item.minimum_order_quantity}
                    </span>
                    <button
                      className="w-[30px] h-[30px] flex items-center justify-center border border-gray-300 text-black font-extrabold rounded-md hover:bg-gray-200"
                      onClick={() => updateQuantity(item.Product_id, "increase")}
                    >
                      +
                    </button>
                  </div>
               
                </div>
                

                {/* Price and MRP */}
                <div className="absolute flex flex-col items-center justify-center top-2 right-4">
                  <span className="text-xl font-semibold text-black-600">
                    Price:{" "}
                    {userType === "Medium"
                      ? formatPrice(item.medium_price)
                      : userType === "Premium"
                      ? formatPrice(item.premium_price)
                      : formatPrice(item.price)}
                  </span>
                  <span className="text-sm font-semibold line-through text-gray-500">
                    MRP: {formatPrice(item.mRP)}
                  </span>
                </div>

                {/* Remove Item */}
                <div className="absolute bottom-2 right-4">
                  <button
                    className="text-red-500 hover:text-red-700 transition duration-200"
                    onClick={() => removeItem(item.Product_id)}
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              </div>
              
            ))
            
          ) : (
            <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-md">
              <p className="text-lg font-medium text-gray-700">
                🛒 Your cart is empty.
              </p>
              <p className="text-sm text-gray-500">
                Browse products and add items to your cart.
              </p>
            </div>
          )}
        </div>

        {/* Cart Summary (Desktop) */}
        <div className="w-full sm:w-[20%] lg:w-[20%] shadow-md rounded-md border bg-white p-4 hidden sm:block">
          <div className="flex flex-col items-center gap-6">
            {cart.length > 0 ? (
              <div className="flex flex-col items-center gap-6">
                <span className="text-xl font-semibold text-gray-700">
                  Subtotal: {formatPrice(subtotal)}
                </span>
                <button
                  className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                  onClick={checkout}
                >
                  Proceed to Buy
                </button>
              </div>
            ) : (
              <span className="text-gray-600">Your cart is empty</span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Cart Summary */}
      <div className="w-[90%] sm:hidden mb-6 p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center gap-6">
          {cart.length > 0 ? (
            <div className="flex flex-col items-center gap-6">
              <span className="text-xl font-semibold text-gray-700">
                Subtotal: {formatPrice(subtotal)}
              </span>
              <button
                className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                onClick={checkout}
              >
                Proceed to Buy
              </button>
            </div>
          ) : (
            <span className="text-gray-600">Your cart is empty</span>
          )}
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

export default CartComponent; 