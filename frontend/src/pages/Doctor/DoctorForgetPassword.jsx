import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useDoctorForgetPasswordMutation } from "../../DoctorSlices/doctorApiSlice.js";
import { CircleLoader } from "react-spinners";


const DoctorForgetPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const[doctorForget,{isLoading}] = useDoctorForgetPasswordMutation()


  const handleSubmit=async(e)=>{
    e.preventDefault()

    try {
      
      const res = await doctorForget({email}).unwrap()
   
      if(res?.status === 200){
        toast.success("Check your mail for verification code")
        navigate(`/doctor/verify-otp?email=${email}`)
       }

    } catch (err) {
      toast.error(err?.data?.message || err?.error)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <ToastContainer />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
         Enter Your Email
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
           
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                 {isLoading ? (
              <CircleLoader color="#ffff" size={20}  />
            ) : 
                "Submit"
                }
              </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};


export default DoctorForgetPassword;