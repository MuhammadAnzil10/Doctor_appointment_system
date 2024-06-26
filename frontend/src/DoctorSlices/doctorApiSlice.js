import { apiSlice } from "../UserSlices/apiSlice.js";

const DOCTOR_URL = "/api/doctor";

const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    doctorRegister: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    doctorLogin: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logoutDoctor: builder.mutation({
      query: () => ({
        url: `${DOCTOR_URL}/logout`,
        method: "POST",
      }),
    }),
    doctorForgetPassword: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/forget-password`,
        method: "POST",
        body: data,
      }),
    }),
    doctorOtpVerify: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/verify-otp`,
        method: "POST",
        body  : data,
      })
    }),
    doctorResetPassword: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
    updateDoctorProfile:builder.mutation({
      query:(data)=>({
         url:`${DOCTOR_URL}/doctor-profile`,
         method:"PUT",
         body:data
      })
    }),
    doctorCreateSlot:builder.mutation({
      query:(data)=>({
         url:`${DOCTOR_URL}/create-slot`,
         method:'POST',
         body:data
      })
    }),
  
    getSlotsByDates:builder.mutation({
      query:(date)=>({
        url:`${DOCTOR_URL}/slots`,
        method:"POST",
        body:date
      })
    }),
    getAppointments:builder.query({
      query:()=>({
       url:`${DOCTOR_URL}/appointments`,
       method:"GET"
      })
    }),
    removeSlot:builder.mutation({
      query:(data)=>({
        url:`${DOCTOR_URL}/remove-slot`,
        method:"DELETE",
        body:data
      })
    }),
    makeCosulted : builder.mutation({
      query:(data)=>({
          url:`${DOCTOR_URL}/consulted`,
          method:'PUT',
          body:data
      })
    }),
    cancelAppointment : builder.mutation({
      query:(data)=>({
        url:`${DOCTOR_URL}/cancel-appointment`,
        method:'PUT',
        body:data
      })
    })
  }),
});

export const {
  useDoctorRegisterMutation,
  useDoctorLoginMutation,
  useLogoutDoctorMutation,
  useDoctorForgetPasswordMutation,
  useDoctorOtpVerifyMutation,
  useDoctorResetPasswordMutation,
  useUpdateDoctorProfileMutation,
  useDoctorCreateSlotMutation,
  useGetSlotsByDatesMutation,
  useGetAppointmentsQuery,
  useRemoveSlotMutation,
  useCancelAppointmentMutation,
  useMakeCosultedMutation
} = doctorApiSlice;
