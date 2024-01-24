import { apiSlice } from "../UserSlices/apiSlice";

const CHAT_URL = "/api/chat";

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accessChat : builder.mutation({
      query:(data)=>({
        url:`${CHAT_URL}`,
        method:'POST',
        body:data
      })
    })
  })
})



export const {
  useAccessChatMutation,
} = chatApiSlice