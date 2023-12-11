import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import homeImage from "../../assets/images/userHomePage.png";
import hospitalImg from "../../assets/images/hospital.jpg";
import Carousel1 from "../../components/Carousel";

const UserHome = () => {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(localStorage.getItem('userData')){
      localStorage.removeItem('userData')
    }
    const isToastShownBefore = localStorage.getItem("isToastShown");
    if (userInfo && !isToastShownBefore) {
      toast.success("Logged in successfully");
      localStorage.setItem("isToastShown", "true");
    }
  }, [userInfo]);

  return (
    <div className="flex-col">
       <Carousel1 images={homeImage} />
      <div className="bg-slate-600 flex items-center justify-center">
        <div className="w-6/12 inline-block">
          <img src={homeImage} alt="" className="h-full w-f" />
        </div>
        <div className="w-6/12 inline-block  rounded-lg ">
          <p className="text-white text-center font-bold ">
            {" "}
            "Welcome to 'We Care Hospital,' where our dedicated team is
            committed to providing compassionate and personalized care for your
            well-being
          </p>
        </div>
      </div>
      <div className="bg-red-600">
        <div className="bg-black flex  items-center justify-evenly">
          <div className="bg-yellow-500 w-52 h-52">Cont 1</div>
          <div className="bg-green-500 w-52 h-52">Cont 2</div>
          <div className="bg-purple-600 w-52 h-52">Cont 3</div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
