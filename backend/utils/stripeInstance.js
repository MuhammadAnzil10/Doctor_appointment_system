import stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config();

const stripeInstance =()=>{
   
  const stripeSecret = process.env.STRIPE_SECRET_KEY_VALUE;

  const stripeInstance = stripe(stripeSecret);

  return stripeInstance
}

export default stripeInstance;