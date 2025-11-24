import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getThreadDetail,
  createComment,
  voteThread,
  voteComment,
} from '../../services/api';

const initialState = {
  threadDetail: null,
  status: 'idle',
  error: null,
};

export const asyncReceiveThreadDetail = createAsyncThunk(
  'threadDetail/asyncReceiveThreadDetail',
  async (threadId, {rejectWithValue}) => {
    try {
      const threadDetail = await getThreadDetail(threadId);
      return threadDetail;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const asyncAddComment = createAsyncThunk(
  'threadDetail/asyncAddComment',
  async ({threadId, content}, {rejectWithValue}) => {
    try {
      const comment = await createComment({threadId, content});
      return comment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    clearThreadDetail: (state) => {
      state.threadDetail = null;
      state.status = 'idle';
      state.error = null;
    },
    toggleVoteCommentOptimistic: (state, action) => {
      const {commentId, voteType, userId} = action.payload;
      const comment = state.threadDetail.comments.find(
        (c) => c.id === commentId,
      );

      if (comment) {
        const isUpVoted = comment.upVotesBy.includes(userId);
        const isDownVoted = comment.downVotesBy.includes(userId);

        comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);

        if (voteType === 'up') {
          if (!isUpVoted) comment.upVotesBy.push(userId);
        } else if (voteType === 'down') {
          if (!isDownVoted) comment.downVotesBy.push(userId);
        }
      }
    },
    revertVoteComment: (state, action) => {
      state.threadDetail = action.payload.originalThreadDetail;
    },
    toggleVoteThreadDetailOptimistic: (state, action) => {
      const {voteType, userId} = action.payload;
      if (state.threadDetail) {
        const isUpVoted = state.threadDetail.upVotesBy.includes(userId);
        const isDownVoted = state.threadDetail.downVotesBy.includes(userId);

        state.threadDetail.upVotesBy = state.threadDetail.upVotesBy.filter(
          (id) => id !== userId,
        );
        state.threadDetail.downVotesBy = state.threadDetail.downVotesBy.filter(
          (id) => id !== userId,
        );

        if (voteType === 'up') {
          if (!isUpVoted) state.threadDetail.upVotesBy.push(userId);
        } else if (voteType === 'down') {
          if (!isDownVoted) state.threadDetail.downVotesBy.push(userId);
        }
      }
    },
    revertVoteThreadDetail: (state, action) => {
      state.threadDetail = action.payload.originalThreadDetail;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreadDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncReceiveThreadDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threadDetail = action.payload;
      })
      .addCase(asyncReceiveThreadDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(asyncAddComment.fulfilled, (state, action) => {
        state.threadDetail.comments.unshift(action.payload);
      });


  },
});

export const {
  clearThreadDetail,
  toggleVoteCommentOptimistic,
  revertVoteComment,
  toggleVoteThreadDetailOptimistic,
  revertVoteThreadDetail,
} = threadDetailSlice.actions;
export default threadDetailSlice.reducer;

export const asyncToggleVoteThreadDetail = createAsyncThunk(
  'threadDetail/asyncToggleVoteThreadDetail',
  async ({threadId, voteType}, {dispatch, getState, rejectWithValue}) => {
    const {auth, threadDetail} = getState();
    const userId = auth.authUser.id;
    const originalThreadDetail = JSON.parse(
      JSON.stringify(threadDetail.threadDetail),
    );

    dispatch(toggleVoteThreadDetailOptimistic({voteType, userId}));

    try {
      await voteThread({threadId, voteType});
    } catch (error) {
      dispatch(revertVoteThreadDetail({originalThreadDetail}));
      return rejectWithValue(error.message);
    }
  },
);

export const asyncToggleVoteComment = createAsyncThunk(
  'threadDetail/asyncToggleVoteComment',
  async ({threadId, commentId, voteType}, {dispatch, rejectWithValue, getState}) => {
    const {auth, threadDetail} = getState();
    const userId = auth.authUser.id;
    const originalThreadDetail = JSON.parse(
      JSON.stringify(threadDetail.threadDetail),
    );

    dispatch(toggleVoteCommentOptimistic({commentId, voteType, userId}));

    try {
      await voteComment({threadId, commentId, voteType});
    } catch (error) {
      dispatch(revertVoteComment({originalThreadDetail}));
      return rejectWithValue(error.message);
    }
  },
);
