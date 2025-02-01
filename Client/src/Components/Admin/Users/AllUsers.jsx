import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../Server";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notifiOpen, setNotifiOpen] = useState(false);
  const[title, setTitles] = useState("Dils Trades")
const [body, setBodymessage] = useState("")
const [token, settoken] = useState("")

const [allUser, setallUser] = useState([])
const [searchUser, setSearchUser] = useState("");
const [filterData, setFilterData] = useState([])

  const fetchUsers=()=>{
    axios
    .get(`${server}/get-users?page=${currentPage}`)
    .then((res) => {
      setUsers(res.data.getusers);
      setTotalPages(res.data.totalPages);
    })
    .catch((error) => console.error("Error fetching users:", error));

  }


  useEffect(() => {
    fetchUsers()

  }, [currentPage]);

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

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);



  // Send Notification
  const handleSend = (id) => {
    setNotifiOpen(true);

    axios.get(`${server}/getToken/${id}`).then((res) => {
        const receivedToken = res.data.token?.token; // Safely accessing token
        const error = res.data.error;

        if (error) {
            console.error("Error:", error);
            toast.error("An error occurred while fetching the token.");
            setNotifiOpen(false);
            return;
        }

        if (!receivedToken) {
            toast.info("Permission Not Granted");
            setNotifiOpen(false);
            return;
        }

        settoken(receivedToken);
    }).catch((err) => {
        console.error("Request failed:", err);
        toast.info("Permission Not Granted");
        setNotifiOpen(false);
    });
};

const SendNotication = (e)=>{ 
  axios.post(`${server}/send-notification`,{
    token,
    title,
    body,
  }).then((res)=>{
    console.log(res)
  })


 

}
const getAllusers =()=>{
  axios.get(`${server}/get-all-users`).then((res)=>{
    setallUser(res.data.getusers)
    
  })
}
useEffect(() => {
  getAllusers()
}, [])

useEffect(()=>{

  let filteredUsers = allUser

  if(searchUser){
    filteredUsers = allUser.filter((user)=> user.shopname.toLowerCase().includes(searchUser)) 
  }
  setUsers(filteredUsers)

},[searchUser, allUser])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="w-full flex justify-between">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="flex items-center mb-4 space-x-2">
  <input
    type="text"
    value={searchUser}
    onChange={(e) => setSearchUser(e.target.value.toLowerCase())}
    placeholder="Search ShopName"
    className="w-64 h-10 px-4 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
  />
 
</div>
</div>

      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              {[
                "Shop Name",
                "Shop Photo",
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
                  onClick={() => handleSend(user._id)}
                >
                  <td className="p-3">{user.shopname}</td>
                  <td className="p-3">
                    <img
                      src={user.shopPhoto}
                      alt="Shop"
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                  </td>
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
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition"
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
        <div className="flex justify-center mt-6 gap-4">
  <button
    onClick={handlePrev}
    disabled={currentPage === 1}
    className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors"
  >
    Previous
  </button>
  {pageNumbers.map((page) => (
    <button
      key={page}
      onClick={() => handlePageClick(page)}
      className={`px-4 py-2 border border-gray-300 rounded-mdbg-blue-700  text-white hover:bg-blue-950  transition-colors ${
        currentPage === page
          ? "bg-blue-500 text-white font-semibold"
          : ""
      }`}
    >
      {page}
    </button>
  ))}
  <button
    onClick={handleNext}
    disabled={currentPage === totalPages}
    className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors"
  >
    Next
  </button>
</div>

      </div>
      {
        notifiOpen && ( 
           <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full sm:w-11/12 md:w-2/3 lg:w-1/3 shadow-2xl transform transition-all scale-95 hover:scale-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Send Notification</h3>
            <form onSubmit={SendNotication} className="grid grid-cols-1 gap-4">
              <input value={body} className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition" type="text" onChange={(e)=>setBodymessage(e.target.value)} />
              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  
                  onClick={()=>setNotifiOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </div>
            </form>
         </div>
         </div>

        )
      }

      {/* Edit Modal */}
      {isModalOpen && editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full sm:w-11/12 md:w-2/3 lg:w-1/3 shadow-2xl transform transition-all scale-95 hover:scale-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Edit User
            </h3>
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

              {/* Dropdown for 'type' */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Type
                </label>
                <select
                  name="type"
                  value={editUser.type || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition"
                >
                  <option value="">Select Type</option>
                  <option value="User">User</option>
                  <option value="Premium">Premium</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>

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
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
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
