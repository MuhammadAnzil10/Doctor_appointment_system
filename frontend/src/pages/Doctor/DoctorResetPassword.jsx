import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { useDoctorResetPasswordMutation } from "../../DoctorSlices/doctorApiSlice.js";
import { setDoctorCredential } from "../../DoctorSlices/DoctorAuthSlice.js";
import { useDispatch } from "react-redux";

const DoctorResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPasswordDoctor, { isLoading }] = useDoctorResetPasswordMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password not match");
    }
    const email = localStorage.getItem("doctorData");

    if (!email) {
      toast.error("Error occured while processing credential Provide mail");
      return navigate("/forget-password");
    }

    try {
      const res = await resetPasswordDoctor({ email, password }).unwrap();

      const { status, ...rest } = res;
      localStorage.removeItem('doctorData')
      dispatch(setDoctorCredential({ ...rest }));
      toast.success("Password Updated Successfully");
      navigate("/doctor");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <ToastContainer />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter new password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                value={confirmPassword}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? <CircleLoader color="#ffff" size={20} /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default DoctorResetPassword;
