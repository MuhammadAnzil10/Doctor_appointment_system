import { apiSlice } from "../UserSlices/apiSlice.js";

const DOCTOR_URL = "/api/doctor";

const doctorApiSlice = apiSlice.injectEndpoints({

  endpoints:(builder)=>({

    doctorRegister:builder.mutation({
      query:(data)=>({
     
        url:`${DOCTOR_URL}/register`,
        method:"POST",
        body:data
      })
    }),
     doctorLogin :builder.mutation({
      query:(data)=>({
          url:`${DOCTOR_URL}/login`,
          method:'POST',
          body:data
      })
     }),
     logoutDoctor:builder.mutation({
      query:()=>({
        url:`${DOCTOR_URL}/logout`,
        method:"POST"
      })
     })
    
  })
})


export const {useDoctorRegisterMutation, useDoctorLoginMutation, useLogoutDoctorMutation} = doctorApiSlice