import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes ,useNavigate} from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import CategoryComponent from "./Components/Category/CategoryComponent";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import ProfileEdit from "./Pages/ProfileEdit";
import Home from "./Pages/Home";
// import Products from "./Pages/Products";
import ProductsContextProvider from "./Components/Context/ProductsContext";
import CategoryContextProvider from "./Components/Context/CategoryContext";
import SignupvalContextProvider from "./Components/Context/SignupInputValContext";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider, {
  AuthContext,
} from "./Components/Context/AuthContext";
// import Admin from "./Components/Admin/Admin";
import AllUsers from "./Components/Admin/Users/AllUsers";
import ProtectedRoute from "./Components/ProtectedRoute";
import CheckoutPage from "./Pages/CheckoutPage";
import LoginRe from "./Components/LoginRe";
import ViewProduct from "./Components/ViewOneProduct/ViewProduct";
import CategoryTable from "./Components/Admin/Category/Category";
import Category from "./Components/Admin/Category/Category";
import SubCate from "./Components/Admin/Category/SubCate";
import { Loading } from "./Pages/Loading";

import { requestFcmToken, onMessageListener } from "./FirebaseUtils";
import axios from "axios";
import { server } from "./Server";
import {jwtDecode} from "jwt-decode";

const Admin = lazy(() => import("./Components/Admin/Admin"));
const Products = lazy(() => import("./Pages/Products"));
const localdata = localStorage.getItem("user_id");
const userId = localdata ? JSON.parse(localdata) : [];

const App = () => {
  const { isAuthenticated, adminData, currentUser } = useContext(AuthContext);
  const [token, setToken] = useState("");


  useEffect(() => {
    const FetchToken = async () => {
      try {
        const fcmtoken = await requestFcmToken();
        if (fcmtoken) {
          setToken(fcmtoken);
        }
      } catch (error) {
        console.log("geting Token Error", error);
      }
    };
    FetchToken();
  }, []);

  useEffect(() => {
    if (token && userId) {
      axios
        .post(`${server}/save-fcm-token`, {
          token,
          userId,
        })
        .then((res) => {
          console.log("Token Saved", res);
        })
        .catch((err) => {
          console.log("Error Saving Token:", err);
        });
    }
  }, [token, userId]);

  onMessageListener()
    .then((payload) => {
      toast(
        <div>
          <strong> {payload.notification.title}</strong>
          <strong> {payload.notification.body}</strong>
        </div>
      );
      console.log("Message received. ", payload);
    })
    .catch((err) => {
      console.log("Error occured", err);
    });
    useEffect(() => {
      checkTokenExpiry(); // Auto-check token expiry on page load
    }, []);
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (!token) return false; // No token found
    
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired, logging out...");
   
          return false;
        }
        return true;
      } catch (error) {
        console.error("Invalid token:", error);
        logoutUser(); // If decoding fails, log out
        return false;
      }
    };
    
    const logoutUser = () => {
      localStorage.removeItem("token"); // Remove token from storage
      window.location.href = "/login"; // Redirect to login page
    };

  return (
    <div>
      <AuthContextProvider>
        <CategoryContextProvider>
          <SignupvalContextProvider>
            <ProductsContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<LoginRe />} />
                  <Route path="/signup" element={<SignUp />} />
                  {/* Public Routes */}
                  <Route path="/" element={<Navbar />}>
                    <Route index element={<Home />} />

                    <Route
                      path="/products"
                      element={
                        <Suspense fallback={<Loading />}>
                          <Products />
                        </Suspense>
                      }
                    />
                    <Route path="/viewproduct/:id" element={<ViewProduct />} />
                  </Route>

                  {/* Protected Routes */}
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute allowedTypes={["admin"]}>
                        <Suspense fallback={"loading..."}>
                          <Admin />
                        </Suspense>
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
