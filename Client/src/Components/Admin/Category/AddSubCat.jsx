// import axios from 'axios'
// import React, { useState } from 'react'
// import { server } from '../../../Server'
// import { toast } from 'react-toastify'

// const AddSubCat = (subid) => {


//     const [subCategory,setsubCategoryName] = useState("")
//     const [hasSubcategory ,setHassubcategory] =useState("")
//     const [subCategory_img,setsubCategory_img] = useState("")
//     const [UndersubCategory,setUnderSubcategory] = useState("")
//     const addSUBCategoryFun = (e) => {
//         e.preventDefault();
    
//         const config = {
//           headers: { "Content-Type": "multipart/form-data" },
//         };
//         const NewCategory = new FormData();
//         NewCategory.append("subCategory", subCategory);
//         NewCategory.append("subCategory_img", subCategory_img);
//         NewCategory.append("hasSubcategory", hasSubcategory);
//         if(subCategory){
//           NewCategory.append("UndersubCategory" ,UndersubCategory)
//         }
        
        
       
//           // axios.post(`${server}/add-subcategory`,{
//           //   subCategory
//           // }); // Only append if subcategory is enabled
       
    
//         axios
//           .post(`${server}/add-subcategory/${subid}`, NewCategory, config)
//           .then((res) => {
           
            
//             if (res.data.msg === "success") {
//               toast.success("Category created successfully", { theme: "colored" });
//              // Close modal and refresh list
//             } else {
//               toast.error("Invalid credentials", { theme: "colored" });
//             }
//           })
//           .catch((err) => {
//             console.error(err);
//             toast.error("Something went wrong", { theme: "colored" });
//           });
//       };



//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white w-96 p-6 rounded-md shadow-lg">
//         <h2 className="text-lg font-semibold mb-4">Add/Edit Category</h2>
//         <form onSubmit={addSUBCategoryFun}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Category Name:</label>
//             <input
//               type="text"
//               placeholder="Name"
//               value={subCategory}
//               onChange={(e) => setsubCategoryName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//             />
//           </div>


//          {/* {
//           !subCategory ?
//           <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Sub Category Name:</label>
//           <select name="subCategory" value={subCategory} onChange={handleSelect} className="w-full px-4 py-2 border rounded-md">
//       <option value={null}>-- Select an option --</option>
//       {categories && categories.length > 0 ? (
//               categories.map((category) => (
//                 <option key={category._id} value={category._id } >
//                   {category.Category_name}
//                 </option>
//               ))
//             ) : (
//               <option>No categories available</option>
//             )}
//     </select>
//         </div>:
//             <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Sub Category Name:</label>
//             <select name="subCategory" value={subCategory} onChange={handleSelect} className="w-full px-4 py-2 border rounded-md">
//         <option value={null}>-- Select an option --</option>
//         {categories.subCategory && categories.length > 0 ? (
//                 categories.map((category) => (
//                   <option key={category._id} value={category._id } >
//                     {category.Category_name}
//                   </option>
//                 ))
//               ) : (
//                 <option>No categories available</option>
//               )}
//       </select>
//           </div>
//          } */}
      


//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Category Image:</label>
//             <input
//               type="file"
//               accept=".jpg, .jpeg, .png"
//               onChange={(e) => setsubCategory_img(e.target.files[0])}
//               className="w-full"
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               checked={hasSubcategory}
//               onChange={(e) => hasSubcategory(e.target.checked)}
//               className="mr-2"
//             />
//             <label className="text-sm font-medium">Has Subcategory?</label>
//           </div>



//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
           
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//             >
//               Close
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddSubCat