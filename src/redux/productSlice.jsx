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
    return response.data.map((product) => ({
      ...product,
      stock: 20, // stok default 20
    }));
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
    addStock(state, action) {
      const { productId, amount } = action.payload;
      const product = state.products.find((item) => item.id === productId);
      if (product) {
        product.stock += amount; // Tambahkan stok
        saveProductsToLocalStorage(state.products); // Simpan ke localStorage
      }
    },
      reduceStock(state, action) {
        const { productId, amount } = action.payload;
        const product = state.products.find((item) => item.id === productId);
        if (product) {
          if (product.stock >= amount) {
            product.stock -= amount; // Kurangi stok
            saveProductsToLocalStorage(state.products); // Simpan ke localStorage
          } else {
            throw new Error(`Stok tidak mencukupi untuk produk ${product.name}.`);
          }
        }
    },
      restoreStock (state, action)  {
        const { productId, amount } = action.payload;
        const product = state.products.find((item) => item.id === productId);
        if (product) {
          product.stock += amount; // Kembalikan stok
          saveProductsToLocalStorage(state.products);
        }
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

export const { setProducts,addStock, reduceStock, restoreStock } = productSlice.actions;
export default productSlice.reducer;
