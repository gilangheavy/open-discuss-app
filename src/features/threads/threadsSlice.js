import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getAllUsers,
  getAllThreads,
  createThread,
  voteThread,
} from '../../services/api';

const initialState = {
  threads: [],
  status: 'idle',
  error: null,
};

export const asyncPopulateUsersAndThreads = createAsyncThunk(
  'threads/asyncPopulateUsersAndThreads',
  async (_, {rejectWithValue}) => {
    try {
      const users = await getAllUsers();
      const threads = await getAllThreads();

      return threads.map((thread) => {
        return {
          ...thread,
          user: users.find((user) => user.id === thread.ownerId),
          authUserVote: thread.upVotesBy.includes(thread.ownerId)
            ? 'up'
            : thread.downVotesBy.includes(thread.ownerId)
              ? 'down'
              : 'neutral', // Simplified initial vote state
        };
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncAddThread = createAsyncThunk(
  'threads/asyncAddThread',
  async ({title, body, category}, {rejectWithValue}) => {
    try {
      const thread = await createThread({title, body, category});
      return thread;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncToggleVoteThread = createAsyncThunk(
  'threads/asyncToggleVoteThread',
  async ({threadId, voteType}, {rejectWithValue, getState}) => {
    try {
      await voteThread({threadId, voteType});
      const {authUser} = getState().auth;
      return {threadId, voteType, userId: authUser?.id};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncPopulateUsersAndThreads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncPopulateUsersAndThreads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads = action.payload;
      })
      .addCase(asyncPopulateUsersAndThreads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(asyncAddThread.fulfilled, (state, action) => {
        state.threads.unshift(action.payload);
      })
      .addCase(asyncToggleVoteThread.fulfilled, (state, action) => {
        const {threadId, voteType, userId} = action.payload;
        const thread = state.threads.find((t) => t.id === threadId);

        if (thread) {
          // Remove previous votes
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

          // Add new vote
          if (voteType === 'up') {
            thread.upVotesBy.push(userId);
          } else if (voteType === 'down') {
            thread.downVotesBy.push(userId);
          }
        }
      });
  },
});

export default threadsSlice.reducer;
