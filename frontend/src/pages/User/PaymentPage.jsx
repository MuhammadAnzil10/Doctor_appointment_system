import { useEffect, useState } from "react";
import OnlinePayment from "../../components/User/OnlinePayment.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCreatePaymentIntentMutation, useMakePaymentMutation } from "../../UserSlices/usersApiSlice.js";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY_VALUE;
const stripe = loadStripe(stripePublicKey);

const PaymentPage = () => {
  const {doctorId:doctor,slotId:slot} = useParams()
  const [paymentMethod, setPaymentMethod] = useState("");
  const [stripePromise, setStripePromise] = useState(stripe || null);
  const [clientSecret, setClientSecret] = useState("");
  const [slotId, setSlotId] = useState(slot || '')
  const [doctorId, setDoctorId] = useState(doctor || '')
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [makePayment,{isLoading}] = useMakePaymentMutation()
  
  const navigate = useNavigate()
  
  useEffect(() => {
   
   if(!doctorId || !slotId){
    return navigate('/doctors')
   }

    createIntent();
  }, []);

  const createIntent = async () => {
   
    try {
      const respone = await createPaymentIntent({
        doctorId,
        slotId,
      }).unwrap();
      setClientSecret(respone.clientSecret);
    } catch (error) {
      toast.error('Server error')
    }
  };

  const handleSubmitPayment =async(e)=>{
    e.preventDefault();
    if(!paymentMethod){
      return toast.warn("Please select a payment method")
    }

    try {
      const response = await makePayment({slotId,doctorId,paymentMethod}).unwrap()
      setSlotId('')
      setDoctorId('')
      toast.success("Appintment Booked")
      navigate('/payment-success')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
       
  }


  return (
    <>
      {paymentMethod === "Online" ? (clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <OnlinePayment />
        </Elements>
      ) ): (
        <div className="flex flex-col min-h-screen">
          <div className=" flex justify-center p-6">
            <div className="grid grid-cols-1 gap-2 grid-flow-col mt-8">
              <form className="grid grid-cols-1 gap-2 grid-flow-col mt-8">
                <div className="bg-gray-300 flex justify-center align-middle gap-2 my-2 h-40 w-40">
                  <input
                    type="radio"
                    name=""
                    id=""
                    value="Cash"
                    checked={paymentMethod === "Cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="my-auto font-bold">Cash</span>
                </div>
                <div className="bg-gray-300 flex justify-center align-middle my-2 gap-2 h-40 w-40">
                  <input
                    type="radio"
                    name=""
                    id=""
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="my-auto font-bold">Online</span>
                </div>
                <div className="bg-gray-300 flex justify-center align-middle my-2 gap-2 h-40 w-40">
                  <input
                    type="radio"
                    name=""
                    id=""
                    value="Wallet"
                    checked={paymentMethod === "Wallet"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="my-auto font-bold">Wallet</span>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-primary-400 rounded-md p-4" onClick={handleSubmitPayment}>
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
