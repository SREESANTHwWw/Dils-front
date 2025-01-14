import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../../Server';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2 } from "react-icons/fi"; 
import { toast } from 'react-toastify';

export const Useraddress = () => {
  const localdata = localStorage.getItem('user_id');
  const userId = localdata ? JSON.parse(localdata) : null;
  const [address, setAddress] = useState([]);
  const [editAddressOpen,setEditAddress] = useState(false)
  const navigate = useNavigate();
const [fullname, setFullname] = useState("");
  const [Pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [state, setState] = useState("");
  
  const[addressId,setAddressid]=useState("")
  const fetchAddress = () => {
    axios.get(`${server}/getAddress/${userId}`).then((res) => {
      setAddress(res.data);
    });
  };

 
const edit = (ad)=>{
  setAddressid(ad._id)
  setFullname(ad.fullname)
  setPhonenumber(ad.phonenumber)
  setLandmark(ad.landmark)
  setPincode(ad.Pincode)
  setCity(ad.city)
  setState(ad.state)
  setEditAddress(true)

}


  const editAddress = (e ) => {
    e.preventDefault()
    
      

    axios.patch(`${server}/editAddress/${addressId}`,{
      fullname,
      Pincode,
      city,
      phonenumber,
      landmark,
      state,


    }).then((res) =>{
         const editedAddress = res.data.editedAddress
        
         setAddress((prev) =>
          prev.map((unit) => (unit._id === editedAddress._id ? editedAddress : unit))
        );
        setEditAddress(false)
        })
  };


  useEffect(() => {
    fetchAddress();
  }, [userId]);
  const handleDeleteAddress = (id) => {
    // Confirm if the user really wants to delete the address
    if (window.confirm("Are you sure you want to delete this address?")) {
      // Optional: Show loading indicator while waiting for the request
  
      // Send the DELETE request to the server
      axios
        .delete(`${server}/delete-address/${userId}/${id}`)
        .then((res) => {
          toast.success("Address deleted successfully!");
  
          // Optionally: Update the address list or state here if necessary
          // For example, you could filter the deleted address from the list:
          setAddress((prevAddresses) => prevAddresses.filter((address) => address._id !== id));
  
         // Hide loading indicator after request
        })
        .catch((err) => {
          toast.error("Failed to delete address. Please try again.");
       // Hide loading indicator if there's an error
        });
    }
  };


  

  return (
    <div className="min-h-screen py-8 flex justify-center">
      {address.length > 0 ? (
        <div className="w-full  bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Saved Addresses</h2>
          <div className="space-y-6">
            {address.map((e, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-wrap gap-2">
                  <div className="text-lg font-semibold text-gray-800">{e.fullname}</div>
                  <div className="text-gray-600">{e.phonenumber}</div>
                  <div className="text-gray-600">{e.landmark}</div>
                  <div className="text-gray-600">{e.Pincode}</div>
                  <div className="text-gray-600">
                    {e.city}, {e.state}
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => edit(e)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                  <FiEdit className="mr-2" /> 
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(e._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                   <FiTrash2 className="mr-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl text-gray-800 font-medium">No saved addresses found!</h2>
          <p className="text-gray-500 mt-2">Add a new address to get started.</p>
        </div>
      )}
      {editAddressOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Address</h2>
  
              {/* Form Fields */}
              <form onSubmit={editAddress}>
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
                  onClick={() => setEditAddress(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  type='submit'
                >
                  Save Address
                </button>
              </div>
              </form>
            </div>
          </div>
      )}
    </div>
  );
};
