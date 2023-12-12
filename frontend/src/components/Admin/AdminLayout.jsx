import { ToastContainer } from "react-toastify";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";


const AdminLayout =()=>{
  
  return (
    <>
      <AdminHeader />
      <ToastContainer />
      <Outlet />
      <AdminFooter />
    </>
  );
}

export default AdminLayout;