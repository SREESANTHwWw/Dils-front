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
     const [producteditModal ,setOpenProductEdit] =useState(false)
       const [updateProductId ,setUpdateProductID] = useState("")
     



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
  
      NewProduct.append("product_img",product_img ); // Append each image

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

  const openEditBox =(product)=>{
    setUpdateProductID(product._id)
    setProductname(product.productname)
    setProduct_img(product.product_img)
    setPrice(product.price)
    setUnitid(product.unitid)
    setmediumPrice(product.medium_price)
    setPremiumprice(product.premium_price)
    setMinQty(product.minimum_order_quantity)
    setMRP(product.mRP)
    setdescription(product.description)
    setfastMove(product.fast_moving)
   
    setOpenProductEdit(true)


  }
  const savechange = (e)=>{

    e.preventDefault()
    const config ={
      headers:{"Content-Type":"multipart/form-data"}
    }
    const formData = new FormData()
    formData.append("productname", productname);
    formData.append("product_img",product_img );
    formData.append("price", price);
      formData.append("unitid", unitid);
      formData.append("description", description);
      formData.append("medium_price", medium_price);
      formData.append("premium_price", premium_price);
      formData.append("minimum_order_quantity", minimum_order_quantity);
      formData.append("fast_moving", fast_moving);
      formData.append("isactive", isActive);
      formData.append("mRP", mRP);
      console.log(formData);
    
      axios.patch(`${server}/edit-product/${updateProductId}`,formData,config).then((res)=>{
        if(res.data.msg === "success"){
          const  products = res.data.editProduct
          setFilterData((prevData) => {
            return prevData.map((category) => {
              if (category._id === products._id) {
                return { ...category, ...products }; // Replace the category with updated data
              }
              return category; // Keep other categories as they are
            });
          });
          toast.success("Product Edited Successfully",{theme:"colored"})
          setOpenProductEdit(false)
        }
      })
    



  }

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
              <th className="p-1 border">MRP</th>
             
              <th className="p-1 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterData && filterData.length > 0 ? (
              filterData.map((product, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="p-2 border">{product.productname}</td>
                  <td className="p-2 border">
  <img className='w-28 h-28 rounded-lg object-cover' src={product.product_img} alt="" />
</td>
                  <td className="p-2 border">₹{product.price}</td>
                  <td className="p-2 border">{product.unitid}</td>
                  <td className="p-2 border">{product.description}</td>
                  <td className="p-2 border">₹{product.medium_price}</td>
                  <td className="p-2 border">₹{product.premium_price}</td>
                  <td className="p-2 border">{product.minimum_order_quantity}</td>
                 
                  <td className="p-2 border">{product.fast_moving}</td>
                  <td className="p-2 border">{product.mRP}</td>
                 
                  <div className="w-[150px] flex flex-col items-center gap-5">
                    <button
                      className="bg-green-600 w-[70px] h-[30px] rounded-md text-white font-bold hover:bg-green-950"
                      onClick={() => openEditBox(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 w-[70px] h-[30px] rounded-md text-white font-bold hover:bg-red-950"
                      onClick={() => deleteProduct(product._id)}
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
            {/* <input
  className="w-full h-14 px-5 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
  placeholder="Upload Product Images"
  type="file"
  name="product_img"
  accept=".jpg, .jpeg, .png"
  multiple
  onChange={(e) => setProduct_img(Array.from(e.target.files))}
/> */}


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
              placeholder="MRP"
              name="MRP"
              type="text"
              onChange={(e) => setMRP(e.target.value)}
            />
          <div>
                
                <select
                  name="type"
                  value={unitid}
                  onChange={(e)=>setUnitid(e.target.value)}
                  className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition"
                >
                  <option value="" disabled>Select Type</option>
                  <option value="MTR">MTR</option>
                  <option value="SETT">SETT</option>
                  <option value="LTR">LTR</option>
                  <option value="ROll">ROll</option>
                  <option value="No">No</option>
                  <option value="KG">KG</option>
                  <option value="No unit">None of the above</option>
                </select>
              </div>

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
            {/* <div className="flex items-center w-full h-14 px-4 py-2 rounded-lg shadow-md border border-gray-300 focus:border-blue-500 outline-none">
              <input
                type="checkbox"
                name="isactive"
                onChange={(e) => setActive(e.target.checked)}
                className="mr-3"
              />
              <span className="text-gray-600">Is Active</span>
            </div> */}
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
 {producteditModal &&  (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50  backdrop-blur-sm flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-3xl relative">
      {/* Close Button */}
      <button
        onClick={() => setOpenProductEdit(false)}
        className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-2xl font-bold"
      >
        &times;
      </button>

      <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

      <div className="w-full sm:h-full h-[900px] flex flex-col justify-center   items-center bg-gray-50 py-10">
        <form
          className="space-y-6 w-full sm:w-[80%] md:w-[60%] lg:w-[100%] px-5 shadow-lg rounded-lg"
          onSubmit={savechange}
        >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
            <input
              className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Product Name"
              value={productname}
              name="productname"
              onChange={(e)=>setProductname(e.target.value)}
            />
            <div className="relative">
              <input
                className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
                placeholder="Upload Product Image"
                type="file"
                name="product_img"
                accept=".jpg, .jpeg, .png"
                onChange={(e)=>setProduct_img(e.target.files[0])}
              />
            </div>
            <input
              className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Price"
              value={price}
              name="price"
              onChange={(e)=>setPrice(e.target.value)}
            />
            <div>
                
                <select
                  name="type"
                  value={unitid}
                  onChange={(e)=>setUnitid(e.target.value)}
                  className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition"
                >
                  <option value="" disabled>Select Type</option>
                  <option value="MTR">MTR</option>
                  <option value="SETT">SETT</option>
                  <option value="LTR">LTR</option>
                  <option value="ROll">ROll</option>
                  <option value="No">No</option>
                  <option value="KG">KG</option>
                  <option value="No unit">None of the above</option>
                </select>
              </div>
            <input
              className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e)=>setdescription(e.target.value)}
            />
            <input
              className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Medium Price"
              name="medium_price"
              value={medium_price}
              onChange={(e)=>setmediumPrice(e.target.value)}
            />
            <input
              className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Premium Price"
              name="premium_price"
              value={premium_price}
              onChange={(e)=>setPremiumprice(e.target.value)}
            />
            <input
              className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Minimum Order Quantity"
              name="minimum_order_quantity"
              value={minimum_order_quantity}
              onChange={(e)=>setMinQty(e.target.value)}
            />
            <input
              className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Fast Moving"
              name="fast_moving"
              value={fast_moving}
              onChange={(e)=>setfastMove(e.target.value)}
            />
             <input
              className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
              placeholder="Fast Moving"
              name="fast_moving"
              value={mRP}
              onChange={(e)=>setMRP(e.target.value)}
            />
           
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="w-[300px] h-12 bg-blue-800 text-white rounded-md hover:bg-blue-950 transition duration-300 mt-4" type="submit" >
              Save Changes
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