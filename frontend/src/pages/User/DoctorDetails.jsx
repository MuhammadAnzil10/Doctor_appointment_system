import Testimonial from "../../components/Doctor/Testimonial";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserGetOneDoctorMutation } from "../../UserSlices/usersApiSlice.js";
import { toast } from "react-toastify";
import { BarLoader } from "react-spinners";
import { setTommorrowDate } from "../../Helpers.js";
import { useGetSlotsByDateQuery } from "../../UserSlices/usersApiSlice.js";
import { CircleLoader } from "react-spinners";
const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [doctorId, setDoctorId] = useState(id || "");
  const [minDate, setMinDate] = useState("");
  const [date, setDate] = useState("2001-01-01");
  const [slotId, setSlotId] = useState("");
  const navigate = useNavigate();
  const [getDoctor, { isLoading }] = useUserGetOneDoctorMutation();
  const { data, error, refetch } = useGetSlotsByDateQuery({
    date,
    doctorId,
    enabled: false, // Disable automatic execution
  });

  const handleClick = (e) => {
    refetch({ date, doctorId });
  };

  useEffect(() => {
    fetchData(id);
    const formattedDate = setTommorrowDate();
    setMinDate(formattedDate);
  }, []);
  const fetchData = async (id) => {
    try {
      const res = await getDoctor(id).unwrap();
      setDoctor(res);
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const handleBooking = async (e) => {
    if (!slotId || !doctorId) {
      return toast.error("Please select Slot");
    }

    navigate(`/payment/${slotId}/${doctorId}`);
  };
  const setSlot = async (id) => {
    setSlotId(id);
  };

 
  return (
    <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800 min-h-screen">
      <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6 ">
        <div className="flex flex-wrap -mx-4  ">
          <div className=" px-4 md:w-1/2 h-72  " style={{ width: "14rem" }}>
            <div className="sticky top-0 z-50 overflow-hidden w-52">
              <div className="relative mb-6 lg:mb-10 lg:h-2/4   ">
                <img
                  src={doctor.images}
                  alt=""
                  className="object-cover  lg:h-full h-60 w-52 "
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 ">
            <div className="lg:pl-20">
              <div className="mb-8 ">
                <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
                  Doctor
                </span>
                <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                  {doctor.name}{" "}
                  <span className="text-2xl">({doctor.qualification})</span>
                </h2>
                <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 ">
                  {doctor?.specialization?.name}
                </h2>
                <div className="flex items-center mb-6">
                  <ul className="flex mr-2">
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                  <p className="text-xs dark:text-gray-400 ">
                    (2 customer reviews)
                  </p>
                </div>
                <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                  {doctor?.specialization?.description} <br />
                  Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet
                  Lorem ispum dor amet Lorem ispum dor amet
                </p>
                <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                  <span>
                    {doctor.consultationFee > 0
                      ? `Rs: ${doctor.consultationFee} /-`
                      : "Not Available"}
                  </span>
                  <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400"></span>
                </p>
              </div>
            </div>
          </div>
          {doctor?.consultationFee > 0 && (
            <div className="m-4 flex">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 ">
                <div className="">
                  <input
                    type="date"
                    min={minDate}
                    name="appointment_date"
                    id="appointment_date"
                    className="border mr-7 border-gray-300 rounded-lg text-center p-2 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                  />
                  <button
                    onClick={handleClick}
                    className="bg-primary-400 rounded-md  p-2"
                  >
                    {" "}
                    Availability
                  </button>
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    {data && data?.length > 0 ? (
                      data.map((slot, index) => (
                        <span
                          key={index}
                          onClick={(e) => setSlot(slot._id)}
                          className={
                            slot._id === slotId
                              ? "spanBtn bg-primary-400 text-white p-2 rounded-md cursor-pointer hover:bg-gray-500 hover:text-white"
                              : "spanBtn bg-black text-white p-2 rounded-md cursor-pointer hover:bg-gray-500 hover:text-white"
                          }
                        >
                          {slot.startTime >= 12
                            ? `${slot.startTime} PM`
                            : `${slot.startTime} AM`}
                        </span>
                      ))
                    ) : (
                      <span
                        className="noSlotSpan bg-black text-white  rounded-md cursor-pointer hover:bg-gray-500 hover:text-white"
                      >No Slots available</span>
                    )}
                  </div>
                  <button
                    onClick={handleBooking}
                    className="btn p-2 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100
                   dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex  gap-3 overflow-y-hidden overflow-x-scroll hide-scrollbar">
        {[1, 2, 3, 4, 5, 5, 6, 7, 7, 8].map((v, index) => {
          return <Testimonial key={index} />;
        })}
      </div>
    </section>
  );
};

export default DoctorDetails;
