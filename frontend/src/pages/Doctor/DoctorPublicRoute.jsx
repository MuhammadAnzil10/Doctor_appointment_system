import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const DoctorPublicRoute = () => {
  const { doctorInfo } = useSelector((state) => state.doctorAuth);
  return doctorInfo ? <Navigate to="/doctor" /> : (
    <>
  <Outlet />
  <ToastContainer />
  </>
  )
  
};

export default DoctorPublicRoute;
