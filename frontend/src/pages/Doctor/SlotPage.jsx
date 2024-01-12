const SlotPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className=" h-screen">
      <div className=" m-7 ">
        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="w-full h-full bg-gray-200 p-8 flex items-center justify-center">
              <div className="w-full h-auto bg-white p-4 rounded-md">
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
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/2 bg-red-400">
          <p>Slotes</p>
        </div>
      </div>
    </div>
  );
};

export default SlotPage;
