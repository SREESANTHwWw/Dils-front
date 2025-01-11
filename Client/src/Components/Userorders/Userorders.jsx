import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server } from "../../Server";
import { ProductsContext } from "../Context/ProductsContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Userorders = () => {
  const [order, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const { formatPrice } = useContext(ProductsContext);

  useEffect(() => {
    const localdata = localStorage.getItem("user_id");
    if (localdata) {
      setUserId(JSON.parse(localdata));
    }
  }, []);

  const fetchOrder = () => {
    if (userId) {
      axios
        .get(`${server}/getorder/${userId}`)
        .then((res) => {
          const ord = res.data.getorders;
          setOrders(ord.reverse());
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
        });
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Order Confirmed":
        return "text-green-500";
      case "Shipped":
        return "text-blue-500";
      case "Delivered":
        return "text-gray-500";
      case "Canceled":
        return "text-red-500";
      default:
        return "text-black";
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      {Array.isArray(order) && order.length > 0 ? (
        order.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 transform transition-all duration-300 hover:shadow-lg"
          >
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              Order ID: {order._id}
            </h2>

            {/* Products */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Products:
              </h3>
              {Array.isArray(order.products) ? (
                order.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                  >
                    <p className="text-xs text-gray-600">
                      {product.productname}
                    </p>
                    <div className="flex justify-around w-[120px]">
                      <p className="text-xs text-gray-800 font-medium">
                        {product.minimum_order_quantity}
                      </p>
                      <span className="text-gray-600 mx-1">x</span>
                      <p className="text-xs text-gray-800 font-medium">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">No products found</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="flex justify-between items-center mt-4">
              <span className={`text-xs font-medium ${getStatusColor(order.status)}`}>
                Status: {order.status}
              </span>
              <span className="text-sm font-bold text-gray-800">
                Total: {formatPrice(order.subtotal)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default Userorders;
