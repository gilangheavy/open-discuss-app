import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getAllUsers} from '../../services/api';

// Initial state
const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk
export const asyncGetAllUsers = createAsyncThunk(
  'users/asyncGetAllUsers',
  async (_, {rejectWithValue}) => {
    try {
      const users = await getAllUsers();
      return users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetAllUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncGetAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(asyncGetAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {clearUsersError} = usersSlice.actions;
export default usersSlice.reducer;
