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
import UsersLists from "./pages/Admin/UsersLists.jsx";
import AdminForgetPassword from "./pages/Admin/AdminForgetPassword.jsx";
import AdminOtpPage from "./pages/Admin/AdminOtpPage.jsx";
import AdminResetPassword from "./pages/Admin/AdminResetPassord.jsx";
import DoctorRegistration from "./pages/Doctor/DoctorRegistration.jsx";
import Specialization from "./pages/Admin/Specialization.jsx";
import SpecializationList from "./pages/Admin/SpecializationsList.jsx";
import DoctorLayout from "./components/Doctor/DoctorLayout.jsx";
import DoctorHome from "./pages/Doctor/DoctorHome.jsx";
import DoctorLogin from "./pages/Doctor/DoctorLogin.jsx";
import DoctorsLists from "./pages/Admin/DoctorsLists.jsx";
import UserDoctorsLists from "./pages/User/UserDoctorsLists.jsx";
import DoctorPublicRoute from "./pages/Doctor/DoctorPublicRoute.jsx";
import DoctorDetails from "./pages/User/DoctorDetails.jsx";
import DoctorForgetPassword from "./pages/Doctor/DoctorForgetPassword.jsx";
import DoctorOtpPage from "./pages/Doctor/DoctorOtpPage.jsx";
import DoctorResetPassword from "./pages/Doctor/DoctorResetPassword.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";
import Favourites from "./pages/User/Favourites.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* User Routes */}
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
          <Route path="/doctors" element={<UserDoctorsLists />} />
          <Route path="/doctor-details/:id" element={<DoctorDetails />} />
          <Route path="/favourites" element={<Favourites />} />
        </Route>
      </Route>

      {/* Admin Routes */}

      <Route path="" element={<AdminPublicRoute />}>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/forget-password" element={<AdminForgetPassword />} />
        <Route path="/admin/verify-otp" element={<AdminOtpPage />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
      </Route>
      <Route path="" element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UsersLists />} />
        <Route path="/admin/specializations" element={<SpecializationList />} />
        <Route path="/admin/specialization" element={<Specialization />} />
        <Route path="/admin/doctors" element={<DoctorsLists />} />
      </Route>

      {/* Doctor Routes */}
      <Route path="" element={<DoctorPublicRoute />}>
        <Route path="/doctor/register" element={<DoctorRegistration />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/forget-password" element={<DoctorForgetPassword />} />
        <Route path="/doctor/verify-otp" element={<DoctorOtpPage />} />
        <Route path="/doctor/reset-password" element={<DoctorResetPassword />} />
      </Route>
      <Route path="" element={<DoctorLayout />}>
        <Route index={true} path="/doctor" element={<DoctorHome />} />
        <Route path="/doctor/doctor-profile" element={<DoctorProfile />} />
   
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
