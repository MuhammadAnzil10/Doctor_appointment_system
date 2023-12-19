import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const PrivateRoute =()=>{
const {userInfo} = useSelector((state)=>state.auth)
const userData = JSON.parse(localStorage.getItem('userInfo'))


  return userData ? <Outlet />: (
    <Navigate to='/login' replace />
  )
}


export default PrivateRoute