import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const DoctorPublicRoute = () => {
  const { doctorInfo } = useSelector((state) => state.doctorAuth);
  return doctorInfo ? <Navigate to="/doctor" /> : <Outlet />;
};

export default DoctorPublicRoute;
