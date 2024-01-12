import { useState } from "react";


const Slot = ({minDate})=>{

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

console.log(date);
  const handleSubmit = async(e)=>{
      e.preventDefault()

     
  }
 

  return(
    <div className="absolute top-3/4 w-3/5   ">
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
              onChange={e=>setDate(e.target.value)}
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
              onChange={e=>setStartTime(e.target.value)}
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
              onChange={e=>setEndTime(e.target.value)}
              value={endTime}
            />
          </div>
          <div className="w-full h-auto mt-4 flex justify-center">
            <button
              className="bg-green-400 hover:bg-green-500 text-white font-bold
               rounded-full py-2 px-4 border  focus:outline-none focus:shadow-outline "
            >
              Create
            </button>
          </div>
          </form>
        </div>
      </div>
  </div>
  )
}


export default Slot