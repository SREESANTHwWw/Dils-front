import React from "react";
import { FaHeadset, FaCreditCard, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";

const FeatureBar = () => {
  const features = [
    {
      icon: <FaHeadset className="text-blue-500 text-2xl" />,
      title: "24/7 SUPPORT",
      description: "Support every time",
    },
 
    {
      icon: <FaShieldAlt className="text-blue-500 text-2xl" />,
      title: "SECURED PAYMENT",
      description: "100% secured",
    },
    {
      icon: <FaTruck className="text-blue-500 text-2xl" />,
      title: "FREE SHIPPING",
      description: "Order over ₹100",
    },
    {
      icon: <FaUndo className="text-blue-500 text-2xl" />,
      title: "30 DAYS RETURN",
      description: "30 days guarantee",
    },
  ];

  return (
    <div className="w-full bg-white shadow-md py-6">
      <div className="max-w-7xl mx-auto flex flex-wrap  justify-between items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-4 p-4 border-r last:border-r-0 border-gray-200"
          >
            {feature.icon}
            <div>
              <p className="font-semibold text-gray-800">{feature.title}</p>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBar;
