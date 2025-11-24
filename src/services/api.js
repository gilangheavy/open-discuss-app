const API_BASE_URL = 'https://forum-api.dicoding.dev/v1';

// Helper function to get auth token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper function to save auth token to localStorage
const saveToken = (token) => localStorage.setItem('token', token);

// Helper function to remove auth token from localStorage
const removeToken = () => localStorage.removeItem('token');

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !options.skipAuth) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.message || 'API request failed');
  }

  return data.data;
};

// ========== AUTH & USERS API ==========

export const registerUser = async ({name, email, password}) => {
  const data = await apiCall('/register', {
    method: 'POST',
    body: JSON.stringify({name, email, password}),
    skipAuth: true,
  });
  return data.user;
};

export const loginUser = async ({email, password}) => {
  const data = await apiCall('/login', {
    method: 'POST',
    body: JSON.stringify({email, password}),
    skipAuth: true,
  });
  saveToken(data.token);
  return data.token;
};

export const getOwnProfile = async () => {
  const data = await apiCall('/users/me');
  return data.user;
};

export const getAllUsers = async () => {
  const data = await apiCall('/users', {skipAuth: true});
  return data.users;
};

// ========== THREADS API ==========

export const getAllThreads = async () => {
  const data = await apiCall('/threads', {skipAuth: true});
  return data.threads;
};

export const getThreadDetail = async (threadId) => {
  const data = await apiCall(`/threads/${threadId}`, {skipAuth: true});
  return data.detailThread;
};

export const createThread = async ({title, body, category = ''}) => {
  const data = await apiCall('/threads', {
    method: 'POST',
    body: JSON.stringify({title, body, category}),
  });
  return data.thread;
};

// ========== COMMENTS API ==========

export const createComment = async ({threadId, content}) => {
  const data = await apiCall(`/threads/${threadId}/comments`, {
    method: 'POST',
    body: JSON.stringify({content}),
  });
  return data.comment;
};

// ========== VOTES API ==========

const voteEndpointMap = {
  up: 'up-vote',
  down: 'down-vote',
  neutral: 'neutral-vote',
};

export const upVoteThread = async (threadId) => {
  const data = await apiCall(`/threads/${threadId}/up-vote`, {
    method: 'POST',
  });
  return data.vote;
};

export const downVoteThread = async (threadId) => {
  const data = await apiCall(`/threads/${threadId}/down-vote`, {
    method: 'POST',
  });
  return data.vote;
};

export const neutralVoteThread = async (threadId) => {
  const data = await apiCall(`/threads/${threadId}/neutral-vote`, {
    method: 'POST',
  });
  return data.vote;
};

export const upVoteComment = async (threadId, commentId) => {
  const data = await apiCall(
    `/threads/${threadId}/comments/${commentId}/up-vote`,
    {method: 'POST'},
  );
  return data.vote;
};

export const downVoteComment = async (threadId, commentId) => {
  const data = await apiCall(
    `/threads/${threadId}/comments/${commentId}/down-vote`,
    {method: 'POST'},
  );
  return data.vote;
};

export const neutralVoteComment = async (threadId, commentId) => {
  const data = await apiCall(
    `/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {method: 'POST'},
  );
  return data.vote;
};

export const voteThread = async ({threadId, voteType}) => {
  const endpoint = voteEndpointMap[voteType];

  if (!endpoint) {
    throw new Error('Invalid vote type');
  }

  const data = await apiCall(`/threads/${threadId}/${endpoint}`, {
    method: 'POST',
  });
  return data.vote;
};

export const voteComment = async ({threadId, commentId, voteType}) => {
  const endpoint = voteEndpointMap[voteType];

  if (!endpoint) {
    throw new Error('Invalid vote type');
  }

  const data = await apiCall(
    `/threads/${threadId}/comments/${commentId}/${endpoint}`,
    {method: 'POST'},
  );
  return data.vote;
};

// ========== LEADERBOARD API ==========

export const getLeaderboard = async () => {
  const data = await apiCall('/leaderboards', {skipAuth: true});
  return data.leaderboards;
};

// Export token management functions
export {getToken, saveToken, removeToken};
