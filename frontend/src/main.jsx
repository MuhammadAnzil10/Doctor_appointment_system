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
import store from "./store.js";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<UserHome />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route  element={<PublicRoute />} >
        <Route path="/verify-otp" element={<UserOtpPage />} />
      </Route>
      {/* <Route path="/verify-otp" element={<UserOtpPage />} /> */}
      <Route  path="" element={<PrivateRoute />}>
         <Route path="/profile" element={<UserProfile />} />
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
