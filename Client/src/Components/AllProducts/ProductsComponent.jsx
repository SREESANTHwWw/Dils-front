import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingCart, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { ProductsContext } from "../Context/ProductsContext";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../../Pages/Navbar";
import axios from "axios";
import { server } from "../../Server";
import { toast } from "react-toastify";

const ProductsComponent = () => {
  const { Addtocartfun, formatPrice, searchData } = useContext(ProductsContext);
  const { currentUser } = useContext(AuthContext);

  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const perpage = 8; // Increased for a better grid fill

  const renderPrice = (item) => {
    if (!currentUser) return (
      <p className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
        Login to see price
      </p>
    );

    const priceTypes = {
      User: item.price,
      Medium: item.medium_price,
      Premium: item.premium_price,
    };

    const userPrice = priceTypes[currentUser.type] || item.price;
    const discount = (((item.mRP - userPrice) / item.mRP) * 100).toFixed(0);

    return (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-slate-900">{formatPrice(userPrice)}</span>
          <span className="text-xs text-slate-400 line-through">{formatPrice(item.mRP)}</span>
        </div>
        <span className="inline-block bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
          {discount}% Savings
        </span>
      </div>
    );
  };

  const FetchProduct = () => {
    setLoading(true);
    axios
      .get(`${server}/get-all-products?page=${currentPage}`)
      .then((res) => {
        setProducts(res.data.results);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Waking up server... please wait.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    FetchProduct();
  }, [currentPage]);

  useEffect(() => {
    if (!searchData) {
      setFilterData(product);
    } else {
      const filtered = product.filter((res) =>
        res.productname.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilterData(filtered);
    }
  }, [searchData, product]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
    

      <main className="w-full max-w-7xl px-4 mt-4">
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Our Collection</h1>
            <p className="text-slate-500 font-medium mt-1">Discover premium trades at unbeatable rates.</p>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {filterData.length} Products
          </div>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {loading ? (
              // Skeleton Loader
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-80 bg-white rounded-[2rem] animate-pulse border border-slate-100" />
              ))
            ) : (
              filterData.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={item._id}
                  className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] transition-all duration-500"
                >
                  <Link to={`/viewproduct/${item._id}`} className="relative block aspect-square overflow-hidden bg-slate-100">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={item.product_img}
                      alt={item.productname}
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </Link>

                  <div className="p-5">
                    <Link to={`/viewproduct/${item._id}`}>
                      <h3 className="font-bold text-slate-800 mb-1 truncate group-hover:text-blue-600 transition-colors">
                        {item.productname}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 min-h-[2rem]">
                        {item.description}
                      </p>
                      <div className="mb-4">
                        {renderPrice(item)}
                      </div>
                    </Link>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => Addtocartfun(item)}
                      className="w-full py-3 bg-blue-950 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-yellow-500 hover:text-blue-950 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <HiOutlineShoppingCart size={16} />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Modern Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-blue-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <HiChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    currentPage === page 
                      ? "bg-blue-950 text-white shadow-lg shadow-blue-900/20" 
                      : "text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-blue-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsComponent;