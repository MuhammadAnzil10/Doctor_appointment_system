import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import { useGetAllSpecializationQuery } from "../../AdminSlices/adminApiSlice.js";
import { useDoctorRegisterMutation } from "../../DoctorSlices/doctorApiSlice.js";
import userProfile from "../../assets/images/profile.png";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { doctorFormValidation } from "../../Helpers.js";
import { Link, useNavigate } from "react-router-dom";
const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [phone, setPhone] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [password, setPassword] = useState("");
  const [doctorRegister] = useDoctorRegisterMutation();
  const [cloudImage, setCloudImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [specialization, setSpecialization] = useState("");
  const { data: SpecializationLists, isError } = useGetAllSpecializationQuery();
  const [specializationList, setSpecializationList] = useState(
    SpecializationLists || []
  );

  useEffect(() => {
    setSpecializationList(SpecializationLists || []);
  }, [SpecializationLists]);

  const imageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {message,status} = doctorFormValidation({
      name,
      email,
      phone,
      address,
      qualification,
      experience,
      specialization,
      password,
      cloudImage,
    })
    console.log(status);
    if (!status) {
    
      return toast(message);
    }

    try {
      const res = await doctorRegister({
        name,
        email,
        phone,
        address,
        qualification,
        experience,
        specialization,
        password,
        cloudImage,
      }).unwrap();
      toast.success("Form submitted successfully");
      toast.success("wait for administartor confirmation mail");
      navigate("/doctor");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (image) {
      handleFileChange();
    }
  }, [image]);

  const handleFileChange = async () => {
    const fileSizeInBytes = image.size;
    const fileSizeInMb = fileSizeInBytes / (1024 * 1024);

    if (!image.type.startsWith("image/")) {
      return toast.error("Please upload valid image");
    }
    if (fileSizeInMb > 5) {
      return toast.error("Above 5mb file is not allowed");
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "hmjcpvyg");
    formData.append("cloud_name", "da090dgs3");
    setIsLoading(true);
    axios
      .post("https://api.cloudinary.com/v1_1/da090dgs3/image/upload", formData)
      .then((data) => {
        setCloudImage(data?.data?.url);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          {<ToastContainer />}
          <h2 className="font-semibold text-xl text-gray-600">
            Registration Form{" "}
            <Link to="/doctor">
              <p className="relative self-start inline-block w-auto px-4 py-2 mx-auto mt-0 text-base font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0">
                Login
              </p>
            </Link>
          </h2>

          <p className="text-gray-500 mb-6">Vcare Hospital.</p>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
                <img
                  src={cloudImage ? cloudImage : userProfile}
                  className="w-28 h-28 object-cover rounded-full p-2"
                  alt=""
                />
                {isLoading ? (
                  <CircleLoader
                    color="#0000ff"
                    size={20}
                    className="ml-12 py-2 px-4"
                  />
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                    onClick={(e) => imageRef.current.click()}
                  >
                    Upload
                  </button>
                )}
              </div>
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        autoComplete="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="email@gmail.com"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="9090******"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Adress/Street"
                        value={address.street}
                        onChange={(e) =>
                          setAddress({ ...address, street: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / region</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          name="country"
                          id="country"
                          placeholder="Country"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          value={address.country}
                          onChange={(e) =>
                            setAddress({ ...address, country: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="state">State / province</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          name="state"
                          id="state"
                          placeholder="State"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          value={address.state}
                          onChange={(e) =>
                            setAddress({ ...address, state: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="zipcode"
                        value={address.zipcode}
                        onChange={(e) =>
                          setAddress({ ...address, zipcode: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-5"></div>
                    <div className="md:col-span-3">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        hidden
                        ref={imageRef}
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="qualification">Qualification</label>
                      <input
                        type="text"
                        name="qualification"
                        id="qualification"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="experience">Experience</label>
                      <input
                        type="text"
                        name="experience"
                        id="experience"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="department">Specialization</label>
                      <select
                        name="specialization"
                        id="specialization"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                      >
                        <option value="">Select a Specialization</option>

                        {specializationList ? (
                          specializationList.map((specialization, index) => {
                            return (
                              <option value={specialization._id} key={index}>
                                {specialization.name}
                              </option>
                            );
                          })
                        ) : (
                          <option value="">No Data Available</option>
                        )}
                      </select>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="experience">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Enter Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <p className="font-bold p-2">Submit for verification</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
