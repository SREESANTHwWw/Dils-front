import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Pages/Navbar";
import { ProductsContext } from "../Context/ProductsContext";
import { MdDelete, MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../Server";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const CartComponent = () => {
  const { formatPrice, cartdata, loading } = useContext(ProductsContext);
  const localdata = localStorage.getItem("user_id");
  const userId = localdata ? JSON.parse(localdata) : [];
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const userType = currentUser?.userType || "User";

  const updateQuantity = async (productId, action) => {
    try {
      const response = await axios.post(`${server}/addToCart`, {
        userId,
        Product_id: productId,
        action,
      });
      setCart(response.data.cart.items);
      setSubtotal(response.data.cart.subtotal);
      cartdata();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

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

  useEffect(() => {
    if (userId) {
      axios.get(`${server}/getAll-cart/${userId}`).then((res) => {
        setCart(res.data.cart.items);
        setSubtotal(res.data.cart.subtotal);
      });
    }
  }, [userId]);

  return (
    <div className="bg-slate-50 min-h-screen ">
      

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-center items-center backdrop-blur-md bg-white/30"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 mt-4">
        <header className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Cart</h2>
          <p className="text-slate-500 text-sm mt-1">Review your items before proceeding to checkout.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items List */}
          <div className="flex-1 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item._id}
                    className="group bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6 relative"
                  >
                    {/* Product Image */}
                    <Link to={`/viewproduct/${item.Product_id}`} className="shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                        <img
                          className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110"
                          src={item.product_img}
                          alt={item.productname}
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col text-center sm:text-left">
                      <Link to={`/viewproduct/${item.Product_id}`}>
                        <h4 className="font-bold text-slate-900 text-lg hover:text-blue-600 transition-colors">
                          {item.productname}
                        </h4>
                        <p className="text-slate-500 text-xs line-clamp-2 mt-1 max-w-md mx-auto sm:mx-0">
                          {item.description}
                        </p>
                      </Link>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                        <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                          <button
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors text-slate-600 font-bold"
                            onClick={() => updateQuantity(item.Product_id, item.minimum_order_quantity === 1 ? "remove" : "decrease")}
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-bold text-slate-900">
                            {item.minimum_order_quantity}
                          </span>
                          <button
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors text-slate-600 font-bold"
                            onClick={() => updateQuantity(item.Product_id, "increase")}
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.Product_id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-2"
                        >
                          <MdDelete size={22} />
                        </button>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex flex-col items-center sm:items-end justify-center">
                      <span className="text-xl font-black text-slate-900 leading-none">
                        {formatPrice(
                          userType === "Medium" ? item.medium_price : 
                          userType === "Premium" ? item.premium_price : item.price
                        )}
                      </span>
                      <span className="text-xs text-slate-400 line-through mt-1">
                        MRP {formatPrice(item.mRP)}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <MdShoppingCart size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Your cart is empty</h3>
                  <p className="text-slate-500 mt-2 mb-6">Looks like you haven't added anything yet.</p>
                  <Link 
                    to="/" 
                    className="inline-flex px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Checkout Sidebar */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-32">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 text-sm font-medium">
                  <span>Price ({cart.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-sm font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-600">FREE</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-slate-900 font-bold">Subtotal</span>
                  <span className="text-2xl font-black text-blue-600 tracking-tight">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl
                  ${cart.length > 0 
                    ? "bg-slate-900 text-white hover:bg-blue-600 shadow-blue-100" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"}
                `}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

              <p className="text-center text-[11px] text-slate-400 mt-6 px-4">
                Secure SSL Encrypted Checkout. By proceeding, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;