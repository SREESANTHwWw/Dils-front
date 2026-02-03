import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    imgSrc: "/ecom2.jpg",
    title: "Summer Collection 2026",
    description: "Discover the latest trends in sustainable fashion.",
    accent: "bg-blue-600",
  },
  {
    imgSrc: "/ecom1.jpg",
    title: "Next-Gen Accessories",
    description: "Elevate your daily carry with our premium leather goods.",
    accent: "bg-indigo-600",
  },
  {
    imgSrc: "/ecom3.jpg",
    title: "Abstract Living",
    description: "Interior decor inspired by modern art and vibrant colors.",
    accent: "bg-purple-600",
  },
];

const CarouselPage = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Optimization: Image Preloading Logic
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.imgSrc;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered, nextSlide]);

  return (
    <div
      className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-slate-950 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Controls */}
      <div className="absolute inset-0 z-30 flex items-center justify-between px-4 pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white pointer-events-auto hover:bg-white hover:text-slate-900 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white pointer-events-auto hover:bg-white hover:text-slate-900 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent z-10" />
          
          {/* Optimization: Conditional Loading Props */}
          <img
            src={slides[current].imgSrc}
            alt={slides[current].title}
            className="h-full w-full object-cover"
            // First slide loads immediately, others load when the browser is idle
            loading={current === 0 ? "eager" : "lazy"}
            // Improves rendering performance
            decoding="async"
          />

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-24 max-w-4xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className={`inline-block px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-4 ${slides[current].accent}`}>
                New Arrival
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                {slides[current].title}
              </h2>
              <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl leading-relaxed">
                {slides[current].description}
              </p>
              
              <button
                onClick={() => navigate("/products")}
                className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl"
              >
                Shop the Collection
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="relative h-1.5 transition-all duration-300 rounded-full overflow-hidden bg-white/20"
            style={{ width: current === index ? "48px" : "12px" }}
          >
            {current === index && (
              <motion.div 
                layoutId="activeBar"
                className="absolute inset-0 bg-white"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarouselPage;