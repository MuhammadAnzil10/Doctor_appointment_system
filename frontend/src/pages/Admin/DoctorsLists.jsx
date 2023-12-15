import { toast } from "react-toastify";
import { useGetAllDoctorsQuery, useVerifyDoctorMutation } from "../../AdminSlices/adminApiSlice.js";
import { useState, useEffect } from "react";
import { CircleLoader } from "react-spinners";


const DoctorsLists = () => {
 
  const { data: doctors, refetch } = useGetAllDoctorsQuery();
  const[verifyDoctor,{isLoading}]= useVerifyDoctorMutation()
  const [doctorsLists, setDoctorsLists] = useState( doctors || []);

  useEffect(() => {
    if(doctors)
    setDoctorsLists(doctors);
  }, [doctors]);

  const handleClick =async (id)=>{
      
    try {

     const res = await verifyDoctor(id).unwrap()
     toast.success(res.message)

     refetch()
    } catch (err) {
      toast.error(err.data.message || err.error)
    }

  }

  return (
    <div className="relative overflow-x-auto py-4 px-2">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sl.No
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Contact
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Qualification
            </th>
            <th scope="col" className="px-6 py-3">
              Experience
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {doctorsLists ? (
            doctorsLists?.map((doctor, index) => {
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
                  <td className="px-6 py-4">{doctor.name}</td>
                  <td className="px-6 py-4">{doctor.phone}</td>
                  <td className="px-6 py-4">{doctor.address.street}</td>
                  <td className="px-6 py-4">{doctor.qualification}</td>
                  <td className="px-6 py-4">{doctor.experience}</td>
                  <td className="px-6 py-4">{doctor.isVerified ? "Verified" : "Pending"}</td>

                 
                  
                  <td className="px-6 py-4">
                    {doctor.isVerified ? (
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Verified
                      </button>
                    ) : isLoading ?  <CircleLoader
                      color="#0000ff"
                      size={20}
                      className="ml-12 py-2 px-4"
                    /> : (
                      <button className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={e=>handleClick(doctor._id)}>
                        Verify
                      </button>
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
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsLists;
