import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserHome from "./pages/User/UserHome.jsx";
import UserLogin from "./pages/User/UserLogin.jsx";
import UserRegister from "./pages/User/UserRegister.jsx";
import UserProfile from "./pages/User/UserProfile.jsx";
import PrivateRoute from "./components/User/PrivateRoute.jsx";
import UserOtpPage from "./pages/User/UserOtpPage.jsx";
import PublicRoute from "./components/User/PublicRoute.jsx";
import UserForgetPassword from "./pages/User/UserForgetPassword.jsx";
import UserResetPassword from "./pages/User/UserRestPassword.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";

import store from "./store.js";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AdminPublicRoute from "./components/Admin/AdminPublicRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<UserHome />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/verify-otp" element={<UserOtpPage />} />
          <Route path="/forget-password" element={<UserForgetPassword />} />
          <Route path="/reset-password" element={<UserResetPassword />} />
        </Route>
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Route>
      <Route path="" element={<AdminPublicRoute />}>
        <Route path="/admin" element={<AdminLogin />} />
      </Route>
      <Route path="" element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
