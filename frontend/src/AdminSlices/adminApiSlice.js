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
  useGetAllSpecializationQuery

} = adminApiSlices;
