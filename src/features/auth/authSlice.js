import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  getOwnProfile,
  removeToken,
} from '../../services/api';

// Initial state
const initialState = {
  authUser: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunks
export const asyncRegister = createAsyncThunk(
  'auth/asyncRegister',
  async ({name, email, password}, {rejectWithValue}) => {
    try {
      const user = await registerUser({name, email, password});
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncLogin = createAsyncThunk(
  'auth/asyncLogin',
  async ({email, password}, {rejectWithValue}) => {
    try {
      await loginUser({email, password});
      // After login, get the user profile
      const user = await getOwnProfile();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncGetOwnProfile = createAsyncThunk(
  'auth/asyncGetOwnProfile',
  async (_, {rejectWithValue}) => {
    try {
      const user = await getOwnProfile();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.authUser = null;
      state.status = 'idle';
      state.error = null;
      removeToken();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // asyncRegister
      .addCase(asyncRegister.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncRegister.fulfilled, (state) => {
        state.status = 'succeeded';
        // Don't set authUser on register, redirect to login
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // asyncLogin
      .addCase(asyncLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authUser = action.payload;
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // asyncGetOwnProfile
      .addCase(asyncGetOwnProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(asyncGetOwnProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authUser = action.payload;
      })
      .addCase(asyncGetOwnProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.authUser = null;
      });
  },
});

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer;
