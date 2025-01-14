import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { server } from "../../Server";
import { toast } from "react-toastify";

export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [product, setProducts] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState("");
  const [cartlength,setCartlength]=useState([])
  const[viewOne,setViewone]= useState([])
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1);
  const perpage = 4;
  const [loading, setLoading] = useState(false);


  const FetchProduct = () => {
    const offset = (currentPage - 1) * perpage;

    axios
      .get(`${server}/get-products?page=${currentPage}`)
      .then((res) => {
       
        setProducts(res.data.results)
        setTotalPages(res.data.totalPages); // Set products data
       
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch products"); // Show error toast
      });
  };

  // Fetch data when page or limit changes
  useEffect(() => {
    FetchProduct();
  }, [currentPage, perpage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    if (!searchData) {
      setFilterData(product);
    } else {
      const filteredSearchData = product.filter((res) =>
        res.productname.toLowerCase().includes(searchData)
      );
      setFilterData(filteredSearchData);
    }
  }, [searchData, product]);

  const searchfunction = (e) => {
    setSearchData(e.target.value.toLowerCase());
  };


  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

 

  const localdata = localStorage.getItem("user_id");

  const userId = localdata ? JSON.parse(localdata) : [];

  const Addtocartfun = (product) => {
    const Product_id = product._id;
    const minimum_order_quantity = product.minimum_order_quantity;

    const productname = product.productname;
    const product_img = product.product_img;
    const premium_price = product.premium_price
    const medium_price = product.medium_price
    const price = product.price;
    const description = product.description;
    const mRP = product.mRP;


 
    axios
      .post(`${server}/addToCart`, {
        userId,
        Product_id,
        minimum_order_quantity,
        productname,
        product_img,
        premium_price,
        medium_price,
        price,
        description,
        mRP,
      })
      .then((res) => {
        setCart(res.data.cart.items);
        cartdata()
        console.log(res.data.cart.items);
        

        toast.success(`${product.productname} added to cart`, {
          theme: "colored",
        });
        // const cart =res.data.cart.items;
        // localStorage.setItem("cartdata",JSON.stringify(cart))
      })
      .catch((err) => {
        toast.error(err.response.data.msg, { theme: "colored" });
      }).finally(() => setLoading(false))
     
  };

  const cartdata=()=>{
    if(userId){
      axios.get(`${server}/getAll-cart/${userId}`).then((res) => {
        setCartlength(res.data.cart.items)

    })
  

  }}
  useEffect(() => {
    cartdata();
  }, [userId]);

  const viewProduct=(productId)=>{
    axios.get(`${server}/getOneproduct/${productId}`)
    .then((res)=>{setViewone(res.data)}).catch((err)=>console.log(err))

  }
  
  return (
    <ProductsContext.Provider
      value={{
        product,
        searchfunction,
        filterData,
        searchData,
        // addtoCart,
        cartdata,
        cartlength,
        cart,
        setCart,
        Addtocartfun,
        formatPrice,
        viewProduct,
        viewOne,
        setCurrentPage,
        currentPage,
        pageNumbers,
        totalPages,
        setFilterData,
        loading,setLoading
        
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
