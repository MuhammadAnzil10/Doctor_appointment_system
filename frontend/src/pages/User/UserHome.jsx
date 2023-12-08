import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserHome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
     const isToastShownBefore = localStorage.getItem('isToastShown')
    if (userInfo && !isToastShownBefore) {
      toast.success("Logged in successfully");
      localStorage.setItem("isToastShown","true")
    }
  },[userInfo])
   
  return (
    <div>
      <h1>User Home Screen</h1>
    </div>
  );
};

export default UserHome;
