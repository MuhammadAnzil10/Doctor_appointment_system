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
  const phoneRegex = /^[6-9]\d{9}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (name?.trim() === "" || name?.trim()?.length < 3) {
    return false;
  } else if (email?.trim() === "" || !emailRegex?.test(email?.trim())) {
    return false;
  } else if (!phoneRegex.test(phone)) {
    return false;
  } else if (
    street?.trim() === "" ||
    country?.trim() === "" ||
    state?.trim() === "" ||
    pincode?.trim() === "" ||
    city?.trim() === ""
  ) {
    return false;
  } else if (
    qualification?.trim() === "" ||
    experience?.trim() === "" ||
    specialization?.trim() === "" ||
    passwordRegex.test(password) ||
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

export const sort = (filtered, sortOrder) => {
  const sorted = filtered.sort((a, b) => {
    if (sortOrder === "Asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  return sorted;
};

export const filter = (itemsPerPage, currentPage, filteredDoctors) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);

  return {currentItems,indexOfLastItem};
};
