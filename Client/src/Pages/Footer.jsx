import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-[400px] bg-blue-950 py-10 gap-8">
      <div className="w-[80%] flex justify-center mb-4">
        <span className="font-bold text-4xl text-white sm:underline">
          Dils Trades
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-8 w-[85%]">
        <div className="flex flex-col items-center gap-5">
          <span className="text-white text-xl hover:text-yellow-500 cursor-pointer transition-all tracking-widest font-medium">
            Service
          </span>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Check your Order Status
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Order Cancellation
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Return Policy
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Shipping & Delivery
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Help & FAQs
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Privacy & Security Center
          </a>
        </div>

        <div className="flex flex-col items-center gap-5">
          <span className="text-white text-xl hover:text-yellow-500 cursor-pointer transition-all tracking-widest font-medium">
            Resources
          </span>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Specials & Offers
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Truck & Tool Rental
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Moving Supplies & Rentals
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Gift Cards
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Catalog
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Subscriptions
          </a>
        </div>

        <div className="flex flex-col items-center gap-5">
          <span className="text-white text-xl hover:text-yellow-500 cursor-pointer transition-all tracking-widest font-medium">
            About Us
          </span>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Careers
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Investor Relations
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Suppliers & Providers
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Affiliate Program
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Corporate Responsibility
          </a>
          <a href="#" className="underline text-yellow-500 sm:text-sm">
            Privacy & Security Center
          </a>
        </div>

        <div className="flex flex-col items-center gap-5   p-4 rounded-lg">
          <span className="text-white text-lg">Stay Updated</span>
          <div className="flex flex-col sm:flex-row  gap-3 w-full">
            <input
              type="email"
              placeholder="Your Email Address"
              className="sm:w-[130px] h-[40px] rounded-md outline-none px-1 placeholder:text-sm"
            />
            <button className="bg-yellow-500  h-[40px] rounded-md px-1 text-white">
              Subscribe
            </button>
          </div>

          <div className="flex gap-5">
            <a href="#">
              <img
                className="w-6 h-5"
                src="../../public/facebook.png"
                alt="Facebook"
              />
            </a>
            <a href="#">
              <img
                className="w-6 h-5"
                src="../../public/twitter.png"
                alt="Twitter"
              />
            </a>
            <a href="#">
              <img className="w-6 h-5" src="../../link.png" alt="LinkedIn" />
            </a>
            <a href="#">
              <img
                className="w-6 h-5"
                src="../../public/yt.png"
                alt="YouTube"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="w-[80%] bg-slate-300 h-[1px]"></div>

      <div className="w-[78%] flex justify-between items-center text-white">
        <span>© 2024 All Rights Reserved</span>
        <span>Made by Dils Trades</span>
      </div>
    </div>
  );
};

export default Footer;
