import { useSelector } from "react-redux"
import { Navigate,Outlet } from "react-router-dom"

const AdminPublicRoute = ()=>{
 const {adminInfo} = useSelector((state)=>state.adminAuth)
  return adminInfo ? <Navigate to='/admin/dashboard' replace /> :  (<Outlet />)
}

export default AdminPublicRoute

