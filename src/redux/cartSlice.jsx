import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Fungsi untuk menghitung jumlah item di keranjang
const calculateCartItemCount = (products) => {
  return products.reduce((total, product) => total + product.quantity, 0);
};

const initialState = {
  products: loadCartFromLocalStorage(),
  cartItemCount: calculateCartItemCount(loadCartFromLocalStorage()),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.products.push(product);
      }
      // Update cartItemCount setiap kali ada perubahan pada produk
      state.cartItemCount = calculateCartItemCount(state.products);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((item) => item.id !== productId);
      // Update cartItemCount setelah menghapus produk
      state.cartItemCount = calculateCartItemCount(state.products);
    },
    clearCart: (state) => {
      state.products = [];
      state.cartItemCount = 0; // Reset jumlah item ke 0
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProduct = state.products.find((item) => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
      // Update cartItemCount setelah memperbarui quantity
      state.cartItemCount = calculateCartItemCount(state.products);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
