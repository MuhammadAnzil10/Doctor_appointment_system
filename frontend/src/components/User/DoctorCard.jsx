import { Link } from "react-router-dom";
import { useFavouriteMutation } from "../../UserSlices/usersApiSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useGetFavouriteQuery } from "../../UserSlices/usersApiSlice";
const DoctorCards = ({ name, images, qualification, specialization, _id }) => {
  const [favourite, { isLoading }] = useFavouriteMutation();
  const { data: getFavourites, refetch } = useGetFavouriteQuery();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (getFavourites) {
      setFavourites(getFavourites?.favouriteDoctors?.doctor);
      refetch();
    }
  }, [getFavourites]);

  const handleFavourite = async () => {
    try {
      const res = await favourite(_id).unwrap();

      if (res.isRemoved) {
        setFavourites(res?.updatedFavourites?.doctor);
        toast.success("Removed from favourite");
      } else if (res.isAdded) {
        setFavourites(res.updatedFavourites.doctor);
        toast.success("Added to favourite");
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const isDoctorFavourited = () => {
    return favourites?.find((item) => {
      return item?.doctorId._id === _id;
    });
  };

  return (
    <div className="relative flex w-full max-w-[17rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg h-auto">
      <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
        <img src={images} alt="ui/ux review check" className="h-32 w-full" />
        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
        <button
          className="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></span>
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
            {name}
          </h5>
          <span
            className="ml-auto mr-3 cursor-pointer"
            onClick={handleFavourite}
          >
            {isDoctorFavourited() ? (
              <img src="/src/assets/images/favRed.png" width={"20px"} alt="" />
            ) : (
              <img
                src="/src/assets/images/favBlack.png"
                width={"20px"}
                alt=""
              />
            )}
          </span>
          <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            5.0
          </p>
        </div>
        <p className="block font-sans text-base antialiased font-bold leading-relaxed text-gray-700">
          {qualification}
        </p>
        <p className="block font-sans text-base antialiased font-bold leading-relaxed text-gray-700 underline">
          {specialization.name}
        </p>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
          One of the best{" "}
          <span className="font-bold underline">{specialization.name}</span> in
          India
        </p>
      </div>
      <div className="p-6 pt-3">
        <Link to={"/doctor-details/" + _id}>
          <button
            className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Appointment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCards;
