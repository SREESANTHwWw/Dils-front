import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Components & Pages
import Navbar from "./Pages/Navbar";
import LoginRe from "./Components/LoginRe";
import SignUp from "./Pages/SignUp";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import ProfileEdit from "./Pages/ProfileEdit";
import Home from "./Pages/Home";
import CheckoutPage from "./Pages/CheckoutPage";
import ViewProduct from "./Components/ViewOneProduct/ViewProduct";
import AllUsers from "./Components/Admin/Users/AllUsers";
import Category from "./Components/Admin/Category/Category";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Loading } from "./Pages/Loading";

// Context Providers
import AuthContextProvider from "./Components/Context/AuthContext";
import CategoryContextProvider from "./Components/Context/CategoryContext";
import SignupvalContextProvider from "./Components/Context/SignupInputValContext";
import ProductsContextProvider from "./Components/Context/ProductsContext";

// Utilities
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { requestFcmToken, onMessageListener } from "./FirebaseUtils";
import axios from "axios";
import { server } from "./Server";
import { jwtDecode } from "jwt-decode";

const Admin = lazy(() => import("./Components/Admin/Admin"));
const Products = lazy(() => import("./Pages/Products"));

const App = () => {
  const [fcmToken, setFcmToken] = useState("");
  const [isServerLive, setIsServerLive] = useState(false);
  const [checkingServer, setCheckingServer] = useState(true);

  // 1. Server Health Check (For Free Hosting spin-up)
  useEffect(() => {
    const wakeServer = async () => {
      try {
        // Replace '/health' with any simple GET route you have (like your products fetch)
        await axios.get(`${server}/get-all-products`); 
        setIsServerLive(true);
      } catch (error) {
        console.error("Server is waking up...");
      } finally {
        setCheckingServer(false);
      }
    };
    wakeServer();
  }, []);

  // 2. Handle FCM Token Retrieval
  useEffect(() => {
    if (!isServerLive) return;
    const fetchToken = async () => {
      try {
        const token = await requestFcmToken();
        if (token) setFcmToken(token);
      } catch (error) {
        console.error("FCM Token Error:", error);
      }
    };
    fetchToken();
  }, [isServerLive]);

  // 3. Save Token to Backend
  useEffect(() => {
    const localdata = localStorage.getItem("user_id");
    const userId = localdata ? JSON.parse(localdata) : null;

    if (fcmToken && userId && isServerLive) {
      axios
        .post(`${server}/save-fcm-token`, { token: fcmToken, userId })
        .catch((err) => console.log("Error Saving Token:", err));
    }
  }, [fcmToken, isServerLive]);

  // 4. Token Expiry & Notification Listeners
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    };

    checkTokenExpiry();

    onMessageListener()
      .then((payload) => {
        toast.info(
          <div>
            <p className="font-bold">{payload.notification.title}</p>
            <p className="text-sm">{payload.notification.body}</p>
          </div>
        );
      })
      .catch((err) => console.log("Message Error:", err));
  }, []);

  // --- WAKING UP UI ---
  if (checkingServer) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white p-6 text-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full mb-6"
        />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Waking up the Server</h2>
        <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">
          We use free hosting to keep this service live. It might take about 30 seconds to start up. Thank you for your patience!
        </p>
      </div>
    );
  }

  return (
    <AuthContextProvider>
      <CategoryContextProvider>
        <SignupvalContextProvider>
          <ProductsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navbar />}>
                  <Route index element={
                    <Suspense fallback={<Loading />}>
                      <Home />
                    </Suspense>
                  } />
                  <Route path="/login" element={<LoginRe />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="products" element={
                    <Suspense fallback={<Loading />}>
                      <Products />
                    </Suspense>
                  } />
                  <Route path="viewproduct/:id" element={<ViewProduct />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="editpage" element={<ProfileEdit />} />
                </Route>

                <Route path="/checkout" element={<CheckoutPage />} />

                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute allowedTypes={["admin"]}>
                      <Suspense fallback={<Loading />}>
                        <Admin />
                      </Suspense>
                    </ProtectedRoute>
                  }
                >
                  <Route path="users" element={<AllUsers />} />
                  <Route path="category" element={<Category />} />
                </Route>
              </Routes>

              <ToastContainer
                position="bottom-right"
                autoClose={2500}
                transition={Zoom}
                theme="colored"
              />
            </BrowserRouter>
          </ProductsContextProvider>
        </SignupvalContextProvider>
      </CategoryContextProvider>
    </AuthContextProvider>
  );
};

export default App;