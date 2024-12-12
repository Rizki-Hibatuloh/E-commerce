import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from './productSlice';
import CartSlice from './cartSlice';
import localStorageMiddleware from "../utils/localStorage";

export const store = configureStore({
    reducer: {
        product : ProductSlice,
        cart: CartSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
    
})