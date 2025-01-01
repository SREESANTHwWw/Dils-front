import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../Server";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CategoryContext } from "../../Context/CategoryContext";

const AddProduct = ({onSuccess}) => {
  const [productname, setProductname] = useState("");
  const [product_img, setProduct_img] = useState(null);
  const [price, setPrice] = useState("");
  const [unitid, setUnitid] = useState("");
  const [description, setdescription] = useState("");
  const [medium_price, setmediumPrice] = useState("");
  const [premium_price, setPremiumprice] = useState("");
  const [minimum_order_quantity, setMinQty] = useState("");
  // const [Product_id, setProductid] = useState("");
  const [fast_moving, setfastMove] = useState("");
  const [isActive, setActive] = useState(false);
  // const [reorder_id, setOrderid] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [fileMetadata, setFileMetadata] = useState(null);const [fileId, setFileId] = useState("");
  const {category} = useContext(CategoryContext)
  const [categoryProduct, setCategoryProduct] = useState(null);
  const [product, setProduct] = useState([]);
  const[ mRP ,setMRP] = useState("")
  const categoryValue = categoryProduct ? categoryProduct : null;

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
    // NewProduct.append("Product_id", Product_id);
    NewProduct.append("fast_moving", fast_moving);
    NewProduct.append("isactive", isActive);
    NewProduct.append("mRP", mRP);
    // NewProduct.append("reorder_id", reorder_id);
   
    if (categoryValue) {
      NewProduct.append("categoryProduct", categoryValue);
    }
    axios
      .post(`${server}/create-products`, NewProduct, config)
      .then((res) => {
        if (res.data.msg === "success") {
          toast.success("Product Created Successfully", { theme: "colored" });

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
          setMRP("")
        
        } else {
          toast.error("invalid credentials", { theme: "colored" });
        }
      })
      .catch((err) => console.log(err));
  };

  const handlerfileInputs = (e) => {
    const file = e.target.files[0];
    setProduct_img(file);
  };
  const handleSelect = (e)=>{
    setCategoryProduct(e.target.value)
  }
  useEffect(()=>{
    axios
    .get(`${server}/get-products`)
    .then((res) => setProduct(res.data.product));
  },[])
  
  return (
    <div className="w-full sm:h-[550px] h-[900px] flex flex-col justify-center items-center bg-gray-50 py-28 ">
      <button onClick={onSuccess}>X</button>

      <form
        className="space-y-6 w-full sm:w-[80%] md:w-[60%] lg:w-[100%] px-5   shadow-lg rounded-lg"
        onSubmit={addProduct}
      >
        <div className="grid sm:grid-cols-3 grid-cols-1  gap-6  ">
          <input
            className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
            placeholder="Product Name"
            name="productname"
            onChange={(e) => setProductname(e.target.value)}
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
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {product_img && product_img.name}
            </span>
          </div>
          <input
            className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400
            "
            type="number"
          
            placeholder="Price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
            placeholder="Unit "
            name="unitid"
              type="number"
            onChange={(e) => setUnitid(e.target.value)}
          />
          <input
            className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
            placeholder="Description"
            name="description"
            onChange={(e) => setdescription(e.target.value)}
          />
          <input
            className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
            placeholder="Medium Price"
            name="medium_price"
              type="number"
            onChange={(e) => setmediumPrice(e.target.value)}
          />
          <input
            className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
            placeholder="Premium Price"
            name="premium_price"
              type="number"
            onChange={(e) => setPremiumprice(e.target.value)}
          />
           <input
            className="w-full h-12 px-4 py-2  rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
            placeholder="mRP "
            name="mRP"
              type="number"
            onChange={(e) => setMRP(e.target.value)}
          />
          <input
            className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
            placeholder="Minimum Order Quantity"
            name="minimum_order_quantity"
              type="number"
            onChange={(e) => setMinQty(e.target.value)}
          />
          {/* <input
            className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
            placeholder="Product ID"
            name="Product_id"
            onChange={(e) => setProductid(e.target.value)}
          /> */}
          <input
            className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
            placeholder="Fast Moving"
            name="fast_moving"
            onChange={(e) => setfastMove(e.target.value)}
          />
          <div className="flex items-center w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400 ">
            <input
              type="checkbox"
              name="isactive"
              onChange={(e) => setActive(e.target.checked)}
              className="mr-2"
            />
            <span className="text-gray-600">Is Active</span>
          </div>
          {/* <input
            className="w-full h-12 px-4 py-2 rounded-md shadow-md border border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400"
            placeholder="Reorder ID"
            name="reorder_id"
            onChange={(e) => setOrderid(e.target.value)}
          /> */}
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Sub Category Name:</label>
            <select name="categoryProduct" value={categoryProduct} onChange={handleSelect} className="w-full px-4 py-2 border rounded-md">
        <option value={null}>-- Select an option --</option>
        {category  && category.length > 0 ? (
                category.map((category) => (
                  
                  <option key={category._id} value={category._id } >
                    {category.Category_name} 
                  </option>
                ))
              ) : (
                <option>No categories available</option>
              )}
      </select>
          </div>
        <div className="w-full flex justify-center items-center">
          <button className="w-[300px] h-12 bg-blue-800 text-white rounded-md hover:bg-blue-950 transition duration-300 mt-4">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
