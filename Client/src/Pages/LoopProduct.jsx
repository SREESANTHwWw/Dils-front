import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductsContext } from "../Components/Context/ProductsContext";

const LoopProduct = () => {
  const { product } = useContext(ProductsContext);

  // We duplicate the array to ensure the loop is truly infinite without gaps
  const loopItems = [...product, ...product, ...product];

  return (
    <div className="w-full bg-slate-50 py-12 border-y border-slate-100 overflow-hidden">
      <div className="mb-6 px-6 max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Featured Collection</h3>
          <p className="text-xs text-slate-500 font-medium">Flash updates on our latest stock</p>
        </div>
        <div className="h-px flex-1 bg-slate-200 mx-8 hidden md:block" />
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
          Live Feed
        </span>
      </div>

      <div className="relative flex">
        {/* The Marquee Container */}
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -1920], // Adjust based on your average total width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40, // Increase for slower, more premium speed
              ease: "linear",
            },
          }}
          whileHover={{ transition: { duration: 80 } }} // Slows down on hover
        >
          {loopItems.map((item, index) => (
            <div
              key={`${item._id}-${index}`}
              className="inline-block mx-4 group"
            >
              <Link to={`/viewproduct/${item._id}`}>
                <div className="w-[240px] bg-white rounded-2xl border border-slate-100 p-3 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
                  <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-slate-50">
                    <img
                      src={item.product_img}
                      alt={item.productname}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="mt-4 flex flex-col items-center text-center">
                    <p className="text-sm font-bold text-slate-800 truncate w-full px-2">
                      {item.productname}
                    </p>
                    <div className="mt-1 h-1 w-0 group-hover:w-12 bg-blue-600 transition-all duration-500 rounded-full" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LoopProduct;