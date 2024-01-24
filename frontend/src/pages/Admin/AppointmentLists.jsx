import { useEffect, useState } from "react";
import { useAdminGetAppointemntsQuery } from "../../AdminSlices/adminApiSlice.js";
import { getStatusColor } from "../../Helpers.js";
const AppointmentsList = () => {
  const { data, isLoading, error, refetch } = useAdminGetAppointemntsQuery();
  const [appointments, setAppointments] = useState(data || []);

  useEffect(() => {
    refetch();
    if (data) setAppointments(data);
  }, [data]);
  console.log(appointments);

  return (
    <div className="relative overflow-x-auto py-4 px-2 mb-10 min-h-screen">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sl.No
            </th>
            <th scope="col" className="px-6 py-3">
              Patient
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor
            </th>
            <th scope="col" className="px-6 py-3">
              Specialization
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments && appointments.length > 0 ? (
            appointments?.map((appointment, index) => {
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
                  <td className="px-6 py-4">{appointment.userId.name}</td>
                  <td className="px-6 py-4">{appointment.userId.phone}</td>
                  <td className="px-6 py-4">{appointment?.doctorId?.name}</td>
                  <td className="px-6 py-4">
                    {appointment?.doctorId?.specialization?.name}
                  </td>
                  <td className="px-6 py-4">
                    {appointment?.appointmentDate?.split("T")[0]}
                  </td>
                  <td className="px-6 py-4">{appointment?.appointmentTime}</td>
                  <td className="px-6 py-4">
                    <button
                      className={`${getStatusColor(
                        appointment.appointmentStatus
                      )}`}
                    >
                      {appointment.appointmentStatus}
                    </button>
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

export default AppointmentsList;
