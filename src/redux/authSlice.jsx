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

      // Simpan token ke localStorage
      localStorage.setItem('token', data.token);

      return data; // Mengembalikan data (termasuk token)
    } catch (error) {
      // Mengembalikan error ke rejected state
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null, // Memuat token dari localStorage
    user: null, // Data user (jika ada)
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
        state.token = action.payload.token; // Simpan token dari payload
        state.user = action.payload.user || null; // Simpan user jika tersedia
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
