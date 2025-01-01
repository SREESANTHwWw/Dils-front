// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { server } from "../../../Server";

// const AddCategory = ({ onSuccess, onClose,subid}) => {
//   const [Category_name, setCategoryName] = useState("");
//   const [Category_img, setCategoryImg] = useState(null);
//   const [hasSubcategory, setHasSubcategory] = useState(false);
//   const [subCategory, setSubcategoryName] = useState(subid || ""); // State for Subcategory
//   const [selectedOption, setSelectedOption] = useState('');
//   const [categories,setCategories] = useState()




//   const addCategoryFun = (e) => {
//     e.preventDefault();

//     const config = {
//       headers: { "Content-Type": "multipart/form-data" },
//     };
//     const NewCategory = new FormData();
//     NewCategory.append("Category_name", Category_name);
//     NewCategory.append("Category_img", Category_img);
//     NewCategory.append("hasSubcategory", hasSubcategory);
//     if(subCategory){
//       NewCategory.append("subCategory" ,subCategory)
//     }
    
    
   
//       // axios.post(`${server}/add-subcategory`,{
//       //   subCategory
//       // }); // Only append if subcategory is enabled
   

//     axios
//       .post(`${server}/add-category`, NewCategory, config)
//       .then((res) => {
       
        
//         if (res.data.msg === "success") {
//           toast.success("Category created successfully", { theme: "colored" });
//           onSuccess(); // Close modal and refresh list
//         } else {
//           toast.error("Invalid credentials", { theme: "colored" });
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error("Something went wrong", { theme: "colored" });
//       });
//   };


//   useEffect(()=>{
//     axios
//     .get(`${server}/get-category`)
//     .then((res) => {
//       setCategories(res.data.getAllcategory);
//       // Initialize with top-level data
//     })

//   },[])


    




//   const handleSelect = (e)=>{
//     setSubcategoryName(e.target.value)
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white w-96 p-6 rounded-md shadow-lg">
//         <h2 className="text-lg font-semibold mb-4">Add/Edit Category</h2>
//         <form onSubmit={addCategoryFun}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Category Name:</label>
//             <input
//               type="text"
//               placeholder="Name"
//               value={Category_name}
//               onChange={(e) => setCategoryName(e.target.value)}
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
//          }
//        */}


//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Category Image:</label>
//             <input
//               type="file"
//               accept=".jpg, .jpeg, .png"
//               onChange={(e) => setCategoryImg(e.target.files[0])}
//               className="w-full"
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               checked={hasSubcategory}
//               onChange={(e) => setHasSubcategory(e.target.checked)}
//               className="mr-2"
//             />
//             <label className="text-sm font-medium">Has Subcategory?</label>
//           </div>

//           {/* Show subcategory fields if "Has Subcategory?" is checked */}
//           {/* {hasSubcategory && (       
//    <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Subcategory Name:</label>
//               <input
//                 type="text"
//                 placeholder="Subcategory Name"
//                 value={subCategory}
//                 onChange={(e) => setSubcategoryName(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//               />
//                 <label className="block text-sm font-medium mb-2">Category Image:</label>
//             <input
//               type="file"
//               accept=".jpg, .jpeg, .png"
//               onChange={(e) => setSubcategoryImg(e.target.files[0])}
//               className="w-full"
//             />
//             </div>
            
              
           
         
            
//           )} */}

//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={onSuccess}
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
//   );
// };

// export default AddCategory;
