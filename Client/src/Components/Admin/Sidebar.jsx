import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
  Package,
  PackageX,
  LogOut,
} from 'lucide-react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', section: 'dashboard' },
    { icon: <Settings size={20} />, label: 'Category Settings', section: 'category' },
    { icon: <ShoppingCart size={20} />, label: 'Orders', section: 'orders' },
    { icon: <Users size={20} />, label: 'Users', section: 'users' },
    // { icon: <Package size={20} />, label: 'Add Product', section: 'addProduct' },
    { icon: <PackageX size={20} />, label: 'Edit Products', section: 'editProducts' },
    { icon: <LogOut size={20} />, label: 'Logout', section: 'logout' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`h-screen shadow-md bg-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        {/* Header */}
        <div className="p-5 border-b flex items-center gap-4">
         
          {!isCollapsed && <h2 className="font-semibold bg-blue-800  flex items-center justify-center rounded-md w-[120px] h-[40px]  text-white">DILS TRADING</h2>}
          <button
            className="ml-auto hover:bg-gray-100 p-2 rounded-lg"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <Bars3Icon className="h-6 w-6 text-gray-800" /> : <XMarkIcon className="h-6 w-6 text-gray-800" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 ">
          {menuItems.map((item, index) => (
            <ul key={index}>
              <li className="flex items-center gap-4 py-2">
                {item.icon}
                {!isCollapsed && (
                  <Link to={`/admin/${item.section}`} className="font-medium text-gray-700 hover:text-blue-500">
                    {item.label}
                  </Link>
                )}
              </li>
            </ul>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
