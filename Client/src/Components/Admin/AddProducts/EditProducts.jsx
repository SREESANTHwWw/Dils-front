import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server } from "../../../Server";
import { toast } from "react-toastify";
import { ProductsContext } from "../../Context/ProductsContext";
import { IoSearch } from "react-icons/io5";

const EditProducts = () => {
  const {     filterData, 
    Addtocartfun, 
    formatPrice, 
    currentPage, 
    pageNumbers, 
    totalPages, 
    setCurrentPage  } = useContext(ProductsContext);
  const [product, setProduct] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [updateProduct, setUpdateProduct] = useState("");


  


  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${server}/delete-product/${id}`)
        .then((res) => {
          setProduct((preval) => preval.filter((pro) => pro._id !== id));
        })
        .catch((err) => toast.error("Error deleting Product:", err));
    }
  };

  const openEditBox = (product) => {
    setUpdateProduct(product);
    setOpenEdit(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  const handlerfileInputs = (e) => {
    const file = e.target.files[0];
    setUpdateProduct((prev) => ({ ...prev, product_img: file }));
  };

  const savechange = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in updateProduct) {
        formData.append(key, updateProduct[key]);
      }
      await axios.patch(
        `${server}/edit-product/${updateProduct._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProduct((prev) =>
        prev.map((product) =>
          product._id === updateProduct._id ? updateProduct : product
        )
      );
      setOpenEdit(false);
      setCurrentProduct(null);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      

      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse">
          <thead className="rounded-md">
            <tr className="bg-blue-900 text-white ">
              <th className="p-2 border text-sm">Productname</th>
              <th className="p-1 border  text-sm">Product image</th>
              <th className="p-1 border  text-sm">Price</th>
              <th className="p-1 border  text-sm">Unit</th>
              <th className="p-1 border  text-sm">Description</th>
              <th className="p-1 border  text-sm">Medium Price</th>
              <th className="p-1 border  text-sm">Premium Price</th>
              <th className="p-1 border  text-sm">Minimum Order</th>
             
              <th className="p-1 border">fast Moving</th>
              <th className="p-1 border">Active</th>
             
              <th className="p-1 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterData && filterData.length > 0 ? (
              filterData.map((user, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="p-2 border">{user.productname}</td>
                  <td className="p-2 border">
                    <img src={user.product_img} alt="" className="w-28 h-28 rounded-lg object-cover" />
                    </td>
                  <td className="p-2 border">₹{user.price}</td>
                  <td className="p-2 border">{user.unitid}</td>
                  <td className="p-2 border">{user.description}</td>
                  <td className="p-2 border">₹{user.medium_price}</td>
                  <td className="p-2 border">₹{user.premium_price}</td>
                  <td className="p-2 border">{user.minimum_order_quantity}</td>
                 
                  <td className="p-2 border">{user.fast_moving}</td>
                  <td className="p-2 border">{user.isActive ? "YES" : "NO"}</td>
                 
                  <div className="w-[150px] flex justify-around">
                    <button
                      className="bg-green-600 w-[70px] h-[30px] rounded-md text-white font-bold hover:bg-green-950"
                      onClick={() => openEditBox(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 w-[70px] h-[30px] rounded-md text-white font-bold hover:bg-red-950"
                      onClick={() => deleteProduct(user._id)}
                    >
                      {" "}
                      Delete
                    </button>
                  </div>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="p-4 text-center">
                  No Product found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {openEdit && updateProduct && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-3xl">
              <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

              <div className="w-full sm:h-full h-[900px] flex flex-col justify-center items-center bg-gray-50 py-28 ">
                <form
                  className="space-y-6 w-full sm:w-[80%] md:w-[60%] lg:w-[100%] px-5   shadow-lg rounded-lg"
                  onSubmit={savechange}
                >
                  <div className="grid sm:grid-cols-2 grid-cols-1  gap-6  ">
                    <input
                      className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                      placeholder="Productname"
                      value={updateProduct.productname}
                      name="productname"
                      onChange={handleInputChange}
                    />
                    <div className="relative">
                      <input
                        className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                        placeholder="Upload Product Image"
                        type="file"
                        name="product_img"
                        accept=".jpg, .jpeg, .png"
                        onChange={handlerfileInputs}
                      />
                    </div>
                    <input
                      className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                      placeholder="Price"
                      value={updateProduct.price}
                      name="price"
                      onChange={handleInputChange}
                    />
                    <input
                      className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                      placeholder="Unit ID"
                      name="unitid"
                      value={updateProduct.unitid}
                      onChange={handleInputChange}
                    />
                    <input
                      className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                      placeholder="Description"
                      name="description"
                      value={updateProduct.description}
                      onChange={handleInputChange}
                    />
                    <input
                      className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                      placeholder="Medium Price"
                      name="medium_price"
                      value={updateProduct.medium_price}
                      onChange={handleInputChange}
                    />
                    <input
                      className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                      placeholder="Premium Price"
                      name="premium_price"
                      value={updateProduct.premium_price}
                      onChange={handleInputChange}
                    />
                    <input
                      className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                      placeholder="Minimum Order Quantity"
                      name="minimum_order_quantity"
                      value={updateProduct.minimum_order_quantity}
                      onChange={handleInputChange}
                    />
               
                    <input
                      className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                      placeholder="Fast Moving"
                      name="fast_moving"
                      value={updateProduct.fast_moving}
                      onChange={handleInputChange}
                    />
                    <div className="flex items-center w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400 ">
                      <input
                        type="checkbox"
                        name="isactive"
                        checked={updateProduct.isActive}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-gray-600">Is Active</span>
                    </div>
               
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <button className="w-[300px] h-12 bg-blue-800 text-white rounded-md hover:bg-blue-950 transition duration-300 mt-4">
                      Save change
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-6 space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-4 py-2 border rounded-md hover:bg-gray-200 ${currentPage === page ? 'bg-blue-900 text-white' : 'bg-white'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default EditProducts;
