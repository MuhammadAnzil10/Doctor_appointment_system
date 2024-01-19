import { useEffect, useState } from "react";
import { useGetWalletQuery } from "../../UserSlices/usersApiSlice";

const WalletPage = () => {
  const { data, isLoading, error, refetch } = useGetWalletQuery();
  const [wallet, setWallet] = useState(data || {});

  useEffect(() => {
    refetch();
    if (data) setWallet(data);
  }, [data]);

 
  return (
    <div className="relative overflow-x-auto py-4 px-2 mb-10 min-h-screen">
      <button className="m-2">Current balance is : {wallet?.balance} Rs</button>
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
          { wallet ? (
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
                  <td className="px-6 py-4">{transatction.date.split('T')[0]}</td>
                  <td className="px-6 py-4">
                    {transatction.amount}
                  </td>
                  <td className="px-6 py-4">
                    {transatction.type}
                  </td>
                  <td className="px-6 py-4">{transatction.transactionBalance}</td>
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




