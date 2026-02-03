import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineInbox, HiOutlineCube, HiOutlineCalendar } from "react-icons/hi";
import { IoChevronForwardOutline } from "react-icons/io5";
import { server } from "../../Server";
import { ProductsContext } from "../Context/ProductsContext";

const Userorders = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useContext(ProductsContext);

  useEffect(() => {
    const localdata = localStorage.getItem("user_id");
    if (localdata) {
      setUserId(JSON.parse(localdata));
    }
  }, []);

  const fetchOrder = async () => {
    if (userId) {
      setLoading(true);
      try {
        const res = await axios.get(`${server}/getorder/${userId}`);
        const ord = res.data.getorders;
        setOrders(ord.reverse());
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [userId]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Order Confirmed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Shipped":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Delivered":
        return "bg-slate-50 text-slate-500 border-slate-100";
      case "Canceled":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-white rounded-3xl animate-pulse border border-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Order History</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track your recent purchases</p>
        </header>

        <AnimatePresence>
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={order._id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Order Top Bar */}
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                        <HiOutlineCube className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</p>
                        <p className="text-xs font-bold text-slate-700">#{order._id.slice(-8).toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden sm:block">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</p>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                          <HiOutlineCalendar size={14} className="text-slate-400" />
                          {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                  </div>

                  {/* Product List */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.products?.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 group">
                          <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-50">
                            <img 
                              src={item.product_img || "/placeholder.png"} 
                              alt="" 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{item.productname}</h4>
                            <p className="text-xs text-slate-500 mt-1">
                              Qty: <span className="text-slate-900 font-medium">{item.minimum_order_quantity}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-slate-900">{formatPrice(item.price)}</p>
                            <p className="text-[10px] text-slate-400">per unit</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                      <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                        View Details <IoChevronForwardOutline />
                      </button>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Amount</p>
                        <p className="text-lg font-black text-blue-950">{formatPrice(order.subtotal)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <HiOutlineInbox size={40} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No orders yet</h3>
              <p className="text-slate-500 text-sm mt-2">When you place an order, it will appear here.</p>
              <button 
                onClick={() => window.location.href = "/products"}
                className="mt-6 px-6 py-3 bg-blue-950 text-white rounded-2xl font-bold text-sm hover:bg-blue-900 transition-all"
              >
                Start Shopping
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Userorders;