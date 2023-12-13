import {configureStore} from '@reduxjs/toolkit'
import authReducer from './UserSlices/authSlice.js'
import { apiSlice } from './UserSlices/apiSlice.js'
import adminAuthReducer from './AdminSlices/adminAuthSlice.js'
import { adminApiSlices } from './AdminSlices/adminApiSlice.js'

const store = configureStore({
  reducer:{
    auth:authReducer,
    adminAuth:adminAuthReducer,
    [apiSlice.reducerPath] : apiSlice.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
})

export default store