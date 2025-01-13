import React from "react";
import Category from "../../Pages/Category";
import HomeProduct from "../../Pages/HomeProduct";
import CategoryContextProvider from "../Context/CategoryContext";
import Footer from "../../Pages/Footer";
import Carousel from "../../Pages/CarouselPage";
import LoopProduct from "../../Pages/LoopProduct";
import FeatureBar from "../../Pages/FeatureBar";

const HomeComponent = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white scroll-smooth ">
      <div className="w-full b">
        <Carousel />
      </div>
    
        <div className="w-full max-w-7xl mx-auto px-4 ">
          <div className="w-full">
            <HomeProduct />
          </div>
        </div>
        
        <LoopProduct/>
        <FeatureBar/>
        <div className="w-full  bg-blue-950">
          <Footer />
        </div>
     
    </div>
  );
};

export default HomeComponent;
