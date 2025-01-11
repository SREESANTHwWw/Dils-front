import React from 'react';
import Category from '../../Pages/Category';
import HomeProduct from '../../Pages/HomeProduct';
import CategoryContextProvider from '../Context/CategoryContext'; 
import Footer from '../../Pages/Footer';
import  Carousel  from '../../Pages/CarouselPage';

const HomeComponent = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white scroll-smooth ">
       <div className="w-full b">
            <Carousel/>
          </div>
      <CategoryContextProvider>
        <div className="w-full max-w-7xl mx-auto px-4 ">
  
          
            
         
         

          
          <div className="w-full">
            <HomeProduct />
          </div>
         
        </div> 
        <div className='w-full  bg-blue-950'>
            <Footer/>
          </div>
      </CategoryContextProvider>
    </div>
  );
};

export default HomeComponent;
