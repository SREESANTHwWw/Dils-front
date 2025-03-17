import React, { useState, useEffect } from "react";
import EditProducts from "./AddProducts/EditProducts";
import AllUsers from "./Users/AllUsers";
import Category from "./Category/Category";
import Orders from "./Allorders/Orders";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import SubCate from "./Category/SubCate";
import SubCateProduct from "./Category/SubCateProduct";
import Unit from "./Unit/Unit";

import ViewOrders from "./ViewOrders/ViewOrders";
import AdminDashBoard from "./AdminDash/AdminDashBoard";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    localStorage.clear();
    window.location.reload() // Clear stored data
    navigate("/login"); // Redirect to login page
  };

  // Toggle Dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="flex h-screen  bg-gray-100">
      {/* Sidebar */}
   
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow-md p-4">
          {/* Page Title */}
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>

          {/* User Account Dropdown */}
          <div className="relative dropdown">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <UserCircleIcon className="h-8 w-8 text-gray-700" />
              <ChevronDownIcon className="h-5 w-5 text-gray-700" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="dashboard" element={<AdminDashBoard/>} />
            <Route path="category" element={<Category />} />
            <Route path="orders" element={<Orders />} />
            <Route path="vieworders/:id" element={<ViewOrders />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="unit" element={<Unit />} />
            <Route path="editProducts" element={<EditProducts />} />
             <Route path="subcategory/:id" element={<SubCate />} />
             <Route path="viewproduct/:id"element={<SubCateProduct/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
