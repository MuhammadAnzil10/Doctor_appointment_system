import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {useDispatch} from 'react-redux';
import { setCredentials } from "../../UserSlices/authSlice.js";
import {toast} from 'react-toastify'
import { useResetPasswordMutation } from "../../UserSlices/usersApiSlice.js";



const UserResetPassword =()=>{
const [confirmPassword,setConfirmPassword]=useState('')
const [resetPassword,{isLoading}] = useResetPasswordMutation()
const [password, setPassword] = useState('');
const navigate = useNavigate()
const dispatch = useDispatch()

const submitHandler =async(e)=>{
  e.preventDefault()
  if(password !== confirmPassword){
   return toast.error('Password not match')
  }
  
  const user = JSON.parse(localStorage.getItem('userData'))
  if(!user){
    toast.error('Error occured while processing credential Provide mail')
  return navigate('/forget-password')
  }
   const {email} = user
  const res = await resetPassword({email,password}).unwrap()
  const {status,...rest} = res
  if(res?.status === 200){
    dispatch(setCredentials({...rest}))
    toast.success('Password Updated Successfullt')
    navigate("/");
    return

  }
  

}


  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <Link
          to="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Welcome Back..
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Your Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  value={password}
                  autoComplete="false"
                  onChange={(e) => {
                 
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  value={confirmPassword}
                  autoComplete="false"
                  onChange={(e) => {
                 
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
              { isLoading ? <ClipLoader
               color="#ffffff" size={20}
               /> :  "Reset"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )

}


export default UserResetPassword