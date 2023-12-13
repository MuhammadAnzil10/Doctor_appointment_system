import { Link } from "react-router-dom";
import logo from "../../assets/images/V-care-logo.png";
import { useSelector,useDispatch } from "react-redux";
import DropDown from "../DropDown";
import { useAdminLogoutMutation } from "../../AdminSlices/adminApiSlice.js";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import { adminLogout } from "../../AdminSlices/adminAuthSlice.js";

const AdminHeader = () => {
const {adminInfo} = useSelector((state)=>state.adminAuth)
const [adminLogoutApi,{isLoading}] = useAdminLogoutMutation()
const dispatch = useDispatch();
const navigate = useNavigate()


const logoutHandler =async ()=>{

  try {
    await adminLogoutApi().unwrap()
    dispatch(adminLogout())
    toast.success('Logged out successfully')
    navigate('/admin')
  } catch (err) {
    console.log(err.data.message || err.error);
    toast.error(err.data.message||err.error)
  }


}
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="" className="flex items-center">
            {/* <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> */}{" "}
            <h1 className="mr-3 h-6 sm:h-9 text-cyan-300">Vcare</h1>
          </Link>
          <div className="flex items-center lg:order-2">
          <DropDown
                userInfo={adminInfo}
                profile={"/admin/profile"}
                logoutHandler={logoutHandler}
              />
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Doctors
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Appointments
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;