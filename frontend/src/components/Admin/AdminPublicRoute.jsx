import { useSelector } from "react-redux"
import { Navigate,Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const AdminPublicRoute = ()=>{
 const {adminInfo} = useSelector((state)=>state.adminAuth)
  return adminInfo ? <Navigate to='/admin/dashboard' replace /> :  (<>
    <ToastContainer />
     <Outlet />
  </>)
}

export default AdminPublicRoute

