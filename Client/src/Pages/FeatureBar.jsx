import React from "react";
import { motion } from "framer-motion";
import { Headphones, ShieldCheck, Truck, RotateCcw } from "lucide-react";

const FeatureBar = () => {
  const features = [
    {
      icon: <Headphones className="text-blue-600" size={32} />,
      title: "24/7 Support",
      description: "Dedicated assistance",
      color: "bg-blue-50",
    },
    {
      icon: <ShieldCheck className="text-emerald-600" size={32} />,
      title: "Secure Payment",
      description: "Encrypted transactions",
      color: "bg-emerald-50",
    },
    {
      icon: <Truck className="text-indigo-600" size={32} />,
      title: "Free Shipping",
      description: "On orders over ₹999",
      color: "bg-indigo-50",
    },
    {
      icon: <RotateCcw className="text-rose-600" size={32} />,
      title: "Easy Returns",
      description: "30-day money back",
      color: "bg-rose-50",
    },
  ];

  return (
    <div className="w-full bg-slate-50/50 py-12 px-4 border-y border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="flex items-center gap-5 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
          >
            {/* Icon Container with dynamic background */}
            <div className={`p-4 rounded-xl ${feature.color} shrink-0`}>
              {feature.icon}
            </div>

            <div>
              <h4 className="font-bold text-slate-800 text-sm md:text-base leading-tight">
                {feature.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBar;