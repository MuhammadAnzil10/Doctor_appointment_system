import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDoctorLoginMutation } from "../../DoctorSlices/doctorApiSlice.js";
import {CircleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import { setDoctorCredential } from "../../DoctorSlices/DoctorAuthSlice.js";
import { useDispatch } from "react-redux";
const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctorLogin, { isLoading }] = useDoctorLoginMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email.trim() === "" || password.trim() === "" ){
      return toast.error('Invalid Input')
    }

    try {

      const res = await doctorLogin({email,password}).unwrap()
      console.log(res);
      dispatch(setDoctorCredential({...res}))
      toast.success('Logged in Successfully')
      navigate('/doctor')
    } catch (err) {
      toast.error(err.data.message || err.error)
    }

  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <ToastContainer />
        {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcomeback to V'care Hospital
        </h2>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            {isLoading ? <CircleLoader color="#ffff" size={20} /> :(
               <button
               type="submit"
               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               Sign in
             </button>
            )}
           
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/doctor/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;
