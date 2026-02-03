import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductsContext } from "../Context/ProductsContext";
import { AuthContext } from "../Context/AuthContext";

const HomeProductsComponent = () => {
  const { 
    filterData, 
    Addtocartfun, 
    formatPrice, 
    currentPage, 
    pageNumbers, 
    totalPages, 
    setCurrentPage,
    loading 
  } = useContext(ProductsContext);
  const { currentUser } = useContext(AuthContext);

  // Corrected: Removed ": any" type annotation for JSX compatibility
  const renderPrice = (product) => {
    if (!currentUser) return (
      <p className="text-xs text-slate-400 italic">Login to view pricing</p>
    );

    const priceTypes = {
      User: product.price,
      Medium: product.medium_price,
      Premium: product.premium_price,
    };

    const mrp = product.mRP;
    const price = priceTypes[currentUser.type] || product.price;
    const discount = Math.round(((mrp - price) / mrp) * 100);

    return (
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black text-slate-900">{formatPrice(price)}</span>
          <span className="text-xs text-slate-400 line-through">{formatPrice(mrp)}</span>
        </div>
        <span className="inline-block px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-md border border-rose-100 uppercase tracking-tighter">
          Save {discount}%
        </span>
      </div>
    );
  };

  if (loading) return (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Curating your selection...</p>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#F8FAFC] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-2 block">Premium Inventory</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              Fast Moving <br className="hidden md:block" /> Products
            </h2>
          </div>
          <div className="h-1 flex-1 bg-slate-200/50 mb-3 mx-8 hidden lg:block rounded-full" />
          <p className="text-slate-500 text-sm max-w-xs">
            Explore our most popular items updated in real-time based on current trends.
          </p>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
        >
          <AnimatePresence>
            {filterData.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                  <Link to={`/viewproduct/${product._id}`}>
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full object-cover"
                      src={product.product_img}
                      alt={product.productname}
                    />
                  </Link>
                  
                  {/* Floating Add to Cart (Desktop) */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 hidden md:block z-10">
                    <button
                      onClick={() => Addtocartfun(product)}
                      className="w-full py-3 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:bg-blue-600 transition-colors"
                    >
                      <ShoppingCart size={18} />
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-3 md:p-5">
                  <Link to={`/viewproduct/${product._id}`}>
                    <h3 className="text-xs md:text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors mb-1">
                      {product.productname}
                    </h3>
                  </Link>
                  
                  <p className="text-[10px] text-slate-400 font-medium mb-2 uppercase tracking-wider">
                    {product.categoryProduct || "Essential"}
                  </p>

                  {renderPrice(product)}

                  {/* Mobile Add to Cart Button */}
                  <button
                    onClick={() => Addtocartfun(product)}
                    className="mt-4 w-full py-2.5 bg-slate-50 text-slate-900 font-bold rounded-xl md:hidden flex items-center justify-center gap-2 active:bg-slate-200 transition-colors text-xs"
                  >
                    <ShoppingCart size={14} />
                    Add
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl hover:bg-slate-50 disabled:opacity-30 text-slate-600"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-1 px-4">
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl hover:bg-slate-50 disabled:opacity-30 text-slate-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProductsComponent;