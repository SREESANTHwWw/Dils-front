import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const FooterLink = ({ children, href = "#" }) => (
  <a 
    href={href} 
    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 pt-20 pb-10 flex flex-col items-center">
      <div className="w-[90%] max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-6">
          <span className="font-black text-3xl text-white tracking-tighter italic">
            DILS<span className="text-indigo-500">TRADES</span>
          </span>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            Your premier destination for high-quality trades and industrial supplies. Building the future, one order at a time.
          </p>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Customer Service</h4>
          <nav className="flex flex-col gap-3">
            <FooterLink>Order Status</FooterLink>
            <FooterLink>Return Policy</FooterLink>
            <FooterLink>Shipping & Delivery</FooterLink>
            <FooterLink>Help & FAQs</FooterLink>
            <FooterLink>Security Center</FooterLink>
          </nav>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Quick Resources</h4>
          <nav className="flex flex-col gap-3">
            <FooterLink>Specials & Offers</FooterLink>
            <FooterLink>Truck & Tool Rental</FooterLink>
            <FooterLink>Moving Supplies</FooterLink>
            <FooterLink>Gift Cards</FooterLink>
            <FooterLink>Catalog Subscriptions</FooterLink>
          </nav>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Stay Updated</h4>
          <p className="text-slate-500 text-sm">Join our newsletter for the latest deals and updates.</p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500 transition-colors"
            />
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
            >
              Subscribe Now
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-[90%] max-w-7xl border-t border-slate-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
        <div className="text-slate-600 text-xs font-medium">
          © 2026 <span className="text-slate-400">Dils Trades</span>. Designed with precision.
        </div>
      </div>
    </footer>
  );
};

export default Footer;