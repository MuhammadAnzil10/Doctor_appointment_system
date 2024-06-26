import { apiSlice } from "../UserSlices/apiSlice.js";

const ADMIN_URL = "/api/admin";

export const adminApiSlices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    getAllUsers: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: "GET",
      }),
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/user-block/${id}`,
        method: "GET",
      }),
    }),
    unBlockUser:builder.mutation({
      query:(id)=>({
        url:`${ADMIN_URL}/user-unblock/${id}`,
        method:"GET"
      })
    }),
    adminForgetPassword:builder.mutation({
      query:(data)=>({
          url:`${ADMIN_URL}/forget-password`,
          method:"POST",
          body:data
      })
    }),
    adminVerifyOtp:builder.mutation({
      query:(data)=>({
          url:`${ADMIN_URL}/otp-verify`,
          method:"POST",
          body:data

      })
    }),
    adminResetPassword:builder.mutation({
      query:(data)=>({
          url:`${ADMIN_URL}/reset-password`,
          method:"POST",
          body:data
      })
    }),
    addSepcialization:builder.mutation({
      query:(data)=>({
       url:`${ADMIN_URL}/specialization`,
       method:"POST",
       body:data
      })
    }),
    getAllSpecialization:builder.query({
      query:()=>({
        url:`${ADMIN_URL}/specializations`,
        method:"GET"
      })
    }),
    getAllDoctors:builder.query({
      query:()=>({
       url:`${ADMIN_URL}/doctors`,
       method:"GET",
      })
    }),
    verifyDoctor:builder.mutation({
      query:(id)=>({
        url:`${ADMIN_URL}/verify-doctor/${id}`,
        method:"PUT",
        body:{id}
      })
    }),
    blockDoctor:builder.mutation({
      query:(id)=>({
          url:`${ADMIN_URL}/block-doctor/${id}`,
          method:"PUT"
      })
    }),
    unBlockDoctor:builder.mutation({
      query:(id)=>({
          url:`${ADMIN_URL}/unblock-doctor/${id}`,
          method:"PUT"
      })
    }),
    updateAdminProfile:builder.mutation({
      query:(data)=>({
        url:`${ADMIN_URL}/admin-profile`,
        method:'PUT',
        body:data
      })
    }),
    adminGetAppointemnts:builder.query({
      query:()=>({
        url:`${ADMIN_URL}/appointments`,
        method:"GET",
      })
    })
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useGetAllUsersMutation,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useAdminForgetPasswordMutation,
  useAdminVerifyOtpMutation,
  useAdminResetPasswordMutation,
  useAddSepcializationMutation,
  useGetAllSpecializationQuery,
  useGetAllDoctorsQuery,
  useVerifyDoctorMutation,
  useBlockDoctorMutation,
  useUnBlockDoctorMutation,
  useUpdateAdminProfileMutation,
  useAdminGetAppointemntsQuery
  
} = adminApiSlices;

