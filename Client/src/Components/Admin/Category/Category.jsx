import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, LayersIcon, PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { server } from "../../../Server";
import SubCate from "./SubCate";
import { Link, Route, useNavigate } from "react-router-dom";
import AddProduct from "../AddProducts/AddProducts";
 
// Import the new component

const Category = () => {
  const [currentData, setCurrentData] = useState([]);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState(null);
  const [hasSubcategory, setHasSubcategory] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [openEditmodal, setEditOpenmodal] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState("");
const [editCategoryImg, setEditCategoryImg] = useState(null);
const [editHasSubcategory, setEditHasSubcategory] = useState(false);
const [editCategoryId, setEditCategoryId] = useState(null);
 
  const navigate = useNavigate();
  //productstates


  // Fetch category list
  const fetchCategories = () => {
    axios
      .get(`${server}/get-category`)
      .then((res) => {
        const categoriesWithoutSubcategory = res.data.getAllcategory.filter(
          (category) =>
            !category.subCategory || category.subCategory.trim() === ""
        );
        setCategories(categoriesWithoutSubcategory);
        setCurrentData(categoriesWithoutSubcategory); // Initialize with categories without subcategories
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = () => {
    setAddCategoryOpen(true);
  };

  // Add Category Function
  const addCategoryFun = (e) => {
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const newCategory = new FormData();
    newCategory.append("Category_name", categoryName);
    newCategory.append("Category_img", categoryImg);
    newCategory.append("hasSubcategory", hasSubcategory);

    if (currentCategoryId) {
      newCategory.append("parentCategoryId", currentCategoryId); // Pass category ID when adding a subcategory
    }

    axios
      .post(`${server}/add-category`, newCategory, config)
      .then((res) => {
        if (res.data.msg === "success") {
          const addedCategory = res.data.category; // Assuming the response returns the added category
          setCurrentData((prevData) => [addedCategory, ...prevData]);
          
          toast.success("Category created successfully", { theme: "colored" });
          setAddCategoryOpen(false);
          setCategoryName("");
          setCategoryImg(null);
          setHasSubcategory(false);

        } else {
          toast.error("Invalid credentials", { theme: "colored" });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong", { theme: "colored" });
      });
  };

 
  // Delete Category
  const dltCate = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
   
    axios
      .delete(`${server}/delete-cate/${id}`)
      .then(() =>
        setCurrentData((prev) => prev.filter((item) => item._id !== id))
      )
      .catch((err) => console.error("Error deleting category:", err));
  };
  }
  // Manage Category
  const handleManage = (id) => {
    navigate(`/admin/subcategory/${id}`);
  };

 
  const handleProduct = (id) => {
    setCategoryValue(id);
   
    console.log("hai");
  };
  //if the product already exists
  const handleViewProduct = (id) => {
    navigate(`/admin/viewproduct/${id}`);
  };

//edit category 
// const openEdit = () => {
//   setEditOpen(true);
//   setUpdateCate(category);
// }; 

const openEdit = (item) => {
  setCategoryName(item.Category_name);
  setCategoryImg(item.Category_img); // Keep the existing image initially
  setHasSubcategory(item.hasSubcategory);
  setEditCategoryId(item._id);
  setEditOpenmodal(true);
};
  
const closeEditModal = () => {
  setEditOpenmodal(false);
  
};


const updateCategory = (e) => {
  e.preventDefault();

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  const updatedCategory = new FormData();
  updatedCategory.append("Category_name", categoryName);

  // Update only if a new image is uploaded
  if (categoryImg) {
    updatedCategory.append("Category_img", categoryImg);
  }

  updatedCategory.append("hasSubcategory", hasSubcategory);

  // Send the patch request to update the category
  axios.patch(`${server}/edit-category/${editCategoryId}`, updatedCategory, config)
    .then((res) => {
      if (res.data.msg === "success") {
        const editedCategory = res.data.updatedCategory; // Assuming the response returns the updated category

        // Update the state by replacing the old category with the edited one
        setCurrentData((prevData) => {
          return prevData.map((category) => {
            if (category._id === editedCategory._id) {
              return { ...category, ...editedCategory }; // Replace the category with updated data
            }
            return category; // Keep other categories as they are
          });
        });

        // Show success message and reset state
        toast.success("Category Edited successfully", { theme: "colored" });
        setCategoryName("");
        setCategoryImg(null);
        setHasSubcategory(false);
        setEditOpenmodal(false); // Close the edit modal
      } else {
        toast.error("Error editing category", { theme: "colored" });
      }
    })
    .catch((error) => {
      console.error("Error updating category:", error);
      toast.error("Something went wrong", { theme: "colored" });
    });
};



  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Category List</h2>
        <button
          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md"
          onClick={addCategory}
        >
          <PlusCircle size={18} />
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        {currentData && currentData.length > 0 ? (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-4 px-4 text-left text-gray-700">SL NO</th>
                <th className="py-4 px-4 text-left text-gray-700">
                  Category/Subcategory Name
                </th>
                <th className="py-4 px-4 text-left text-gray-700">Image</th>
                <th className="py-4 px-4 text-left text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 text-gray-700"
                >
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4">
                    {item.Category_name || item.name}
                  </td>
                  
                  <td className="py-4 px-4">
                    <img
                      src={item.Category_img}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2 flex-wrap md:flex-nowrap">
                      <button
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition-colors flex items-center gap-1"
                        onClick={() => dltCate(item._id)}
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                      <button
                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition-colors flex items-center gap-1"
                        onClick={()=>openEdit(item)}
                      >
                        <Pencil size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      {item.hasSubcategory === true ? (
                        <button
                          className="px-3 py-1 text-white rounded bg-gray-700 transition-colors flex items-center gap-1"
                          onClick={() => handleManage(item._id)}
                        >
                          Manage
                          <LayersIcon size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleViewProduct(item._id)}
                          className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600 transition-colors flex items-center gap-1"
                        >
                         View Product
                        </button>
                      )}  
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500 text-center py-10">
            No Category Available
          </div>
        )}
      </div>

      {addCategoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white w-96 p-6 rounded-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Add/Edit Category
                </h2>
                <form onSubmit={addCategoryFun}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Category Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Category Image:
                    </label>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => setCategoryImg(e.target.files[0])}
                      className="w-full"
                    />
                      {categoryImg && categoryImg instanceof File ? (
  <img
    src={URL.createObjectURL(categoryImg)}
    alt="Preview"
    className="mt-2 w-32 h-32 object-cover"
  />
) : (
  editCategoryImg && <img src={editCategoryImg} alt="Existing" className="mt-2 w-32 h-32 object-cover" />
)}
                    
                  </div>
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      checked={hasSubcategory}
                      onChange={(e) => setHasSubcategory(e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium">
                      Has Subcategory?
                    </label>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setAddCategoryOpen(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    {openEditmodal && (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
      <form onSubmit={updateCategory}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
  <label className="block text-sm font-medium mb-2">Category Image:</label>
  <input
    type="file"
    accept=".jpg, .jpeg, .png"
    onChange={(e) => setCategoryImg(e.target.files[0])}
    className="w-full"
  />
  {categoryImg && categoryImg instanceof File ? (
  <img
    src={URL.createObjectURL(categoryImg)}
    alt="Preview"
    className="mt-2 w-32 h-32 object-cover"
  />
) : (
  editCategoryImg && <img src={editCategoryImg} alt="Existing" className="mt-2 w-32 h-32 object-cover" />
)}

</div>


        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={hasSubcategory}
            onChange={(e) => setHasSubcategory(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium">Has Subcategory?</label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={closeEditModal}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Category;
