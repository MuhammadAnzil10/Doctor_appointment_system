import { FaUserCog } from "react-icons/fa";
import logo from "../../assets/images/V-care-logo.png";
import {Link} from 'react-router-dom'

const UserHeader = () => {
  return (
    <header>
      <nav className="flex justify-between   bg-blue-500">
        <div className="p-2">
          <img src={logo} alt="" className=" w-24 h-16  object-cover" />
        </div>
        <div className="flex items-center pr-4">
          <ul className="flex space-x-2 dark:text-white font-bold justify-center cursor-pointer">
            <Link to='/doctors'><li>Doctors</li></Link>
            <Link to='/bookings'><li>Bookings</li></Link>
            <Link to='/favourites'><li>Favourites</li></Link>
            <Link to='/profile'>
            <li>
              <FaUserCog className=" font-bold text-2xl" /> 
            </li>
            </Link>
            <Link to='/login'>
            <li>Login</li>
            </Link>
            <Link to='/logout'>
            <li>Logout</li>
            </Link>
            
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default UserHeader;
