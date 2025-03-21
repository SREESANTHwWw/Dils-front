import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { server } from '../../../Server';
import { ProductsContext } from '../../Context/ProductsContext';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [status, setStatus] = useState("");
  const { formatPrice,  loading,setLoading } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("");
  const [finishFilter, setFinish] = useState([]);
  const navigate = useNavigate();

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
  }, [currentPage,]);
useEffect(()=>{
  setFinish(allOrders)
},[allOrders])
  
  // Format date using moment.js
  const formatDate = (date) => {
    if (!date) return ""; // Return empty if date is not provided

    const formattedDate = moment(date);

    if (!formattedDate.isValid()) {
      console.error("Invalid date:", date);
      return "";
    }

    return formattedDate.format("DD-MM-YYYY");
  };

  // Filter orders by the formatted date
  const formatingSearchData = formatDate(filter);

 const handleSubmit = ()=>{
  if (!filter) {
    setFinish(allOrders); // If no filter, show all orders
  } else {
    const filterOrders = allOrders.filter((res) => {
      const formattedOrderDate = formatDate(res.orderDate);
      // Perform a proper date comparison, not an includes check
      return formattedOrderDate === formatingSearchData;
    });
    setFinish(filterOrders); // Set filtered orders
  }

 }

 



const handleViewOrder = (order)=>{
  navigate(`/admin/vieworders/${order._id}`)
}

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-500';
      case 'Order Confirmed':
        return 'text-green-500';
      case 'Shipped':
        return 'text-blue-500';
      case 'Delivered':
        return 'text-gray-500';
      case 'Canceled':
        return 'text-red-500';
      default:
        return 'text-black';
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
      <div className='flex justify-between'>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h2>

        <div className="flex items-center gap-2 mb-6">
  <input
    type="search"
    placeholder="Search by date (MM-DD-YYYY)..."
    value={filter}
    onChange={(e) => {
      setFilter(e.target.value);
      if (e.target.value === "") {
        setFinish(allOrders); // Reset to all orders if input is cleared
      }
    }}
    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
  />
  <button
    onClick={handleSubmit}
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
  >
    Search
  </button>
  <button
    onClick={() => {
      setFilter(""); // Clear input field
      setFinish(allOrders); // Reset to all orders
    }}
    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none"
  >
    Clear
  </button>
</div>

      </div>

      {allOrders && finishFilter.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-100">
        <tr className="border-b">
          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">SL No</th>
          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Shop</th>
          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">User</th>
          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Phone</th>
          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total Amount</th>
          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Order Date</th>
          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {finishFilter.map((order, index) => (
          <tr key={order._id} className="border-b hover:bg-gray-50">
            <td className="py-3 px-4 text-sm text-gray-800">{index + 1}</td>

            {order.UserData && order.UserData.length > 0 ? (
              <>
                <td className="py-3 px-4 text-sm text-gray-600">{order.UserData[0].shopname}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{order.UserData[0].username}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{order.UserData[0].phonenumber}</td>
              </>
            ) : (
              <>
                <td className="py-3 px-4 text-sm text-gray-600">-</td>
                <td className="py-3 px-4 text-sm text-gray-600">-</td>
                <td className="py-3 px-4 text-sm text-gray-600">-</td>
              </>
            )}

            <td className="py-3 px-4 text-sm text-gray-800">{formatPrice(order.subtotal)}</td>
            <td className={`py-3 px-4 text-sm font-semibold ${getStatusColor(order.status)}`}>
              {order.status}
            </td>
            <td className="py-3 px-4 text-sm text-gray-800">{new Date(order.orderDate).toLocaleDateString()}</td>
            <td className="py-3 px-4 text-sm">
              <button
                onClick={() => handleViewOrder(order)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                View Order
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p className="text-gray-500 text-center mt-4">No orders available.</p>
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
