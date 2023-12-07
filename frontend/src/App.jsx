import React from "react";
import UserHeader from "./components/User/UserHeader.jsx";
import { Outlet } from "react-router-dom";
import {ToastContainer}  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <>
      <UserHeader />
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;
