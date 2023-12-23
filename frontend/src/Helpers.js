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
  } else if (phone?.trim() === "") {
    console.log("phone");
    return false;
  } else if (
    street?.trim() === "" ||
    country?.trim() === "" ||
    state?.trim() === "" ||
    pincode?.trim() === "" ||
    city?.trim() === ""
  ) {
    console.log("address");
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

export const userRegisterValidation = (data) => {
  let { name, email, age, phone, bloodGroup, password, confirmPassword } = data;

  const nameRegex = /^[A-Za-z\s]+$/;
 
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const phoneRegex = /^[6-9]\d{9}$/;
  const bloodGroupRegex = /^(A|B|AB|O)[+-]?$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!nameRegex.test(name)) {
    return {
      status: false,
      message: "Please enter valid name",
    };
  } else if (!emailRegex.test(email)) {
    return {
      status: false,
      message: "Please enter valid email",
    };
  } else if (Number(age) < 18) {
    return {
      status: false,
      message: "Age criteria not met",
    };
  } else if (!phoneRegex.test(phone)) {
    return {
      status: false,
      message: "Please enter valid phone number",
    };
  } else if (!bloodGroupRegex.test(bloodGroup)) {
    return {
      status: false,
      message: "Please enter valid blood group",
    };
  } else if (password !== confirmPassword) {
    return {
      status: false,
      message: "Password and confirm password is not match",
    };
  } else if (!passwordRegex.test(password)) {
    return {
      status: false,
      message: "Plese enter valid password",
    };
  } else {
    return {
      status: true,
    };
  }
};
