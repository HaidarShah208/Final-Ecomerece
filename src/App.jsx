import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/home/Home";
import State from "./Context/State";
import LogIn from "./Pages/Registration/LogIn/LogIn";
import SignUp from "./Pages/Registration/SignUp/SignUp";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ProductInfo from "./Pages/ProductInfo/ProductInfo";
import Cart from "./Pages/cart/Cart";
import AllProducts from './Pages/allProducts/AllProducts'
import Dashboard from "./Pages/admin/Dashboard/Dashboard";
import UpdateProduct from "./Pages/admin/update&delete/UpdateProduct";
import AddProduct from "./Pages/admin/update&delete/AddProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <State>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/home" element={<Home />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/allproducts" element={<AllProducts />} />

            <Route
              path="/dashboard" element={  // this mean only admin can see this page
                <ProtectedAdminRoutes>
                  <Dashboard />
                </ProtectedAdminRoutes>
              } />

            <Route path="/updateproduct" element={
            <ProtectedAdminRoutes>
              <UpdateProduct />
            </ProtectedAdminRoutes>
            } />
           
            <Route path="/addproduct" element={
            <ProtectedAdminRoutes>
              <AddProduct />
            </ProtectedAdminRoutes>
            } />
            
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </State>
    </div>
  );
}

// i use headlessui for icons ,, react-icons website ,, redux Toolkit ,, razerpay for payment
export default App;

//protected routes for user
export const ProtectedUserRoutes = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

//protected routes for Admin
export const ProtectedAdminRoutes = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if (admin.user.email === "shah208@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
