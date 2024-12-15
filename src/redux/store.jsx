// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from './productSlice';
import CartSlice from './cartSlice';
import authReducer from './authSlice';
import localStorageMiddleware from "../utils/localStorage";

// Ambil state dari localStorage jika ada
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined; // Jika tidak ada state, kembalikan undefined
        }
        return JSON.parse(serializedState); // Kembalikan state yang sudah di-parse
    } catch (err){
        console.error('Failed to load state:', err);
        return undefined; // Jika terjadi error, kembalikan undefined
    }
};

const preloadedState = loadState(); // Ambil state awal dari localStorage

export const store = configureStore({
    reducer: {
        product: ProductSlice,
        cart: CartSlice,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
    preloadedState, // Set state awal
});