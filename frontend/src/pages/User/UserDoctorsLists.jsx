import DoctorCards from "../../components/User/DoctorCard";
import { useUserGetAllDoctorQuery } from "../../UserSlices/usersApiSlice";
import { useState, useEffect } from "react";

const UserDoctorsLists = () => {
  const { data: doctors, refetch } = useUserGetAllDoctorQuery();
  const [allDoctors, setAllDoctors] = useState(doctors || []);


  useEffect(() => {
    if (doctors) setAllDoctors(doctors);
  }, [doctors]);
  return (
    <div className="p-3 m-4">
      <div>
        <h1 className="text-center text-3xl font-bold my-5">Doctors</h1>
      </div>
      <div className=" flex gap-6 ">
        {allDoctors ? (
          allDoctors.map((doctor, index) => (
            <DoctorCards {...doctor} key={index}   />
          ))
        ) : (
          <h1>No data</h1>
        )}
      </div>
    </div>
  );
};

export default UserDoctorsLists;
