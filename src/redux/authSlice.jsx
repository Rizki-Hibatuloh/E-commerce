import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axiosInstance';

// Login async action
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });

      // Simpan token dan user ke localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('login', JSON.stringify({ username }));

      return {
        token: response.data.token,
        user: { username },
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('login'))?.username || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('login');
    },
    setUser:(state, action) => { 
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to login';
      });
  },
});

// Selectors
export const selectLoading = (state) => state.auth.status === 'loading';
export const selectError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;
export const selectUser  = (state) => state.auth.user;

export const { logout, setUser  } = authSlice.actions; // Perbaikan di sini
export default authSlice.reducer;