

const Dashboard =()=>{

  return(
    <section className="mb-52">
      <div className="bg-slate-600 container">
        <div className="flex  justify-evenly py-4 ">

          <div className="Box bg-red-500 w-32 h-32  text-center pt-11">Users</div>
          <div className="Box bg-blue-500 w-32 h-32 text-center pt-11">Doctors</div>
          <div className="Box bg-pink-500 w-32 h-32 text-center pt-11">Appointments</div>
           
        </div>
      </div>
    </section>
  )
}

export default Dashboard;