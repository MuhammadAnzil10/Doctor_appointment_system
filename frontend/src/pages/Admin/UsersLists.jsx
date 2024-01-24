import Tables from "../../components/Admin/Tables.jsx";
import { useState, useEffect } from "react";
import {
  useGetAllUsersMutation,
  useBlockUserMutation,
  useUnBlockUserMutation,
} from "../../AdminSlices/adminApiSlice.js";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux'
import { logout } from "../../UserSlices/authSlice.js";
const UsersLists = () => {
  const [users, setUsers] = useState([]);
  const [getAllUsers, { isLoading }] = useGetAllUsersMutation();
  const [blockStatus, setBlockStatus] = useState(null);
  const [unBlockUser] = useUnBlockUserMutation();
  const [blockUser] = useBlockUserMutation();
  const dispatch = useDispatch()

  const fetchAllUsers = async () => {
    try {
     
      const users = await getAllUsers().unwrap();
      setUsers(users);
    } catch (error) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const blockHandler = async (id) => {
    try {
      const res = await blockUser(id).unwrap();
      if (res.isBlocked) {
        localStorage.setItem('userInfo',null)
        dispatch(logout())
        setBlockStatus(res);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const unBlockHandler = async (id) => {
    try {
      const res = await unBlockUser(id).unwrap();
      if (res.isUnBlocked) {
        setBlockStatus(res);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllUsers();
  }, [blockStatus]);
 
  return (
    <section>
      <h1 className="font-bold p-3 px-28 text-center bg-red-400">Users List</h1>
      <Tables
        users={users}
        blockHandler={blockHandler}
        unBlockHandler={unBlockHandler}
      />
    </section>
  );
};

export default UsersLists;
