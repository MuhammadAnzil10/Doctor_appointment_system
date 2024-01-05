import { ToastContainer } from "react-toastify";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";



const AdminPrivateRoute =()=>{
  let {adminInfo} = useSelector((state)=>state.adminAuth)

  return adminInfo ? (
    <>
      <AdminHeader />
      <ToastContainer />
      <Outlet />
      <AdminFooter />
    </>
  ) : <Navigate to='/admin' />
}

export default AdminPrivateRoute;