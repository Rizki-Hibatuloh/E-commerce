import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Login async action
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();

      // Simpan token dan user ke localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('login', JSON.stringify({ username })); // Simpan username saja, lebih sederhana

      return {
        token: data.token,
        user: { username }, // Simpan data user dari input login
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null, // Memuat token dari localStorage
    user: JSON.parse(localStorage.getItem('login'))?.username || null, // Memuat username user dari localStorage
    status: 'idle', // idle, loading, succeeded, failed
    error: null, // Menyimpan pesan error
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token'); // Hapus token dari localStorage
      localStorage.removeItem('login'); // Hapus informasi login dari localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login succeeded:', action.payload);
        state.status = 'succeeded';
        state.token = action.payload.token; // Simpan token dari payload
        state.user = action.payload.user; // Simpan user dari payload
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
export const selectUser = (state) => state.auth.user;

// Actions dan reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
