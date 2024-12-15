// src/router.js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage  from "./pages/LoginPage";

// Mendefinisikan router untuk aplikasi
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Komponen utama
    children: [
      {
        path: "/", // Route untuk halaman utama
        element: <HomePage />,
      },
      {
        path: "/product/:id", // Route untuk halaman produk
        element: <ProductPage />,
      },
      {
        path: "/cart", // Route untuk halaman keranjang
        element: <CartPage />,
      },
      {
        path: "/login", // Route untuk halaman login
        element: <LoginPage />,
      }, 
    ],
  },
]);
