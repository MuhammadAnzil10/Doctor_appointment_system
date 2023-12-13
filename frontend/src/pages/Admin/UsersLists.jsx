import Tables from "../../components/Admin/Tables.jsx"
import {useState,useEffect} from 'react';
import { useGetAllUsersMutation } from "../../AdminSlices/adminApiSlice.js";

const UsersLists =()=>{
  const [users, setUsers] = useState([]);
  const [getAllUsers,{isLoading}] = useGetAllUsersMutation()

  const fetchAllUsers = async ()=>{
        
       const users = await getAllUsers().unwrap()
       setUsers(users)
  }
  const blockHandler =(id)=>{
 
  }

  useEffect(()=>{

      fetchAllUsers()

  },[])


  return(
    <section>
     <h1 className="font-bold p-3 px-28" >Users List</h1>
     <Tables users={users} />
    </section>
     
  )
}


export default UsersLists;