import Carousel from "../../components/Carousel";
import homeImage from '../../assets/images/userHomePage.png'

const DoctorHome =()=>{


  return (
    <div className="flex-col ">
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
}


export default DoctorHome