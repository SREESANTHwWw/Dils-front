import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server } from "../../../Server";
import { toast } from "react-toastify";
import { ProductsContext } from "../../Context/ProductsContext";
import { IoSearch } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa"

const EditProducts = () => {
  const {     filterData, 
    setFilterData,
    Addtocartfun, 
    formatPrice, 
    currentPage, 
    pageNumbers, 
    totalPages, 
    setCurrentPage  } = useContext(ProductsContext);
  const [product, setProduct] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [updateProduct, setUpdateProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [productFilter,setProductFilter] = useState("")
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
  const [updateProductId ,setUpdateProductID] = useState("")
   const [unitList, setUnitList] = useState([]);


  


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
    setOpenEdit(true);
  };

  
  

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
          setOpenEdit(false)
        }
      })
    



  }
  useEffect(() => {
    axios
      .get(`${server}/getunit`)
      .then((res) => setUnitList(res.data.getUnit))
      .catch((err) => console.error("Error fetching units:", err));
  }, []);


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

  useEffect(()=>{
    if(!searchQuery){
      setProductFilter(filterData)

    }else{
      const filteringProduct = filterData.filter((product)=>
        product.productname.toLowerCase().includes(searchQuery)||
        product.description.toLowerCase().includes(searchQuery)||
      
        product.unitid.toLowerCase().includes(searchQuery)
        
      )
      setProductFilter(filteringProduct)
    }

  },[searchQuery,filterData])

  

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="w-full flex justify-between">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="flex items-center mb-4 space-x-2">
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
    placeholder="Search product..."
    className="w-64 h-10 px-4 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
  />
 
</div>
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
            {productFilter && productFilter.length > 0 ? (
              productFilter.map((product, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="p-2 border">{product.productname}</td>
                  <td className="p-2 border">
                    <img src={product.product_img} alt="" className="w-28 h-28 rounded-lg object-cover" />
                    </td>
                  <td className="p-2 border">₹{product.price}</td>
                  <td className="p-2 border">{product.unitid}</td>
                  <td className="p-2 border">{product.description}</td>
                  <td className="p-2 border">₹{product.medium_price}</td>
                  <td className="p-2 border">₹{product.premium_price}</td>
                  <td className="p-2 border">{product.minimum_order_quantity}</td>
                 
                  <td className="p-2 border">{product.fast_moving}</td>
                  <td className="p-2 border">{product.mRP}</td>
                 <td>
                  <div className="w-[150px]  flex justify-center gap-5 items-center ">
                    <button
                      className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition-colors flex items-center gap-1"
                      onClick={() => openEditBox(product)}
                    >
                      <FaEdit />
                    </button>
            
                    <button
                      className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700 transition-colors flex items-center gap-1"
                      onClick={() => deleteProduct(product._id)}
                    >
                      {" "}
                     <FaTrash/>
                    </button>
                  </div>
                  </td>
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
        {openEdit &&  (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50  backdrop-blur-sm flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-3xl relative">
      {/* Close Button */}
      <button
        onClick={() => setOpenEdit(false)}
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
                  {unitList.map((e,index)=>(
                      <option key={index} value={e.unitname} >{e.unitname}</option>

                  ))}
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
