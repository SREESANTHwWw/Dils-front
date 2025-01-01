import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { server } from "../../../Server";
import axios from "axios";
import { Pencil, Trash2, LayersIcon, PlusCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const SubCate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState([]);
  const [Category_name, setCategoryName] = useState("");
  const [Category_img, setCategoryImg] = useState(null);
  const [hasSubcategory, setHasSubcategory] = useState(false);
  const [subCategory, setSubcategoryid] = useState(id || "");

  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  console.log(id);

  // Fetch categories
  useEffect(() => {
    axios.get(`${server}/get-category/${id}`).then((res) => {
      console.log(res.data);
      const subcategories = res.data.getsub_category;
      const filterdata = subcategories.filter(
        (item) => item.subCategory === id
      );
      if (subcategories && filterdata && subcategories.length > 0) {
        setCurrentData(subcategories);
      }
    });
  }, [id]);
  console.log(subCategory);
  const openAddCategoryModal = () => {
    setAddCategoryOpen(true);
  };

  const addCategoryFun = (e) => {
    e.preventDefault();

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const NewCategory = new FormData();
    NewCategory.append("Category_name", Category_name);
    NewCategory.append("Category_img", Category_img);
    NewCategory.append("hasSubcategory", hasSubcategory);
    if (subCategory) {
      NewCategory.append("subCategory", subCategory);
    }

    axios
      .post(`${server}/add-category`, NewCategory, config)
      .then((res) => {
        if (res.data.msg === "success") {
          // Optimistically update the local state to reflect the added category
          const addedCategory = res.data.category; // Assuming the response returns the added category
          setCurrentData((prevData) => [addedCategory, ...prevData]); // Add the new category to the top of the list

          toast.success("Category created successfully", { theme: "colored" });
          setAddCategoryOpen(false); // Close the modal
        } else {
          toast.error("Error in category creation", { theme: "colored" });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong", { theme: "colored" });
      });
  };

  // Delete Category
  const dltCate = (id) => {
    axios
      .delete(`${server}/delete-cate/${id}`)
      .then(() =>
        setCurrentData((prev) => prev.filter((item) => item._id !== id))
      )
      .catch((err) => console.error("Error deleting category:", err));
  };
  const handleManage = (subid) => {
    navigate(`/admin/subcategory/${subid}`);

    const filterdata = currentData.filter((item) => item.subCategory === subid);
    if (filterdata.length > 0) {
      setCurrentData(filterdata);
    } else {
      setCurrentData([]);
    }
    setSubcategoryid(subid);
  };


  const handleViewProduct = (id) => {
    navigate(`/admin/viewproduct/${id}`);
  };


  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Category List</h2>
        <button
          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md"
          onClick={openAddCategoryModal}
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
                      <button className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition-colors flex items-center gap-1">
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
            No Subcategory Available
          </div>
        )}
      </div>

      {/* Add Category Modal */}
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
                      value={Category_name}
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
    </div>
  );
};

export default SubCate;
