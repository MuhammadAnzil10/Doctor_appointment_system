import stripeInstance from "../utils/stripeInstance.js";
const stripe = stripeInstance();

export const createIntentStripe = (data) => {
  const { amount, ...rest } = data;
  return new Promise(async (resolve, reject) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { ...rest },
    });
   
    if (paymentIntent) {
      resolve({success:true,paymentIntent});
    } else {
      reject({ success: false, message: "Error creating Payment Intent" });
    }
  });
};

export const retrievePaymentMetadata = (paymentIntentId) => {
        
return new Promise(async(resolve,reject)=>{
      
  let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if(paymentIntent) resolve({success:true,paymentIntent})

  else reject({success:false,paymentIntent})
})
};
