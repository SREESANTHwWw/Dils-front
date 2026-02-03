import React from "react";
import { motion } from "framer-motion";
import HomeProduct from "../../Pages/HomeProduct";
import Footer from "../../Pages/Footer";
import Carousel from "../../Pages/CarouselPage";
import LoopProduct from "../../Pages/LoopProduct";
import FeatureBar from "../../Pages/FeatureBar";

// Animation Variant for section entry
const sectionFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const HomeComponent = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      
      {/* 1. Hero Section - Full Width */}
      <section className="w-full">
        <Carousel />
      </section>

      {/* 2. Main Content Container */}
      <div className="w-full flex flex-col items-center">
        
        {/* Featured Collections / Categories */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionFadeIn}
          className="w-full  mx-auto px-4 md:px-8 py-16"
        >
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">New Arrivals</h2>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full" />
          </div>
          <HomeProduct />
        </motion.section>

        {/* 3. Promotional Loop / Banner */}
        <section className="w-full bg-slate-50 py-12">
          <LoopProduct />
        </section>

        {/* 4. Trust & Feature Bar */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionFadeIn}
          className="w-full py-20 border-y border-slate-100"
        >
          <FeatureBar />
        </motion.section>

        {/* 5. Trending / Secondary Product Grid */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionFadeIn}
          className="w-full  mx-auto px-4 md:px-8 py-16"
        >
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Trending Now</h2>
            <p className="text-slate-500 text-sm italic">Handpicked favorites for the modern lifestyle</p>
          </div>
          <HomeProduct />
        </motion.section>

      </div>

      {/* 6. Footer - High Contrast */}
      <footer className="w-full pt-16">
        <div className=" mx-auto">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default HomeComponent;