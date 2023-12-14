import { useState } from "react";
import { toast } from "react-toastify";
import { useAdminResetPasswordMutation } from "../../AdminSlices/adminApiSlice";
import { CircleLoader } from "react-spinners";
import { setAdminCredential } from "../../AdminSlices/adminAuthSlice";
import { useDispatch } from "react-redux";

const AdminResetPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminResetPassword,{isLoading}] = useAdminResetPasswordMutation() 
  const dispatch = useDispatch()

  const submitHandler =async (e)=>{
    e.preventDefault()

    if(password !== confirmPassword){
      return toast("Password not match")
    }
    const admin = JSON.parse(localStorage.getItem('adminData'))
    if(!admin){
      toast.error('Error occured while processing credential Provide mail')
    return navigate('/forget-password')
    }
    const {email} = admin


    try {

      const res = await adminResetPassword({email,password}).unwrap()
      const { status, ...rest } = res;
      console.log(res); 
        dispatch(setAdminCredential({ ...rest }));
        toast.success("Password Updated Successfullt");
        navigate("/admin/dashboard");
      
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }



  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center ">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              New Password
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <form onSubmit={submitHandler}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                   <input
                    className="w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Confirm Pasword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    {isLoading ? <CircleLoader  color="#ffffff" size={20} />: (<span className="ml-3">Submit</span>) }
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminResetPassword
