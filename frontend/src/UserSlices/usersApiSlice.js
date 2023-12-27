import { apiSlice } from "./apiSlice.js";

const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, verificationCode }) => ({
        url: `${USERS_URL}/verify-otp`,
        method: "POST",
        body: { email, verificationCode },
      }),
    }),
    resendOtp:builder.mutation({
      query:({email})=>({
        url:`${USERS_URL}/resend-otp`,
        method:"POST",
        body:{email}
      })
    }),
    forgetPassword:builder.mutation({
      query:({email})=>({
        url: `${USERS_URL}/forget-password`,
        method:"POST",
        body:{email}
      })
    }),
    resetPasswordOtp:builder.mutation({
      query:({email,verificationCode})=>({
        url: `${USERS_URL}/reset-password`,
        method:"POST",
        body:{email,verificationCode}
      })
    }),
    resetPassword:builder.mutation({
      query:({email,password})=>({
        url: `${USERS_URL}/reset-password`,
        method:"PUT",
        body:{email,password}
      })
    }),
    userGetAllDoctor:builder.query({
      query:()=>({
        url:`${USERS_URL}/doctors`,
        method:"GET"
      })
    }),
    userGetOneDoctor:builder.mutation({
      query:(id)=>({
        url:`${USERS_URL}/doctor/${id}`,
        method:"POST",
      })
    }),
    getAllSpecializations:builder.query({
      query:()=>({
        url:`${USERS_URL}/doctor-specializations`,
        method:'GET'
      })
    })

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgetPasswordMutation,
  useResetPasswordOtpMutation,
  useResetPasswordMutation,
  useUserGetAllDoctorQuery,
  useUserGetOneDoctorMutation,
  useGetAllSpecializationsQuery
} = usersApiSlice;
