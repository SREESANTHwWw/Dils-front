import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../Server";
import { ProductsContext } from "../Context/ProductsContext";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import theme from "@material-tailwind/react/theme";
const CheckOutComponent = () => {
  const [address, setAddress] = useState([]);
  const location = useLocation();
  const { price,medium,premium, product } = location.state || {};
  const [subtotal, setSubtotal] = useState(0);
  const [ cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const { formatPrice ,cartlength} = useContext(ProductsContext);
  const [addAddress, setAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState([]); // Track selected address
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [Pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [state, setState] = useState("");
  const localdata = localStorage.getItem("user_id");
  const userId = localdata ? JSON.parse(localdata) : null;

  // Fetch cart details
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const res = await axios.get(`${server}/getAll-cart/${userId}`);
        setCart(res.data.cart.items);
        setSubtotal(res.data.cart.subtotal);
      } catch (error) {
        console.error("Failed to fetch cart details:", error);
      }
    };
  
    // Check for price, medium, or premium and update state
    if (price || medium || premium) {
      const selectedPrice = price || medium || premium; // Pick the first valid price
      setSubtotal(selectedPrice);
      setCart([product]);
    } else {
      // Fetch cart details if no price is provided
      fetchCartDetails();
    }
  }, [price, medium, premium, product, server, userId]); // Dependencies
  

  // Fetch saved addresses
  useEffect(() => {
    if (userId) {
      axios.get(`${server}/getAddress/${userId}`).then((res) => {
        setAddress(res.data);
      });
    }
  }, [userId]);

  // Order placement function
  const ordering = () => {
    if (!selectedAddress) {
      toast.warning("Please select a shipping address.",{theme:"colored"});
      return;
    }

    const orderDetails = cart.map((item) => ({
      productname: item.productname,
      price: item.price,
      minimum_order_quantity: item.minimum_order_quantity,
      address: selectedAddress, // Use selected address
    }));

    
    setLoading(true);
    axios
      .post(`${server}/create-order`, {
        userId,
        orderDetails,
        address: selectedAddress,
        subtotal,
        paymentMethod,
      })
      .then((res) => {
        console.log("Order Created:", res.data);
        toast.success("Order successfully placed!",{theme:"colored"});
        navigate("/");
      })
      .catch((error) => {
        console.error("Order creation failed:", error);
        toast.error("Failed to place order. Please try again later.",{theme:"colored"});
      })
      .finally(() => setLoading(false));
  };

  // Handle adding new address
  const handleAddress = () => {
    axios
      .post(`${server}/add-address`, {
        userId,
        fullname,
        Pincode,
        city,
        phonenumber,
        landmark,
        state,
      })
      .then((res) => { 
       
        toast.success("Address added");
        axios.get(`${server}/getAddress/${userId}`).then((response) => {
          setAddress(response.data);  // Update the address state with the latest data
        });
        setAddAddress(false);
        setFullname("");
        setPhonenumber("");
        setCity("");
        setPincode("");
        setLandmark("");
        setState("");
      })
      .catch((err) => {
        toast.error("Invalid credentials");
      });
  };
  const handleDeleteAddress = (id) => {
    // Confirm if the user really wants to delete the address
    if (window.confirm("Are you sure you want to delete this address?")) {
      setLoading(true); // Optional: Show loading indicator while waiting for the request
  
      // Send the DELETE request to the server
      axios
        .delete(`${server}/delete-address/${userId}/${id}`)
        .then((res) => {
          toast.success("Address deleted successfully!");
  
          // Optionally: Update the address list or state here if necessary
          // For example, you could filter the deleted address from the list:
          setAddress((prevAddresses) => prevAddresses.filter((address) => address._id !== id));
  
          setLoading(false); // Hide loading indicator after request
        })
        .catch((err) => {
          toast.error("Failed to delete address. Please try again.");
          setLoading(false); // Hide loading indicator if there's an error
        });
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center w-[100%] bg-blue-950 h-[80px] px-6  shadow-md">
        <span className="text-white text-xl font-semibold">Dils Trades</span>
        <span className="text-white text-lg font-medium">Checkout</span>
        <div className="flex flex-col items-center gap-1 relative">
                 <Link to="/cart" className="relative">
                   <HiOutlineShoppingCart className="text-3xl text-white hover:text-yellow-500 transition duration-300" />
                   {cartlength.length > 0 && (
                     <span className="absolute top-[-8px] right-[-10px] bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                       {cartlength.length}
                     </span>
                   )}
                 </Link>
             
               </div>
      </div>

      {/* Loading Indicator */}
      {loading && <div className="text-blue-600 mt-4 ">
        <img class="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon"/>
        </div>}
      

      {/* Address Section */}
      {Array.isArray(address) && address.length > 0 ? (
  <div className="w-[75%] mt-8 bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4 text-gray-800">Shipping Address</h2>
    {address.map((e, index) => (
      <div key={index} className="border-t border-gray-200 pt-4 flex justify-between items-center">
        <div className="flex-1">
          <div className="text-gray-800 font-semibold">{e.fullname}</div>
          <div className="text-gray-600">{e.phonenumber}</div>
          <div className="text-gray-600">{e.landmark}</div>
          <div className="text-gray-600">{e.Pincode}</div>
          <div className="text-gray-600">{e.city}, {e.state}</div>
        </div>
        
        <div className="flex gap-3">
          {/* Select Button */}
          <button
            onClick={() => setSelectedAddress(e)} // Set selected address
            className={`ml-4 text-blue-600 border px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition ${selectedAddress === e ? 'bg-blue-600 text-white' : ''}`}
          >
            {selectedAddress === e ? "Selected" : "Select"}
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDeleteAddress(e._id)}  // Assuming 'e._id' is the address ID for deletion
            className="text-red-600 border px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
          >
            Delete
          </button>
          <button
      onClick={() => setAddAddress(true)}
      className="text-blue-600 text-sm hover:bg-blue-900 hover:text-white rounded-md border"
    >
      Add Address
    </button>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="w-[75%] mt-8 bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4 text-gray-800">Shipping Address</h2>
    <button
      onClick={() => setAddAddress(true)}
      className="text-blue-600 hover:underline"
    >
      Add Address
    </button>
  </div>
)}

      {/* Address Modal */}
      {addAddress && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Address</h2>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullname}
                  className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setFullname(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="number"
                  placeholder="PhoneNumber"
                  value={phonenumber}
                  className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setPhonenumber(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Pincode</label>
                <input
                  type="number"
                  value={Pincode}
                  placeholder="Pincode"
                  className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setPincode(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Landmark</label>
                <input
                  type="text"
                  value={landmark}
                  placeholder="Near park or mall"
                  className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setLandmark(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  placeholder="City"
                  className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setCity(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">State</label>
                <select
                  className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setState(e.target.value)}
                  value={state}
                >
                  <option value="" disabled>
                    Choose a state
                  </option>
                  <option value="kerala">Kerala</option>
                  <option value="tamilnadu">Tamil Nadu</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                onClick={() => setAddAddress(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={handleAddress}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Payment Method */}
      <div className="w-[75%] mt-6 bg-white p-6 rounded-lg shadow-md">
        
        <div className="flex flex-col gap-2">
       {/* Payment Method */}

  <h2 className="text-lg font-semibold mb-4 text-gray-800">Payment Method</h2>
  <p className="text-gray-600 mb-4">Subtotal: {formatPrice(subtotal)}</p>
  <div className="flex flex-col gap-2">
    
    <label>
      <input
        type="radio"
        name="payment"
        value="Cash on Delivery"
        defaultChecked
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      Cash on Delivery
    </label>
  </div>


        </div>
      </div>

      {/* Place Order Button */}
      <div className="w-[75%] mt-8 mb-4 flex justify-end">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          onClick={ordering}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOutComponent;
