import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSLice"
export const store = configureStore({
    reducer: authReducer,
})