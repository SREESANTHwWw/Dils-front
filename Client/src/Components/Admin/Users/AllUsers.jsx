import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../Server";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/get-users`)
      .then((res) => setUsers(res.data.getusers))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${server}/delete-user/${id}`)
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        })
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setEditUser(null);
    setIsModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`${server}/edit-user/${editUser._id}`, editUser)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === editUser._id ? { ...user, ...editUser } : user
          )
        );
        handleModalClose();
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Users Management</h2>
      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              {[
                "Shop Name",
                "Owner",
                "Phone",
                "Address",
                "Username",
                "Pincode",
                "City",
                "WhatsApp",
                "State ID",
                "Type",
                "GST No",
                "Actions",
              ].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{user.shopname}</td>
                  <td className="p-3">{user.owner}</td>
                  <td className="p-3">{user.phonenumber}</td>
                  <td className="p-3">{user.address}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.pincode}</td>
                  <td className="p-3">{user.city}</td>
                  <td className="p-3">{user.whatsappno}</td>
                  <td className="p-3">{user.stateid}</td>
                  <td className="p-3">{user.type}</td>
                  <td className="p-3">{user.gstno}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={12}
                  className="p-4 text-center text-gray-500 italic"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editUser && (
  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-4 w-full sm:w-11/12 md:w-2/3 lg:w-1/3 shadow-2xl transform transition-all scale-95 hover:scale-100 max-h-[100vh] ">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Edit User</h3>
      <form
        onSubmit={handleEditSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {[
          "shopname",
          "owner",
          "phonenumber",
          "whatsappno",
          "address",
          "city",
          "pincode",
          "gstno",
          "username",
          "type",
          "stateid",
        ].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              name={field}
              value={editUser[field] || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition"
            />
          </div>
        ))}

        <div className="col-span-2 flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={handleModalClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}



    </div>
  );
};

export default AllUsers;
