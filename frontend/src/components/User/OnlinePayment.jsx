import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import "../../card.css";
import { useConfirmPaymentMutation } from "../../UserSlices/usersApiSlice.js";
const OnlinePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate()
  const [confirmPayment] = useConfirmPaymentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage("An unexpected error occured.");
    }
    if (paymentIntent) {
      try {
        const response = await confirmPayment({
          paymentIntentId: paymentIntent.id,
        }).unwrap();
        navigate('/payment-success')
      } catch (error) {
        
        setIsProcessing(false);
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="m min-h-screen">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default OnlinePayment;
