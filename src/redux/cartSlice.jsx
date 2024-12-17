import { createSlice } from '@reduxjs/toolkit';


// Fungsi untuk memuat cart dari localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Fungsi untuk menyimpan cart ke localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Fungsi untuk menghitung jumlah item di keranjang
const calculateCartItemCount = (products) => {
  return products.reduce((total, product) => total + product.quantity, 0);
};

// Mengambil cart dari localStorage saat aplikasi pertama kali dimuat
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
      
      // Update cartItemCount dan simpan ke localStorage
      state.cartItemCount = calculateCartItemCount(state.products);
      saveCartToLocalStorage(state.products);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((item) => item.id !== productId);
      
      // Update cartItemCount dan simpan ke localStorage
      state.cartItemCount = calculateCartItemCount(state.products);
      saveCartToLocalStorage(state.products);
    },
    clearCart: (state) => {
      state.products = [];
      state.cartItemCount = 0; // Reset jumlah item ke 0
      
      // Simpan perubahan ke localStorage
      saveCartToLocalStorage(state.products);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProduct = state.products.find((item) => item.id === productId);
      
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
      
      // Update cartItemCount dan simpan ke localStorage
      state.cartItemCount = calculateCartItemCount(state.products);
      // Di dalam cartSlice
      saveCartToLocalStorage(state.products);
    },
    setCart: (state, action) => {
      state.products = action.payload;
      state.cartItemCount = calculateCartItemCount(action.payload);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity, setCart } = cartSlice.actions;

export default cartSlice.reducer;
