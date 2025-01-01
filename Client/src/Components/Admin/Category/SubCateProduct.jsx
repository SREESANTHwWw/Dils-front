import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../../../Server'
import { useParams } from 'react-router-dom'
import { Pencil, Trash2, LayersIcon, PlusCircle } from "lucide-react";
import { toast } from 'react-toastify';


const SubCateProduct = () => {
    const {id} = useParams()

    const [filterData, setFilterData] = useState([])
     const [addPopen, setAddpopen] = useState(false);
     const [productname, setProductname] = useState("");
     const [product_img, setProduct_img] = useState(null);
     const [price, setPrice] = useState("");
     const [unitid, setUnitid] = useState("");
     const [description, setdescription] = useState("");
     const [medium_price, setmediumPrice] = useState("");
     const [premium_price, setPremiumprice] = useState("");
     const [minimum_order_quantity, setMinQty] = useState("");
     const [fast_moving, setfastMove] = useState("");
     const [isActive, setActive] = useState(false);
     const [mRP, setMRP] = useState("");
     const [categoryValue, setCategoryValue] = useState(id || "");



    useEffect(()=>{
        axios.get(`${server}/get-products/${id}`).then((res) => {
            console.log(res.data);
            const SubCateProduct = res.data.GetcategoryProuduct;
          
            if (SubCateProduct  && SubCateProduct.length > 0) {
              setFilterData(SubCateProduct);
            }
          });
    },[]    )


 const addProduct = (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const NewProduct = new FormData();
    NewProduct.append("productname", productname);
    NewProduct.append("product_img", product_img);
    NewProduct.append("price", price);
    NewProduct.append("unitid", unitid);
    NewProduct.append("description", description);
    NewProduct.append("medium_price", medium_price);
    NewProduct.append("premium_price", premium_price);
    NewProduct.append("minimum_order_quantity", minimum_order_quantity);

    NewProduct.append("fast_moving", fast_moving);
    NewProduct.append("isactive", isActive);
    NewProduct.append("mRP", mRP);

    if (categoryValue) {
      NewProduct.append("categoryProduct", categoryValue);
    }
    axios
      .post(`${server}/create-products`, NewProduct, config)
      .then((res) => {
        if (res.data.msg === "success") {
          toast.success("Product Created Successfully", { theme: "colored" });
          setFilterData((prevData) => [res.data.products, ...prevData]);
          setAddpopen(false); 
          setProductname("");
          setProduct_img(null);
          setPrice("");
          setUnitid("");
          setdescription("");
          setmediumPrice("");
          setMinQty("");

          setfastMove("");
          setActive(false);
          setOrderid("");
          setUploadedFileUrl(res.data.file.fileUrl);
          setFileId(res.data.file._id);
          setFileMetadata(res.data.file);
          setMRP("");
        } else {
          toast.error("invalid credentials", { theme: "colored" });
        }
      })
      .catch((err) => console.log(err));
  };
    const addProductOpen = () => {
        setAddpopen(true)
    }

    
  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${server}/delete-product/${id}`)
        .then((res) => {
          setFilterData((preval) => preval.filter((pro) => pro._id !== id));
        })
        .catch((err) => toast.error("Error deleting Product:", err));
    }
  };

  return (
<div className="flex flex-col items-center w-full p-4">

    <div className='w-full flex justify-between items-center'>
    <h2 className="text-2xl font-bold mb-4">Products</h2>
      <button
          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md"
          onClick={addProductOpen}
        >
          <PlusCircle size={18} />
          Add Product
        </button>
      

    </div>
      

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

        {addPopen && (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 relative">
      <div className="w-full flex flex-col justify-center items-center bg-white py-12 rounded-lg">
        <form
          className="space-y-6 w-full sm:w-[80%] md:w-[70%] lg:w-[80%] px-6  rounded-lg"
          onSubmit={addProduct}
        >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
            {/* Product Name */}
            <input
              className="w-full h-14 px-5 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Product Name"
              name="productname"
              onChange={(e) => setProductname(e.target.value)}
            />
            
            {/* Product Image */}
            <div className="relative">
              <input
                className="w-full h-14 px-5 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                placeholder="Upload Product Image"
                type="file"
                name="product_img"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setProduct_img(e.target.files[0])}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {product_img && product_img.name}
              </span>
            </div>

            {/* Price */}
            <input
              className="w-full h-14 px-5 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              type="number"
              placeholder="Price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            {/* Unit */}
            <input
              className="w-full h-14 px-5 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Unit"
              name="unitid"
              type="number"
              onChange={(e) => setUnitid(e.target.value)}
            />

            {/* Description */}
            <input
              className="w-full h-14 px-5 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Description"
              name="description"
              onChange={(e) => setdescription(e.target.value)}
            />
            {/* Medium Price */}
            <input
              className="w-full h-14 px-5 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Medium Price"
              name="medium_price"
              type="number"
              onChange={(e) => setmediumPrice(e.target.value)}
            />
            {/* Premium Price */}
            <input
              className="w-full h-14 px-5 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Premium Price"
              name="premium_price"
              type="number"
              onChange={(e) => setPremiumprice(e.target.value)}
            />
            
            {/* Minimum Order Quantity */}
            <input
              className="w-full h-14 px-5 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Minimum Order Quantity"
              name="minimum_order_quantity"
              type="number"
              onChange={(e) => setMinQty(e.target.value)}
            />
            
            {/* Fast Moving */}
            <input
              className="w-full h-14 px-5 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Fast Moving"
              name="fast_moving"
              onChange={(e) => setfastMove(e.target.value)}
            />

            {/* Is Active Checkbox */}
            <div className="flex items-center w-full h-14 px-4 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none">
              <input
                type="checkbox"
                name="isactive"
                onChange={(e) => setActive(e.target.checked)}
                className="mr-3"
              />
              <span className="text-gray-600">Is Active</span>
            </div>
          </div>

          <div className="w-full flex justify-between items-center mt-6">
            {/* Add Product Button (aligned to the right) */}
            <button className="w-[200px] h-14 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Add Product
            </button>

            {/* Close Button (aligned to the left) */}
            <button
              className="w-[200px] h-14 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
              onClick={() => setAddpopen(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

        </div>
        </div>
  )
}

export default SubCateProduct