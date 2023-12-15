import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DoctorHeader from "./DoctorHeader";

const DoctorLayout = () => {
  let doctorInfo = true
  // let { doctorInfo } = useSelector((state) => state.doctorAuth);

  return doctorInfo ? (
    <>
      <DoctorHeader />
      <ToastContainer />
      <Outlet />
    </>
  ) : (
    <Navigate to="/doctor" />
  );
};

export default DoctorLayout;
