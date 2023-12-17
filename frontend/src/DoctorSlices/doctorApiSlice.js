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
  }),
});

export const {
  useDoctorRegisterMutation,
  useDoctorLoginMutation,
  useLogoutDoctorMutation,
  useDoctorForgetPasswordMutation,
  useDoctorOtpVerifyMutation,
  useDoctorResetPasswordMutation
} = doctorApiSlice;
