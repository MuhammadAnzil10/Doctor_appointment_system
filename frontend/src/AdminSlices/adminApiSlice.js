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
  }),
});

export const { useAdminLoginMutation, useAdminLogoutMutation } = adminApiSlices;
