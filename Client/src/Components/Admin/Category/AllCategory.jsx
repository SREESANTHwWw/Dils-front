// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { server } from '../../../Server';

// const AllCategory = () => {
//   const [category, setCategories] = useState([]);
//   const [editOpen, setEditOpen] = useState(false);
//   const [updateCatelog, setUpdateCatelog] = useState({});
//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${server}/get-category`)
//       .then((res) => setCategories(res.data.getAllcategory))
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);

//   const dltCate = (id) => {
//     axios
//       .delete(`${server}/delete-cate/${id}`)
//       .then(() => setCategories((prev) => prev.filter((item) => item._id !== id)))
//       .catch((err) => console.error("Error deleting category:", err));
//   };

//   const editCatlog = (categories) => {
//     setUpdateCatelog(categories);
//     setImagePreview(categories.Category_img); // Set image for preview
//     setEditOpen(true);
//   };

//   const handlerFileInputs = (e) => {
//     const file = e.target.files[0];
//     setUpdateCatelog((prev) => ({ ...prev, Category_img: file }));
//     setImagePreview(URL.createObjectURL(file)); // Update preview image
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setUpdateCatelog((prev) => ({
//       ...prev,
//       [  name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const savechange = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       for (const key in updateCatelog) {
        
//         formData.append(key, updateCatelog[key]);
//       }
//       await axios.patch(`${server}/edit-category/${updateCatelog._id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setCategories((prev) =>
//         prev.map((cat) =>
//           cat._id === updateCatelog._id ? { ...cat, ...updateCatelog } : cat
//         )
//       );
//       setEditOpen(false);
//       setUpdateCatelog({});
//       setImagePreview(null);
//     } catch (error) {
//       console.error("Error updating category:", error);
//     }
//   };

//   const cancelEdit = () => {
//     setEditOpen(false);
//     setUpdateCatelog({});
//     setImagePreview(null);
//   };



//   return (
//     <div className="flex flex-col items-center w-full p-4">
//       <h2 className="text-2xl font-bold mb-4">Category</h2>
//       <div className="overflow-x-auto w-full">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-blue-900 text-white">
//               <th className="p-1 border text-sm text-center">Category Name</th>
//               <th className="p-2 border text-sm text-center">Category Image</th>
//               <th className="p-1 border text-sm text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {category.length ? (
//               category.map((categories, index) => (
//                 <tr key={index} className="even:bg-gray-100">
//                   <td className="p-1 border text-center">{categories.Category_name}</td>
//                   <td className="p-2 border text-center">
//                     <img
//                       src={categories.Category_img}
//                       alt="Category"
//                       className="w-28 h-28 rounded-lg object-cover mx-auto"
//                     />
//                   </td>
//                   <td className="p-1 border text-center">
//                     <div className="flex justify-around">
//                       <button
//                         className="bg-yellow-500 px-4 py-1 rounded-md text-white font-bold hover:bg-yellow-700"
//                         onClick={() => editCatlog(categories)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-600 px-4 py-1 rounded-md text-white font-bold hover:bg-red-700"
//                         onClick={() => dltCate(categories._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="p-4 text-center">
//                   No categories found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         {editOpen && updateCatelog && (
//           <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-3xl">
//               <h3 className="text-xl font-semibold mb-4">Edit Category</h3>
//               <form className="space-y-6" onSubmit={savechange}>
//                 <div className="text-center">
//                   <img
//                     className="w-[200px] h-[200px] rounded-lg mx-auto"
//                     src={imagePreview}
//                     alt="Preview"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-2">Add New Image</label>
//                   <input type="file" accept="image/*"   onChange={handlerFileInputs} />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-2">Category Name:</label>
//                   <input
//                     type="text"
//                     name="Category_name"
//                     value={updateCatelog.Category_name || ""}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-2">Sub Category Name:</label>
//                   <select
//                     name="subCategory"
//                     value={updateCatelog.subCategory || ""}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                   >
//                     <option value="">-- Select an option --</option>
//                     {category.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.Category_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="flex justify-between">
//                   <button type="submit" className="bg-blue-600 py-2 px-6 rounded text-white hover:bg-blue-800">
//                     Save Changes
//                   </button>
//                   <button
//                     type="button"
//                     onClick={cancelEdit}
//                     className="bg-gray-500 py-2 px-6 rounded text-white hover:bg-gray-700"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllCategory;
