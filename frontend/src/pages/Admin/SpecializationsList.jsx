import { useState, useEffect } from "react";
import { useGetAllSpecializationQuery } from "../../AdminSlices/adminApiSlice.js";
import { Link } from "react-router-dom";

const SpecializationList = () => {
  const {
    data: SpecializationLists,
    isLoading,
    isError,
  } = useGetAllSpecializationQuery();
  const [specializationList, setSpecializationList] = useState(
    SpecializationLists || []
  );

  useEffect(() => {
    setSpecializationList(SpecializationLists || []);
  }, [SpecializationLists]);

  return (
    <div className="relative overflow-x-auto py-4 px-2">
      <div>
      <Link to='/admin/specialization'> <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-4 rounded">
        Add Specialization
      </button>
      </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {specializationList ? (
            specializationList?.map((specialization, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {specialization.name}
                  </th>
                  <td className="px-6 py-4">{specialization.description}</td>
                  <td className="px-6 py-4">
                    {specialization.isBlocked ? (
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Unblock
                      </button>
                    ) : (
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Block
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

export default SpecializationList;
