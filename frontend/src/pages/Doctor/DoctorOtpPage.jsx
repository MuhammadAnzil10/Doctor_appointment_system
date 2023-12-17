import { CircleLoader } from "react-spinners";
import {useRef,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useDoctorOtpVerifyMutation } from "../../DoctorSlices/doctorApiSlice.js";
import {toast} from 'react-toastify'


const DoctorOtpPage =()=>{
  const inputeRef1 = useRef();
  const inputeRef2 = useRef();
  const inputeRef3 = useRef();
  const inputeRef4 = useRef();
  const [otp, setOtp] = useState([]);
  const navigate = useNavigate();
  const [doctorOtpVerify,{isLoading}] = useDoctorOtpVerifyMutation()
  const urlSearchParams = new URLSearchParams(window.location.search);
  const email = urlSearchParams.get("email");

  const handleInput = (e, nextInputRef, index) => {
    const currentInput = e.target;
    const inputValue = currentInput.value;

    if (/^\d$/.test(inputValue)) {
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = inputValue;
        return updatedOtp;
      });

      if (inputValue.length === 1) {
        if (nextInputRef) nextInputRef.current.focus();
      }
    } else if (inputValue === "") {
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        updatedOtp[index] = "";
        return updatedOtp;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verificationCode = otp.join("");

    try {
      const res = await doctorOtpVerify({email,verificationCode}).unwrap()
      console.log(res);
      if(res?.status === 200){
        localStorage.setItem('doctorData',res.email)
       toast.success(res.message)
        navigate('/doctor/reset-password')
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16 ">
                    <input
                      maxLength={1}
                      ref={inputeRef1}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) => handleInput(e, inputeRef2, 1)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength={1}
                      ref={inputeRef2}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) => handleInput(e, inputeRef3, 2)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength={1}
                      ref={inputeRef3}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) => handleInput(e, inputeRef4, 3)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      ref={inputeRef4}
                      maxLength={1}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) => handleInput(e, null, 4)}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                  <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm ">
                        {isLoading ? (
                          <CircleLoader color="#ffffff" size={20} />
                        ) : (
                          "Verify Account"
                        )}
                      </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default DoctorOtpPage;