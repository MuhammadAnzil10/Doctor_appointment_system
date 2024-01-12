import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUpdateDoctorProfileMutation } from "../../DoctorSlices/doctorApiSlice.js";
import { setDoctorCredential } from "../../DoctorSlices/DoctorAuthSlice.js";
import Slot from "../../components/Doctor/Slot.jsx";
const DoctorProfile = () => {
  const { doctorInfo } = useSelector((state) => state.doctorAuth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [show, setShow] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [slot, setSlot] = useState({});
  const dispatch = useDispatch();
  const [updateDoctorProfile, { isLoading }] = useUpdateDoctorProfileMutation();
  useEffect(() => {
    setName(doctorInfo.name);
    setEmail(doctorInfo.email);
    setPhone(doctorInfo.phone);
    setExperience(doctorInfo.experience);
    setQualification(doctorInfo.qualification);
    setImage(doctorInfo.images);
    setSpecialization(doctorInfo.specialization);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTime = tomorrow.toISOString().split("T")[0];
    setMinDate(formattedTime);
  }, [doctorInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password not match");
    }

    try {
      const res = await updateDoctorProfile({
        phone,
        email,
        qualification,
        experience,
        password,
      }).unwrap();

      dispatch(setDoctorCredential({ ...res }));
      toast.success("Profile Updates successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-white w-full flex flex-col justify-center gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4 flex space-x-4">
          <div className=" w-full  px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold flex xl:mr-6  justify-center  sm:text-xl">
              Profile
            </h2>
            <div className="grid max-w-2xl mx-auto mt-8">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-cente justify-center  space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    className="object-cover w-20 h-20  mx-auto p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={image}
                    alt="Profile Picture"
                  />
                </div>
                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="full_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black"
                      >
                        Your full name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your full name"
                        value={name}
                        disabled
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="your.email@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="your phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="qualification"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black"
                    >
                      Qualification
                    </label>
                    <input
                      type="text"
                      id="qualification"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="experience"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black"
                    >
                      Experience
                    </label>
                    <input
                      type="text"
                      id="experience"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="specializaton"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black"
                    >
                      Specializaton
                    </label>
                    <input
                      type="text"
                      id="specializaton"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="specializaton"
                      value={specialization}
                      autoComplete="none"
                      disabled
                      onChange={(e) => setSpecialization(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="*******"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-black"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="*******"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassowrd(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Update
                    </button>
                  </div>
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={(e) => setShow(!show)}
                      type="button"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Create Slote
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {show && <Slot minDate={minDate}/>}
      </main>
    </div>
  );
};

export default DoctorProfile;
