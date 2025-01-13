import React, { useContext } from "react";
import { ProductsContext } from "../Components/Context/ProductsContext";
import { Link } from "react-router-dom";

const LoopProduct = () => {
  const { product } = useContext(ProductsContext); // Assuming you have a context to manage products

  return (
    <div className="w-full bg-gradient-to-r h-[300px]bg-gradient-to-r from-gray-200 to-gray-300
 shadow-lg text-white flex justify-center items-center py-4">
      <div className="overflow-hidden w-full max-w-7xl mx-auto">
        <div className="flex  whitespace-nowrap animate-marquee items-center">
          {product.map((item, index) => (
            <div
              key={index}
              className="mr-8 p-4 h-[280px] w-[280px] bg-white text-black rounded-lg shadow-lg  justify-center items-center gap-4"
            >
                 <Link to={`/viewproduct/${item._id}`}>
              <img
                src={item.product_img}
                alt={item.productname}
                className="w-full h-56 object-cover"
              />
              <div className="flex justify-center">
                <p className="font-medium">{item.productname}</p>
               
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoopProduct;
