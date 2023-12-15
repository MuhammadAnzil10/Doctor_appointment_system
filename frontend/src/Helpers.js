export const doctorFormValidation = (data) => {
  const {
    name,
    email,
    phone,
    address,
    qualification,
    experience,
    specialization,
    password,
    cloudImage,
  } = data;

  const { street, country, state, pincode, city } = address;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (name?.trim() === "" || name?.trim()?.length < 3) {
    console.log("name");
    return false;
  } else if (email?.trim() === "" || !emailRegex?.test(email?.trim())) {
    console.log("phone");
    return false;
  } else if (phone?.trim() === "" ) {
    console.log('phone');
    return false;
  } else if (
    street?.trim() === "" ||
    country?.trim() === "" ||
    state?.trim() === "" ||
    pincode?.trim() === "" ||
    city?.trim() === ""
  ) {
    console.log('address');
    return false;
  } else if (
    qualification?.trim() === "" ||
    experience?.trim() === "" ||
    specialization?.trim() === "" ||
    password?.trim() === "" ||
    cloudImage?.trim() === ""
  ) {
    return false;
  } else {
    return true;
  }
};
