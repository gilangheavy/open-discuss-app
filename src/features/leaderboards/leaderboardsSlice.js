import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getLeaderboard as getLeaderboards} from '../../services/api';

export const asyncReceiveLeaderboards = createAsyncThunk(
  'leaderboards/receive',
  async (_, {rejectWithValue}) => {
    try {
      const leaderboards = await getLeaderboards();
      return leaderboards;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: {
    leaderboards: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveLeaderboards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncReceiveLeaderboards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leaderboards = action.payload;
      })
      .addCase(asyncReceiveLeaderboards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default leaderboardsSlice.reducer;
