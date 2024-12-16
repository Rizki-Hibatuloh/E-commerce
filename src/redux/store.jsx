import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from './productSlice';
import CartSlice from './cartSlice';
import authReducer from './authSlice';
import localStorageMiddleware from "../utils/localStorage";

// Ambil state dari localStorage jika ada
const loadState = () => {
    try {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('login');
        const cart = localStorage.getItem('cart');
        const products = localStorage.getItem('products');

        const preloadedState = {
            auth: {
                token,
                user: login ? JSON.parse(login).user : null,
            },
            cart: {
                products: cart ? JSON.parse(cart) : [],
            },
            product: {
                products: products ? JSON.parse(products) : [],
            },
        };
        
        return preloadedState;
    } catch (err) {
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
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Mengabaikan serializableCheck untuk redux-persist
            },
        }).concat(localStorageMiddleware),
    preloadedState, // Set state awal
});

// Simpan state Redux ke localStorage setiap kali ada perubahan
store.subscribe(() => {
    const state = store.getState();
    try {
        // Simpan data yang relevan ke localStorage
        if (state.cart && state.cart.products) {
            localStorage.setItem('cart', JSON.stringify(state.cart.products));
        }
        if (state.product && state.product.products) {
            localStorage.setItem('products', JSON.stringify(state.product.products));
        }
        if (state.auth && state.auth.token) {
            localStorage.setItem('token', state.auth.token);
        }
        if (state.auth && state.auth.user) {
            localStorage.setItem('login', JSON.stringify({ user: state.auth.user }));
        }
    } catch (err) {
        console.error('Could not save state:', err);
    }
});
