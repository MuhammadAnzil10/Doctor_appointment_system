


const PaymentSuccessPage =()=>{

  return(
    <div className="min-h-screen flex flex-col justify-center">
      <h1 className="text-gray-500 mx-auto"><img className="w-14 h-14 mx-auto" src="/src/assets/images/checked.png" alt="" />Payment Successful</h1>
      <h1 className="mx-auto">Appointment Booked</h1>
      <button className="w-44 mx-auto">Your Appointments</button>
    </div>
  )
}

export default PaymentSuccessPage;