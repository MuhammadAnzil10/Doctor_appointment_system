import logo from "../../assets/images/V-care-logo.png";
import { Link, useNavigate } from "react-router-dom";
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
          <ul className="flex space-x-2 dark:text-white font-bold justify-center cursor-pointer">
          <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/doctors">
              <li>Doctors</li>
            </Link>
            <Link to="/bookings">
              <li>Bookings</li>
            </Link>
            <Link to="/favourites">
              <li>Favourites</li>
            </Link>
            <Link to="/profile"></Link>
            {userInfo ? (
               <Link to="/profile">
               <li>Profile</li>
             </Link>
            ) : (
              <Link to="/login">
                <li>Login</li>
              </Link>
            )}
        
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default UserHeader;
