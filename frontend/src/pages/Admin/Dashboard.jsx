

const Dashboard =()=>{
  

  return(
    <section className="mb-8 sm:mb-16 lg:mb-32 min-h-screen">
    <div className="bg-white-600 container mx-auto">
        <div className="flex justify-around py-8">

            <div className="bg-red-500 w-32 sm:w-40 h-32 sm:h-40 p-4 text-center rounded-lg">
                <p className="text-white text-lg sm:text-xl font-semibold">Users</p>
                <p className="text-white text-2xl sm:text-3xl font-bold pt-2">37</p>
            </div>

            <div className="bg-blue-500 w-32 sm:w-40 h-32 sm:h-40 p-4 text-center rounded-lg">
                <p className="text-white text-lg sm:text-xl font-semibold">Doctors</p>
                <p className="text-white text-2xl sm:text-3xl font-bold pt-2">12</p>
            </div>

            <div className="bg-pink-500 w-32 sm:w-40 h-32 sm:h-40 p-4 text-center rounded-lg">
                <p className="text-white text-lg sm:text-xl font-semibold">Appointments</p>
                <p className="text-white text-2xl sm:text-3xl font-bold pt-2">25</p>
            </div>

        </div>
    </div>
</section>

  )
}

export default Dashboard;