import { apiSlice } from "../UserSlices/apiSlice.js";

const ADMIN_URL = "/api/doctor";

const doctorApiSlice = apiSlice.injectEndpoints({

  endpoints:(builder)=>({

    doctorRegister:builder.mutation({
      query:(data)=>({
     
        url:`${ADMIN_URL}/register`,
        method:"POST",
        body:data
      })
    })

  })
})


export const {useDoctorRegisterMutation} = doctorApiSlice