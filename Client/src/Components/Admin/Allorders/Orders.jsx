import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { server } from '../../../Server';
import { ProductsContext } from '../../Context/ProductsContext';

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [status, setStatus] = useState("");
  const { formatPrice } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all orders
  const fetchAllOrders = () => {
    axios
      .get(`${server}/getAllorders?page=${currentPage}`)
      .then((res) => {
        setAllOrders(res.data.getorders); // Assuming 'getorders' is an array
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  useEffect(() => {
    fetchAllOrders();
  }, [currentPage]);

  // Update Order Status
  const handleUpdateStatus = (orderId) => {
    axios.patch(`${server}/updateOrders/${orderId}`, {
      status,
    }).then((res) => {
      fetchAllOrders();
    });
  };

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

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h2>
      {allOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Products</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Subtotal</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Order Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-800">{order._id}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.products && order.products.map((product, index) => (
                      <div key={index}>
                        <p><strong>{product.productname}</strong> x {product.minimum_order_quantity}</p>
                        <p className="text-gray-500">{formatPrice(product.price)}</p>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">{formatPrice(order.subtotal)}</td>
                  <td className={`py-3 px-4 text-sm ${getStatusColor(order.status)}`}>{order.status}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex gap-2 items-center">
                      {/* Update status dropdown */}
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-1 text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Order Confirmed">Order Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                      <button
                        onClick={() => handleUpdateStatus(order._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No orders available.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-6 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 border rounded-md bg-blue-700  text-white hover:bg-blue-950 ${currentPage === page ? '  hover:text-white' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-6 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
