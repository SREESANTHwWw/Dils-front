import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server } from "../../Server";
import { ProductsContext } from "../Context/ProductsContext";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Userorders = () => {
  const [order, setOrders] = useState([]); // State for orders
  const [userId, setUserId] = useState(null); // State for userId
  const { formatPrice ,cartdata } = useContext(ProductsContext);
  // Fetch userId from localStorage once
  useEffect(() => {
    const localdata = localStorage.getItem("user_id");
    if (localdata) {
      setUserId(JSON.parse(localdata));
    }
  }, []);

  // Fetch orders
  const fetchOrder = () => {
    if (userId) {
      axios
        .get(`${server}/getorder/${userId}`)
        .then((res) => {
          console.log("Fetched orders:", res.data.getorders);
          const ord = res.data.getorders
          setOrders(ord.reverse()); // Update state with fetched orders
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
        });
    }
  };

  // Trigger fetchOrder when userId changes
  useEffect(() => {
    fetchOrder();
  }, [userId]);
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-500'; // Yellow for Pending
      case 'Order Confirmed':
        return 'text-green-500'; // Green for Order Confirmed
      case 'Shipped':
        return 'text-blue-500'; // Blue for Shipped
      case 'Delivered':
        return 'text-gray-500'; // Gray for Delivered
      case 'Canceled':
        return 'text-red-500'; // Red for Canceled
      default:
        return 'text-black'; // Default color
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
   
      {Array.isArray(order) && order.length > 0 ? (
        order.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-md p-6 mb-4 hover:scale-105 transform transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order ID: {order._id}
            </h2>

            {/* Products */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Products:
              </h3>
              {Array.isArray(order.products) ? (
                order.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                  >
                    
                    <p className="text-gray-600">{product.productname}</p>
                    <div className="flex justify-around w-[120px] ">
                    <p className="text-gray-800 font-medium">
                      {(product.minimum_order_quantity)}
                    </p>
                    x
                    <p className="text-gray-800 font-medium">
                      {formatPrice(product.price)}
                    </p>
                  

                    </div>
                 
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No products found</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="flex justify-between items-center mt-4">
              <span
                className={getStatusColor(order.status)}
               
              >
                Status: {order.status}
              </span>
              <span className="text-lg font-bold text-gray-800">
                Total: {formatPrice(order.subtotal)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-12">
          <p className="text-lg text-gray-500">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default Userorders;
