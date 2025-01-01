
import AddCategory from "./AddCategory";
import { CategoryContext } from "../../Context/CategoryContext";
import { useNavigate } from "react-router-dom";
import AddProduct from "../AddProducts/AddProducts";
import AddSubCat from "./AddSubCat";

export default function CategoryTable() {
  const [categories, setCategories] = useState([]); // Top-level categories
  const [currentData, setCurrentData] = useState([]); // Current data being displayed
  const [path, setPath] = useState([]); // Breadcrumb path for navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditOpen] = useState(false);
  const [updateCategory, setUpdateCate] = useState("");
  const [Category_name, setCategoryName] = useState("");
  const [Category_img, setCategoryImg] = useState(null);
  const [hasSubcategory, setHasSubcategory] = useState(false);
  const [subCategory, setSubcategoryName] = useState(""); // State for Subcategory
  const [subCateory_img, setSubcategoryImg] = useState("");
  const [subcatemodelOpen, setSubcateModelOpen] = useState(false);
  const [productModalOpen, setProductModal] = useState(false);
  const { category } = useContext(CategoryContext);
  const [addPopen, setAddpopen] = useState(false);
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch categories8
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

  const dltCate = (id) => {
    axios
      .delete(`${server}/delete-cate/${id}`)
      .then(() =>
        setCurrentData((prev) => prev.filter((item) => item._id !== id))
      )
      .catch((err) => console.error("Error deleting category:", err));
  };

  const editcategory = async (e) => {
    try {
      const formData = new FormData();
      for (const key in updateCategory) {
        formData.append(key, updateCategory[key]);
      }
      await axios.patch(`/edit-category/${updateCategory._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === updateCategory._id
            ? { ...cat, Category_name: Category_name }
            : cat
        )
      );
      setEditOpen(false);
    } catch (error) {}
  };

  const openEdit = () => {
    setEditOpen(true);
    setUpdateCate(category);
  };
  const closeedit = () => {
    setEditOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeP = () => setAddpopen(false);

  const handleManage = (id) => {
    Promise.all([
      axios.get(`${server}/get-category/${id}`),
      axios.get(`${server}/get-products/${id}`),
    ])
      .then(([categoryres, productres]) => {
        const subcategories = categoryres.data.getsub_category;
        if (subcategories && subcategories.length > 0) {
          setCurrentData(subcategories);
        }
        const categoryproduct = productres.data.GetcategoryProuduct;
        if (categoryproduct && categoryproduct.length > 0) {
          setProductModal(true);
          setCurrentData(productres.data.GetcategoryProuduct);
        }
   
   
    })
    console.log(id)


  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${server}/delete-product/${id}`)
        .then((res) => {
          setCurrentData((preval) => preval.filter((pro) => pro._id !== id));
        })
        .catch((err) => toast.error("Error deleting Product:", err));
    }
  };

  const handleProduct = () => {};

  const opensubModal = () => {
    setSubcateModelOpen(true);
  };

  const handlerFileInputs = (e) => {
    const file = e.target.files[0];
    setCurrentData((prev) => ({ ...prev, Category_img: file }));
    setImagePreview(URL.createObjectURL(file)); // Update preview image
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelect = (e) => {
    setSubcategoryName(e.target.value);
  };

  const closeProduct = () => {
    setProductModal(false);
  };

  const handleSelectChange = (e, itemId) => {
    const { checked } = e.target;
    setSelectedItems((prev) =>
      checked
        ? [...prev, itemId]
        : prev.filter((id) => id !== itemId)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
  {/* Header Section */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold text-gray-700">Category List</h2>
    <button
      onClick={
        currentData && currentData.some((e) => e.hasSubcategory === false)
          ? openModal
          : opensubModal
      }
      className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
    >
      <PlusCircle size={18} />
      <span>
        {currentData && currentData.some((e) => e.hasSubcategory === false)
          ? "Add Category"
          : "Add SubCategory"}
      </span>
    </button>
  </div>

  {/* Table Wrapper */}
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
              <td className="py-4 px-4">{item.Category_name || item.name}</td>
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
                    onClick={openEdit}
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
                      onClick={() => handleProduct(setAddpopen(true))}
                      className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600 transition-colors flex items-center gap-1"
                    >
                      Product
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      // Show a fallback message if no data
      <div className="text-gray-500 text-center py-10">
        No Subcategory Available
      </div>
    )}
  </div>


      {/* Add Product Modal */}
      {addPopen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <AddProduct
              onSuccess={() => {
                closeP();
              }}
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <AddSubCat
            
              subid={
                Array.isArray(currentData)
                  ? currentData[0]?._id // Handle array, use the first element
                  : currentData?._id // Handle single object
              }
            />
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center  bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <AddCategory
              onSuccess={() => {
                closeModal();
                fetchCategories();
              }}
           
            />
          </div>
        </div>
      )}

      {/* Product Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-full max-h-[90vh] w-[90%] p-6 relative overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Products in Category
            </h3>
            <div className="overflow-auto max-h-96">
              {currentData.length === 0 && (
                <p className="text-center text-gray-600">No products available</p>
              )}
              {currentData.map((product) => (
                <div
                     key={product._id}
                     className="flex justify-between items-center border-b py-2"
                >
                  <span className="text-gray-700">{product.productName}</span>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
