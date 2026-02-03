import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import axios from "axios";
import { server } from "../../Server";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Pages/Navbar";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingBag, HiLightningBolt } from "react-icons/hi";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { Addtocartfun, formatPrice } = useContext(ProductsContext);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    axios.get(`${server}/getOneproduct/${id}`).then((res) => {
      // Assuming res.data is the product object directly or an array with one item
      setProduct(Array.isArray(res.data) ? res.data[0] : res.data);
    });
  }, [id]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPosition({ x, y });
  };

  const renderPriceInfo = () => {
    if (!currentUser || !product) return (
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <p className="text-blue-600 font-bold text-sm">Sign in to view exclusive member pricing</p>
        </div>
    );

    const priceTypes = {
      User: product.price,
      Medium: product.medium_price,
      Premium: product.premium_price,
    };

    const price = priceTypes[currentUser.type] || product.price;
    const discount = (((product.mRP - price) / product.mRP) * 100).toFixed(0);

    return (
      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-black text-slate-900">{formatPrice(price)}</span>
          <span className="text-lg text-slate-400 line-through font-medium">{formatPrice(product.mRP)}</span>
        </div>
        <div className="inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          Save {discount}% Today
        </div>
      </div>
    );
  };

  const buyNow = () => {
    const priceTypes = {
      User: product.price,
      Medium: product.medium_price,
      Premium: product.premium_price,
    };
    const selectedPrice = priceTypes[currentUser.type] || product.price;

    navigate("/checkout", {
      state: { price: selectedPrice, product: product },
    });
  };

  if (!product) return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold tracking-tight">Fetching product details...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
  
      
      <main className="max-w-7xl mx-auto px-4 mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Image Section with Premium Zoom */}
          <div className="space-y-4">
            <div 
              className="relative aspect-square bg-slate-100 rounded-[2.5rem] overflow-hidden cursor-zoom-in border border-slate-100 group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
                src={product.product_img}
                alt={product.productname}
              />
              
              <AnimatePresence>
                {isZoomed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url(${product.product_img})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: "250%", // Higher zoom factor
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/20">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Premium Quality</p>
              </div>
            </div>
          </div>

          {/* Right: Content Section */}
          <div className="flex flex-col h-full py-2">
            <div className="flex-1 space-y-8">
              <div>
                <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                    <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Home</span>
                    <span>/</span>
                    <span className="text-slate-900">Product Detail</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                  {product.productname}
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
                  {product.description}
                </p>
              </div>

              <div className="py-6 border-y border-slate-100">
                {renderPriceInfo()}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center p-3 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Fast Delivery</p>
                    <p className="text-xs font-bold text-slate-700">2-4 Days</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Secure</p>
                    <p className="text-xs font-bold text-slate-700">Payment</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Official</p>
                    <p className="text-xs font-bold text-slate-700">Warranty</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => Addtocartfun(product)}
                className="flex-1 h-16 bg-blue-950 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all"
              >
                <HiOutlineShoppingBag size={22} />
                Add to Cart
              </motion.button>
              
              {currentUser && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={buyNow}
                  className="flex-1 h-16 bg-yellow-500 text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl shadow-yellow-500/10 hover:bg-yellow-400 transition-all"
                >
                  <HiLightningBolt size={22} />
                  Instant Buy
                </motion.button>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ViewProduct;