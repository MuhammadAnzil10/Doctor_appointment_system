import logo from "../../assets/images/V-care-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useLogoutMutation } from "../../UserSlices/usersApiSlice.js";
import { logout } from "../../UserSlices/authSlice.js";

const UserHeader = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();



  return (
    <header className="">
      <nav
        className="flex justify-between "
        style={{ backgroundColor: "#0a4275" }}
      >
        <div className="p-2">
          <img src={logo} alt="" className=" w-24 h-16  object-cover" />
        </div>
        <div className="flex items-center pr-4">
          <ul className="flex space-x-2 dark:text-white  justify-center cursor-pointer  ">
          <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/doctors">
              <li>Doctors</li>
            </NavLink>
            <NavLink to="/bookings">
              <li>Bookings</li>
            </NavLink>
            <NavLink to="/favourites">
              <li>Favourites</li>
            </NavLink>
            <NavLink to="/profile"></NavLink>
            {userInfo ? (
               <NavLink to="/profile">
               <li>Profile</li>
             </NavLink>
            ) : (
              <NavLink to="/login">
                <li>Login</li>
              </NavLink>
            )}
        
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default UserHeader;
