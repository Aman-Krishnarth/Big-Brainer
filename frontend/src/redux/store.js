import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice"
import articleReducer from "./slices/articleSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer
  }
})