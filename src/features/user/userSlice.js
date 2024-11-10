import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchLoggedInUser,
} from './userAPI';

const initialState = {
  status: 'idle',
  userInfo: null, 
};

/// asyncthunk for fetching logged in user detail
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // its a value we return becomes the 'fulfilled' action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

// this will be used to fetch user emailid whereever we want
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;

export default userSlice.reducer;
