import { configureStore, createReducer } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import blogsReducer from '../features/blog/blogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    blogs: blogsReducer,
  },
});
