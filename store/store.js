import { configureStore } from '@reduxjs/toolkit'
import userReducers from './Reducers/userReducers'

export const store = configureStore({
  reducer: {userReducers},
})