import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { doctorLogout } from "../../DoctorSlices/DoctorAuthSlice.js";
import { useLogoutDoctorMutation } from "../../DoctorSlices/doctorApiSlice.js";
import { toast } from "react-toastify"
import { useState } from "react";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

const DoctorHeader = ()=>{
 const {doctorInfo} = useSelector((state)=>state.doctorAuth)
 const [logoutDoctor,{isLoading}] = useLogoutDoctorMutation()
 const [toggle, setToggle] = useState(false)
 const dispatch = useDispatch()
const handleClick =async(e)=>{
    e.preventDefault()

    try {
      await  logoutDoctor()
      dispatch(doctorLogout())
    toast.success("Logged out Successfully")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
}

const toggleNavbar = async()=>{
  setToggle(!toggle)
}



  return (
    <div className="header-2">
    <nav className="bg-white py-2 md:py-4">
      <div className="container px-4 mx-auto md:flex md:items-center">
        <div className="flex justify-between items-center">
          <Link to='#' className="font-bold text-xl text-indigo-600">
            Vcare
          </Link>
          <button
            className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
            id="navbar-toggle"
            onClick={toggleNavbar}
          >
            <i className="fa fa-bars"></i>
          </button>
        </div>
        <div
          className={ toggle ? "md:flex flex justify-center md:flex-row md:ml-auto mt-3 md:mt-0" :"md:flex justify-center md:flex-row md:ml-auto mt-3 md:mt-0 hidden" }
          id="navbar-collapse"
        >
          <Link
            to="/doctor"
            className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600"
          >
            Home
          </Link>
          {doctorInfo && 
          (<Link 
            to="/doctor/appointments"
            className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
          >
            Appointments
          </Link>) }
          {doctorInfo && 
          (<Link 
            to="/doctor/doctor-profile"
            className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
          >
            Profile
          </Link>) }

          {doctorInfo ? (<Link
           
            onClick={handleClick}
            className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
          >
            Logout
          </Link>):(
          <Link
            to="/doctor/login"
            className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
          >
            Login
          </Link>)}
          {!doctorInfo && 
          (<Link
            to="/doctor/register"
            className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
          >
            Signup
          </Link>)}
        </div>
      </div>
    </nav>
  </div>
  
  )
}


export default DoctorHeader;