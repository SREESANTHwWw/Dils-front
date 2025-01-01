import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import CategoryComponent from "./Components/Category/CategoryComponent";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import ProfileEdit from "./Pages/ProfileEdit";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductsContextProvider from "./Components/Context/ProductsContext";
import CategoryContextProvider from "./Components/Context/CategoryContext";
import SignupvalContextProvider from "./Components/Context/SignupInputValContext";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider, { AuthContext } from "./Components/Context/AuthContext";
import Admin from "./Components/Admin/Admin";
import AllUsers from "./Components/Admin/Users/AllUsers";
import ProtectedRoute from "./Components/ProtectedRoute";
import CheckoutPage from "./Pages/CheckoutPage";
import LoginRe from "./Components/LoginRe";
import ViewProduct from "./Components/ViewOneProduct/ViewProduct";
import CategoryTable from "./Components/Admin/Category/Category";
import Category from "./Components/Admin/Category/Category";
import SubCate from "./Components/Admin/Category/SubCate";

const App = () => {
  const { isAuthenticated, adminData, currentUser } = useContext(AuthContext);

  return (
    <div>
      <AuthContextProvider>
        <CategoryContextProvider>
          <SignupvalContextProvider>
            <ProductsContextProvider>
              <BrowserRouter>
                <Routes>
                <Route path="/login" element={<LoginRe />} />
                  {/* Public Routes */}
                  <Route path="/" element={<Navbar />}>
                    <Route index element={<Home />} />
                   
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/viewproduct/:id" element={<ViewProduct />} />
                  </Route>

                  {/* Protected Routes */}
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute allowedTypes={["admin"]}>
                        <Admin />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="users" element={<AllUsers />} />
                    <Route path="category" element={<Category />} />
                   
                  </Route>

                  <Route path="/profile" element={<Profile />} />
                  <Route path="/editpage" element={<ProfileEdit />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
              </BrowserRouter>
              <ToastContainer
                position="top-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
              />
            </ProductsContextProvider>
          </SignupvalContextProvider>
        </CategoryContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
