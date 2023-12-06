import React from "react";
import UserHeader from "./components/User/UserHeader.jsx";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
};

export default App;
