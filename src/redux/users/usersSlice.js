import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoading: false,
  error: undefined,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  });

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        console.log(state.users);
    })
    .addCase(fetchUsers.rejected, (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    })
  },
});

export default usersSlice.reducer;