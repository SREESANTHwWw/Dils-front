import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaShoppingCart, FaClipboardList, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { server } from "../../../Server";


const AdminDashBoard = () => {
  const [ProductOrders, setProductOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [charData, setCharData] = useState([]);






  console.log(users)
  console.log(ProductOrders)
  // Function to fetch orders and users
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [productRes, userRes] = await Promise.all([
          axios.get(`${server}/getorders`),
          axios.get(`${server}/get-all-users`),
        ]);

        setProductOrders(productRes.data.getorders);
        setUsers(userRes.data.getusers);

        const formattedData = FormateChartData(
          productRes.data.getorders,
          userRes.data.getusers
        );
        setCharData(formattedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Filtering Delivered and Pending Orders
  const Delivered = ProductOrders.filter((item) => item.status === "Delivered");
  const Pending = ProductOrders.filter((item) => item.status === "Pending");

  // Function to format chart data
  const FormateChartData = (ProductOrders, users) => {
    const Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const OrderCounts = Months.map((month, index) => {
      const productOrders = ProductOrders.filter(
        (order) => new Date(order.orderDate).getMonth() === index
      ).length;

      const serviceOrders = users.filter(
        (user) => new Date(user.createdAt).getMonth() === index
      ).length; // Using `dateJoined` for users

      return { name: month, productOrders, serviceOrders };
    });

    return OrderCounts;
  };

  useEffect(() => {
    if (ProductOrders.length > 0 || users.length > 0) {
      const chartData = FormateChartData(ProductOrders, users);
      setCharData(chartData);
    }
  }, [ProductOrders, users]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Dashboard Header */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaClipboardList className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Users Orders</h3>
            <p className="text-gray-600">{users.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaShoppingCart className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Product Orders</h3>
            <p className="text-gray-600">{ProductOrders.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaEnvelope className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Delivered Orders </h3>
            <p className="text-gray-600">{Delivered.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaClipboardList className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-medium">Pending Orders</h3>
            <p className="text-gray-600">{Pending.length}</p>
          </div>
        </div>
      </div>

      {/* Sales Graph */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Order Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={charData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="productOrders"
              stroke="#28906FFF"
              strokeWidth={2}
              name="Product Orders"
            />

            <Line
              type="monotone"
              dataKey="serviceOrders"
              stroke="#101887FF"
              strokeWidth={2}
              name="Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders Table */}
  
    </div>
  );
};

export default AdminDashBoard;
