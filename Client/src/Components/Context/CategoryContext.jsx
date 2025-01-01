import axios from "axios";
import { createContext, useEffect,useState } from "react";
import { server } from "../../Server";
import { toast } from "react-toastify";

export const CategoryContext = createContext();

const CategoryContextProvider = (props) => {
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState("1");
  const [searchkey, setSearchKey] = useState('');
  

 
          




 
  useEffect(() => {


    axios.get(`${server}/get-category`,{
     
    }).then((res)=> setCategory(res.data.getAllcategory)).catch((err)=>console.log(err))


  },[]);
//   const AddCategory = () => {
//     const[Category_id,setCategoryid] =useState("")
//     const[Category_name,setCategoryName] =useState("")
//     const[Category_img,setCategoryimg] =useState("")
//     const[subCategory,setSubCategoryid] =useState("")
//     const[ParentCategory_id,setParentCategoryid] =useState("")
 
//   const  addCategoryfun = (e)=>{
//    e.preventDefault()
//    const config = {
//      headers:{"Content-Type":"multipart/form-data"}
//    }
//    const NewCategory = new FormData()
//    NewCategory.append("Category_id" ,Category_id)
//    NewCategory.append("Category_name", Category_name)
//    NewCategory.append("Category_img", Category_img)
//    NewCategory.append("subCategory_id", subCategory)
//    NewCategory.append("Parent_category_id",ParentCategory_id)
 
 
//    axios.post(`${server}/add-category`,NewCategory,config)
//    .then((res)=>{
//    if(res.data.msg === "success"){
//      toast.success("Category created Successfully" ,{theme:"colored"})
 
//    }
//    else{
//      toast.error("invalid credentials",{theme:"colored"})
//    }
 
//  }).catch((err)=>{
//      console.log(err)
//    })
   
 
//   }
// }
 




  // console.log(page,searchkey ,setCategory)


  return (
    <CategoryContext.Provider value={{ category}}>
      {props.children}
    </CategoryContext.Provider>
  );
};
export default CategoryContextProvider;
