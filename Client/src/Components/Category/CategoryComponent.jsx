import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { TbSquareRoundedArrowRight } from "react-icons/tb";
import { CategoryContext } from "../Context/CategoryContext";
import axios from "axios";
import { server } from "../../Server";

const CategoryComponent = () => {
  const { category } = useContext(CategoryContext);
  
const filterCategory =()=>{
  
}
 




  return (
    <div className="xl:w-[80%] sm:w-[70%] w-[95%] xl:h-auto sm:h-[100px] h-auto my-16 mt-[10rem] mx-auto">

      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-semibold text-blue-950 relative cursor-pointer transition-all ease-in-out group">
          Categories
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-950 transition-all ease-in-out group-hover:w-[100%]"></span>
        </span>
        <button className="text-3xl text-blue-950 hover:text-yellow-600 transition-all ease-in-out">
          <TbSquareRoundedArrowRight />
        </button>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center bg-slate-100 p-6 rounded-lg shadow-lg" onClick={filterCategory}>
        {category.slice(0, 6).map((e) => (
          <div
            key={e._id}
            className="w-[140px] sm:w-[180px] h-[80px] bg-white rounded-md shadow-lg flex flex-col items-center justify-center transform transition-all hover:scale-105 hover:shadow-xl hover:bg-blue-50"
          >
            <img
              className="w-[40px] sm:w-[50px] h-[40px] sm:h-[50px] object-cover"
              src={e.Category_img}
              alt={e.Category_name}
            />
            <span className="mt-2 text-sm sm:text-base  text-blue-950">{e.Category_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryComponent;
