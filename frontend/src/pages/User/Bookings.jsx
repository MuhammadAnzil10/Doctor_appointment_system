import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import chatImage from '../../assets/images/chat-box.png'
import { useGetUserBookingsQuery } from "../../UserSlices/usersApiSlice";

const Bookings = () => {
  const { data, isLoading, error, refetch } = useGetUserBookingsQuery();
  const [bookings, setBookings] = useState(data || []);

  useEffect(() => {
    refetch();
    if (data) setBookings(data);
  }, [data]);

  return (
    <div className="relative overflow-x-auto py-4 px-2 mb-10 min-h-screen">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sl.No
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3">
              Specialization
            </th>
            <th scope="col" className="px-6 py-3">
              B-Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {bookings && bookings.length > 0 ? (
            bookings?.map((booking, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{booking.doctorId.name}</td>
                  <td className="px-6 py-4">
                    {booking.doctorId.specialization.name}
                  </td>
                  <td className="px-6 py-4">
                    {booking.appointmentDate.split("T")[0]}
                  </td>
                  <td className="px-6 py-4">{booking.appointmentTime}</td>
                  <td className="px-6 py-4">
                    {booking?.appointmentStatus === "Cancelled" ? (
                      <button className="bg-red-400 mx-auto">Cancelled</button>
                    ) : booking?.appointmentStatus === "Consulted" ? (
                      <button className="bg-green-400 mx-auto">Consulted</button>
                    ) : (
                      <button className="bg-yellow-400 mx-auto">Pending</button>
                    )}
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
              <td className="px-6 py-4">No Data</td>
              <td className="px-6 py-4">No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
