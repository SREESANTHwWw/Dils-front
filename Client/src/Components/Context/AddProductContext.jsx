// import axios from "axios";
// import { Children, createContext, useState } from "react";
// import { server } from "../../Server";
// import { toast } from "react-toastify";

// export const AddProductContext = createContext();

// const AddProductProvider = (props) => {
//   const [productname, setProductname] = useState("");
//   const [product_img, setProduct_img] = useState("");
//   const [price, setPrice] = useState("");
//   const [unitid, setUnitid] = useState("");
//   const [description, setdescription] = useState("");
//   const [medium_price, setmediumPrice] = useState("");
//   const [premium_price, setPremiumprice] = useState("");
//   const [minimum_order_quantity, setMinQty] = useState("");
//   const [Product_id, setProductid] = useState("");
//   const [fast_moving, setfastMove] = useState("");
//   const [isActive, setActive] = useState(false);
//   const [reorder_id, setOrderid] = useState("");
//   const [message, setMessage] = useState("");
//   const [uploadedFileUrl, setUploadedFileUrl] = useState("");
//   const [fileMetadata, setFileMetadata] = useState(null);
//   const [fileId, setFileId] = useState("");

//   const addProduct = (e) => {
//     e.preventDefault();
//     const config = {
//       headers: { "Content-Type": "multipart/form-data" },
//     };
//     const NewProduct = new FormData();
//     NewProduct.append("productname", productname);
//     NewProduct.append("product_img", product_img);
//     NewProduct.append("price", price);
//     NewProduct.append("unitid", unitid);
//     NewProduct.append("description", description);
//     NewProduct.append("medium_price", medium_price);
//     NewProduct.append("premium_price", premium_price);
//     NewProduct.append("minimum_order_quantity", minimum_order_quantity);
//     NewProduct.append("Product_id", Product_id);
//     NewProduct.append("fast_Product", fast_moving);
//     NewProduct.append("isactive", isActive);
//     NewProduct.append("reorder_id", reorder_id);
//     axios
//       .post(`${server}/create-products`, {}, NewProduct, config)
//       .then((res) => {
//         setMessage(res.data.message);
//         setUploadedFileUrl(res.data.file.fileUrl);
//         setFileMetadata(res.data.file);
//         setFileId(res.data.file._id);

//         if (res.data.msg === "success") {
//           toast.success("Product Created Successfully", { theme: "colored" });

//           setProductname("");
//           setProduct_img("");
//           setPrice("");
//           setUnitid("");
//           setdescription("");
//           setmediumPrice("");
//           setMinQty("");
//           setProductid("");
//           setfastMove("");
//           setActive(false);
//           setOrderid("");
//         } else {
//           toast.error("invalid credentials", { theme: "colored" });
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handlerfileInputs = (e) => {
//     const file = e.target.files[0];
//     setProduct_img(file);
//   };

//   return (
//     <AddProductContext.Provider
//       value={{
//         handlerfileInputs,
//         addProduct,
//         setProductname,
//         setProduct_img,
//         setPrice,
//         setUnitid,
//         setdescription,
//         setmediumPrice,
//         setPremiumprice,
//         setMinQty,
//         setProductid,
//         setfastMove,
//         setActive,
//         setOrderid,
//         setMessage,
//         setUploadedFileUrl,
//         setFileMetadata,
//         setFileId
//       }}
//     >
//       {props.children}
//     </AddProductContext.Provider>
//   );
// };

// export default AddProductProvider;
