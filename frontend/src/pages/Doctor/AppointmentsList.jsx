import { useEffect, useState } from "react";
import {
  useGetAppointmentsQuery,
  useCancelAppointmentMutation,
  useMakeCosultedMutation,
} from "../../DoctorSlices/doctorApiSlice";
import { toast } from "react-toastify";
const AppointmentsList = () => {
  const { data, isLoading, error, refetch } = useGetAppointmentsQuery();
  const [appointments, setAppointments] = useState(data || []);
  const [makeConsulted] = useMakeCosultedMutation();
  const [cancelAppointment] = useCancelAppointmentMutation();
  // const [appointmentAction, setAppointmentAction] = useState('')

  useEffect(() => {
    refetch();
    if (data) setAppointments(data);
  }, [data]);

  const handleConsultation = async (appointmentId) => {
 

    if (!appointmentId) {
      return toast.error("Please select appointment");
    }

    try {
      const response = await makeConsulted({ appointmentId }).unwrap();
      refetch();
      toast.success("Appointment Consulted");
    } catch (err) {
      return toast.error(err?.data?.message || err.error);
    }
  };

  const cancelConsultaion =async (appointmentId) => {
    if(!appointmentId){
      return toast.error("Select an appointment to Cancel")
    }

    try {

      const response = await cancelAppointment({appointmentId}).unwrap()
      refetch();
      toast.warning(`Appointment has been canceled`);
    } catch (err) {
      toast.error(err?.data?.message || err?.error)
    }

   
  };

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
              Age
            </th>
            <th scope="col" className="px-6 py-3">
              Bk-Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Actions
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
                  <td className="px-6 py-4">{appointment.userId.age}</td>
                  <td className="px-6 py-4">
                    {appointment.appointmentDate.split("T")[0]}
                  </td>
                  <td className="px-6 py-4">{appointment.appointmentTime}</td>
                  <td className="px-6 py-4">{appointment.appointmentStatus}</td>
                  <td className="px-6 py-4 flex justify-around ">
                    {appointment?.appointmentStatus === "Consulted" ? (
                      <button className="bg-green-400">Consulted</button>
                    ) : appointment?.appointmentStatus === "Cancelled" ? (
                      <button className="bg-red-400">Cancelled</button>
                    ) : (
                      <>
                        <button
                          onClick={(e) => handleConsultation(appointment._id)}
                        >
                          Consulted
                        </button>
                        <button
                          onClick={(e) => cancelConsultaion(appointment._id)}
                          className="bg-red-600"
                        >
                          Cancel
                        </button>
                      </>
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
              <td className="px-6 py-4">No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsList;
