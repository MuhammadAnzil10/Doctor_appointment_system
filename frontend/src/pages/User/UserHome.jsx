import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import homeImage from "../../assets/images/userHomePage.png";
import { Link } from "react-router-dom";

const UserHome = () => {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      localStorage.removeItem("userData");
    }
    const isToastShownBefore = localStorage.getItem("isToastShown");
    if (userInfo && !isToastShownBefore) {
      toast.success("Logged in successfully");
      localStorage.setItem("isToastShown", "true");
    }
  }, [userInfo]);

  return (
    <div className="relative  items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64 ">
      <div className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0">
        <div className="z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-40 lg:text-left">
          <h1 className="relative  mb-4 text-3xl font-black leading-tight text-gray-900 sm:text-6xl xl:mb-8">
            Vcare Your family
          </h1>
          <p className="pr-0 mb-8 text-base text-gray-600 sm:text-lg xl:text-xl lg:pr-20">
            "Welcome to 'We Care Hospital,' where our dedicated team is
            committed to providing compassionate and personalized care for your
            well-being
          </p>
          <Link
            to="/doctors"
            className="relative self-start inline-block w-auto px-8 py-4 mx-auto mt-0 text-base font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0"
          >
            Book Today!
          </Link>
        </div>
        <div className="relative z-50 flex flex-col items-end justify-center w-full h-full lg:w-1/2 ms:pl-10">
          <div className="container relative left-0 w-full max-w-4xl lg:absolute xl:max-w-6xl lg:w-screen">
            <img
              src={homeImage}
              className="w-full lg:ml-4 z-0 h-auto mt-20 mb-20 ml-0 lg:mt-24 xl:mt-40 lg:mb-0 lg:h-full lg:-ml-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
