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

  const { street, country, state, zipcode, city } = address;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const nameRegex = /^[A-Za-z]{3,}$/;
  const addressRegex = /^[A-Za-z0-9]+$/;
  const charRegex = /^[A-Za-z]+$/;

  const experienceRegex = /^[0-9]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
console.log(specialization.length);
console.log(cloudImage.length);
  if (!nameRegex.test(name)) {
    return {
      status: false,
      message: "Please Provide valid name(length more than 3 character)",
    };
  } else if (!emailRegex?.test(email)) {
    return { status: false, message: "Please Provide valid Email" };
  } else if (!phoneRegex.test(phone)) {
    return { status: false, message: "Please Provide valid Phone number" };
  } else if (!addressRegex.test(street)) {
    return { status: false, message: "Please Provide valid Street name" };
  } else if (!addressRegex.test(city)) {
    return { status: false, message: "Please provide valid City" };
  } else if (!charRegex.test(country)) {
    return { status: false, message: "Please provide valid Country name" };
  } else if (!charRegex.test(state)) {
    return { status: false, message: "Please provide valid State name" };
  } else if (zipcode.length !== 6) {
    return { status: false, message: "Please provide valid zipcode" };
  } else if ((!qualification, length === "")) {
    return { status: false, message: "Please provide valid Qualification" };
  } else if (!experienceRegex.test(experience)) {
    return { status: false, message: "Please provide valid Year" };
  }  else if (specialization.trim() === '' || cloudImage.trim() === '') {
    return {
      status: false,
      message: "Please Provide valid Image and specialization ",
    };
  } else if (!passwordRegex.test(password)) {
    return {
      status: false,
      message: "Please provide valid Password(Min Length 8)",
    };
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

  return { currentItems, indexOfLastItem };
};



export const validateSlotForm =(date,startTime,endTime)=>{
 
  if(date === ''){
    return{status:false, message:"Please Provide Date"}
  }
  else if(startTime === ''){
    return{status:false, message:"Please Provide Start Time"}
  }else if(endTime === ''){
    return{status:false, message:"Please Provide End Time"}
  }else if(startTime > endTime){
    return{status:false, message:"Please Provide Correct time range"}
  }else{
    return {status:true}
  }
}

export const setTommorrowDate =()=>{
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTime = tomorrow.toISOString().split("T")[0];

  return formattedTime
}