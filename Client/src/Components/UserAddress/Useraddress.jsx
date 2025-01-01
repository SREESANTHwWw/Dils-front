import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../../Server';

export const Useraddress = () => {
  const localdata = localStorage.getItem('user_id');
  const userId = localdata ? JSON.parse(localdata) : null;
  const [address, setaddress] = useState([]);

  const fetchaddress = () => {
    axios.get(`${server}/getAddress/${userId}`).then((res) => {
      setaddress(res.data);
    });
  };

  useEffect(() => {
    fetchaddress();
  }, [userId]);

  console.log(address);

  return (
    <div className="min-h-screen py-8 flex justify-center">
      {address.length > 0 ? (
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Saved Addresses
          </h2>
          <div className="space-y-6">
            {address.map((e, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-semibold text-gray-800">
                    {e.fullname}
                  </div>
                  <div className="text-gray-600">{e.phonenumber}</div>
                  <div className="text-gray-600">{e.landmark}</div>
                  <div className="text-gray-600">{e.Pincode}</div>
                  <div className="text-gray-600">
                    {e.city}, {e.state}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl text-gray-800 font-medium">
            No saved addresses found!
          </h2>
          <p className="text-gray-500 mt-2">
            Add a new address to get started.
          </p>
        </div>
      )}
    </div>
  );
};
