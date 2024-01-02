import { useState, useEffect } from "react";
import { useGetFavouriteQuery } from "../../UserSlices/usersApiSlice.js";
import FavouriteDoctorCard from "../../components/User/FavouriteDoctorCard.jsx";

const Favourites = () => {
  const { data: getFavourites, refetch, isLoading } = useGetFavouriteQuery();

 

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (getFavourites) {
      setFavourites(getFavourites?.favouriteDoctors?.doctor);
      refetch();
    }
  }, [getFavourites]);

  if (isLoading) {
    return (
      <div className="container mt-5">
        <center>Loading.....</center>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {favourites?.length > 0 ? (
          favourites?.map((doctor, index) => (
            <FavouriteDoctorCard
              doctor={doctor}
              key={index}
              setFavourites={setFavourites}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-xl font-semibold mb-2">Empty favorites</h1>
              <div className="animate-ping text-gray-500">😢</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
