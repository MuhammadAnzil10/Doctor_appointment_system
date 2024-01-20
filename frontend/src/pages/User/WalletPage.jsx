import { useEffect, useState } from "react";
import { useGetWalletQuery } from "../../UserSlices/usersApiSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import RechargePage from "../../components/User/RechargePage.jsx";
import { useCreateWalletIntentMutation } from "../../UserSlices/usersApiSlice.js";
import { toast } from "react-toastify";
import WalletPayment from "../../components/User/WalletPyament.jsx";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY_VALUE;
const stripe = loadStripe(stripePublicKey);

const WalletPage = () => {
  const { data, isLoading, error, refetch } = useGetWalletQuery();
  const [wallet, setWallet] = useState(data || "");
  const [isShow, setShow] = useState(false);
  const [cardView, setCardView] = useState(false);
  const [amount, setAmount] = useState("");
  const [stripePromise, setStripePromise] = useState(stripe || null);
  const [clientSecret, setClientSecret] = useState("");
  const [createWalletIntent] = useCreateWalletIntentMutation();

  useEffect(() => {
    refetch();
    if (data) setWallet(data);
  }, [data]);

  const createIntent = async (amount) => {
    try {
      const respone = await createWalletIntent({
        amount,
      }).unwrap();
      setClientSecret(respone.clientSecret);
      setCardView(!cardView);
    } catch (error) {
      console.log(error.message);
      toast.error("Server error");
    }
  };

  const updateWallet = (cardView, wallet) => {
    setCardView(cardView);
    setShow(!isShow);
    setWallet(wallet);
    toast.success("Reacharge success");
    setAmount("");
  };

  return cardView ? (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <WalletPayment
        setCardView={setCardView}
        updateWallet={updateWallet}
        cardView={cardView}
        setAmount={setAmount}
        setWallet={setWallet}
      />
    </Elements>
  ) : (
    <div className="relative overflow-x-auto py-4 px-2 mb-10 min-h-screen">
      <div className="flex">
        <button className="m-2 ">
          Current balance is :{" "}
          {wallet?.balance > 0 ? `${wallet?.balance}` : "0"} /-
        </button>
        <button className="m-2 bg-green-400" onClick={(e) => setShow(!isShow)}>
          Recharge
        </button>
        {isShow && (
          <RechargePage
            amount={amount}
            setAmount={setAmount}
            createIntent={createIntent}
          />
        )}
      </div>
      <table className="w-full mt-6  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Transaction Id
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {wallet ? (
            wallet?.transactions?.map((transatction, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {transatction._id}
                  </th>
                  <td className="px-6 py-4">
                    {transatction.date.split("T")[0]}
                  </td>
                  <td className="px-6 py-4">{transatction.amount}</td>
                  <td className="px-6 py-4">{transatction.type}</td>
                  <td className="px-6 py-4">
                    {transatction.transactionBalance}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                No Data
              </th>
              <td className="px-6 py-4">No Data</td>
              <td className="px-6 py-4">No Data</td>
              <td className="px-6 py-4">No Data</td>
              <td className="px-6 py-4">No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WalletPage;
