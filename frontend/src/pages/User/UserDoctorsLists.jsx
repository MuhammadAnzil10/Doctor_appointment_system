import DoctorCards from "../../components/User/DoctorCard";
import {
  useUserGetAllDoctorQuery,
  useGetAllSpecializationsQuery,
} from "../../UserSlices/usersApiSlice";
import { useState, useEffect } from "react";
import { filter, sort } from "../../Helpers";
import PaginationButtons from "../../components/PaginationButtons";

const UserDoctorsLists = () => {
  const [searchText, setSearchText] = useState("");
  const { data: doctors, refetch } = useUserGetAllDoctorQuery();
  const { data: specializations, refetch: refetchData } =
    useGetAllSpecializationsQuery();
  const [allDoctors, setAllDoctors] = useState(doctors || []);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [sortOrder, setSortOrder] = useState("Asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (doctors) {
      setAllDoctors(doctors);
      setFilteredDoctors(doctors);
    }
  }, [doctors]);

  useEffect(() => {
    const filtered = allDoctors.filter((doctor) => {
      const matchSpecialization =
        selectedSpecialization === "" ||
        selectedSpecialization.toString() === doctor.specialization._id;
      const matchDocter = doctor.name
        .toLowerCase()
        .includes(searchText.toLocaleLowerCase());
      return matchSpecialization && matchDocter;
    });

    const sortedDoctors = sort(filtered, sortOrder);
    setFilteredDoctors(sortedDoctors);

  }, [searchText, allDoctors, selectedSpecialization, sortOrder]);

  const {currentItems,indexOfLastItem} = filter(5,currentPage,filteredDoctors)

  return (
    <div className="p-3 m-4 min-h-screen">
      <div className="bg-red-200">
        <h1 className="text-center text-3xl font-bold my-5">Doctors</h1>
      </div>
      <div className="p-3">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg w-52 focus:outline-none focus:ring focus:border-primary-500"
          value={searchText}
          placeholder="Enter Doctor Name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className=" p-2 border border-red-300 rounded-lg ml-3 focus:outline-none focus:ring focus:border-primary-500"
          name=""
          id=""
          value={selectedSpecialization}
          onChange={(e) => {
            setSelectedSpecialization(e.target.value);
          }}
        >
          <option value="">Specializations</option>
          {specializations &&
            specializations.map((specialization) => (
              <option key={specialization._id} value={specialization._id}>
                {specialization.name}
              </option>
            ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded-lg ml-3 focus:outline-none focus:ring focus:border-primary-500"
          name="sortOrder"
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
          }}
        >
          <option value="Asc">Sort A-Z</option>
          <option value="Desc">Sort Z-A</option>
        </select>
      </div>
      <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 ">
        {currentItems.length > 0 ? (
          currentItems.map((doctor, index) => (
            <DoctorCards {...doctor} key={index} />
          ))
        ) : (
          <h1>No data</h1>
        )}
      </div>
      {/* <div className="flex justify-center mt-4">
        <button
          onClick={(e) => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "text-gray-500" : "text-gray-800"
          } bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded-l`}
        >
          Prev
        </button>

        <button
          onClick={(e) => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= filteredDoctors.length}
          className={`${
            indexOfLastItem >= filteredDoctors.length
              ? "text-gray-500"
              : "text-gray-800"
          } bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded-r`}
        >
          Next
        </button>
      </div> */}
      <PaginationButtons setCurrentPage={setCurrentPage} indexOfLastItem={indexOfLastItem} currentPage={currentPage} filteredDoctors={filteredDoctors} />
    </div>
  );
};

export default UserDoctorsLists;