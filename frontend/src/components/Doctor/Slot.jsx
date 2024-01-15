import { useState } from "react";
import { useDoctorCreateSlotMutation, useGetSlotsByDatesMutation  } from "../../DoctorSlices/doctorApiSlice.js";
import { toast } from "react-toastify";
import { validateSlotForm } from "../../Helpers.js";
import { CircleLoader } from "react-spinners";
const Slot = ({ minDate, doctorId }) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [slotsDate, setSlotsDate] = useState("");
  const [doctorCreateSlot, { isLoading }] = useDoctorCreateSlotMutation();
  const [getSlotsByDate] = useGetSlotsByDatesMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidForm = validateSlotForm(date, startTime, endTime, doctorId);

    if (!isValidForm.status) {
      return toast.error(isValidForm.message);
    }

    try {
      const response = await doctorCreateSlot({
        date,
        startTime,
        endTime,
        doctorId,
      }).unwrap();
      toast.success("Slot Created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const getSlotsHandler = async (e) => {
    e.preventDefault();
    if (!slotsDate) {
      return toast.error("Please select a date for view slots");
    }

    try {
      const response = await getSlotsByDate({ slotsDate }).unwrap();
      setSlots(response);
      if (response.length < 1) {
        toast.success("No Slots for this date");
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div className="">
      <div className="w-full h-full bg-gray-200 p-8 flex items-center justify-center">
        <div className="w-full h-auto bg-white p-4 rounded-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Slot Creation</h2>
            <div className="w-full h-auto">
              <label htmlFor="date" className="block mb-2">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full p-2 rounded-md bg-gray-100 focus:bg-white"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="w-full h-auto">
              <label htmlFor="startTime" className="block mb-2">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                className="w-full p-2 rounded-md bg-gray-100 focus:bg-white"
                onChange={(e) => setStartTime(e.target.value)}
                value={startTime}
              />
            </div>
            <div className="w-full h-auto mt-4">
              <label htmlFor="endTime" className="block mb-2">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                className="w-full p-2 rounded-md bg-gray-100 focus:bg-white"
                onChange={(e) => setEndTime(e.target.value)}
                value={endTime}
              />
            </div>
            <div className="w-full h-auto mt-4 flex justify-center">
              <button
                className="bg-green-400 hover:bg-green-500 text-white font-bold
               rounded-full py-2 px-4 border  focus:outline-none focus:shadow-outline "
              >
                {isLoading ? <CircleLoader size={20} color="red" /> : "Create"}
              </button>
            </div>
          </form>
        </div>
        <div className=" ml-10">
          <div className="flex">
            {slots?.length > 0 &&
              slots.map((slot, index) => {
                return (
                  <span
                    className=" bg-primary-400 rounded-md m-2 p-4"
                    key={index}
                  >{`${slot.startTime} to ${slot.endTime}`}</span>
                );
              })}
          </div>

          <form onSubmit={getSlotsHandler}>
            <input
              type="date"
              className="w-40 m-4 rounded-md bg-gray-100 focus:bg-white"
              min={minDate}
              onChange={(e) => setSlotsDate(e.target.value)}
            />
            <button
              className="p-2 w-40 ml-4 border rounded-lg bg-primary-500 text-white"
              type="submit"
            >
              View Slots
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Slot;
