import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axiosInstance";

// Fungsi untuk memuat produk dari localStorage
const loadProductsFromLocalStorage = () => {
  const savedProducts = localStorage.getItem('products');
  return savedProducts ? JSON.parse(savedProducts) : [];
};

// Fungsi untuk menyimpan produk ke localStorage
const saveProductsToLocalStorage = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Thunk untuk mengambil data produk dari API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  }
);

const initialState = {
  products: loadProductsFromLocalStorage(), // Muat data dari localStorage
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
      saveProductsToLocalStorage(action.payload); // Simpan ke localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;

        // Simpan ke localStorage
        saveProductsToLocalStorage(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
