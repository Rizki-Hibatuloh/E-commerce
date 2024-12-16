const localStorageMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  // Mendapatkan state terbaru setelah aksi diproses
  const state = storeAPI.getState();

  // Simpan data keranjang jika ada
  if (state.cart && state.cart.products) {
    localStorage.setItem('cart', JSON.stringify(state.cart.products));
  }

  // Simpan data produk jika ada
  if (state.product && state.product.products) {
    localStorage.setItem('products', JSON.stringify(state.product.products));
  }

  // Simpan informasi login (token dan username)
  if (state.auth) {
    // Simpan username dan token secara terpisah agar lebih efisien
    if (state.auth.token) {
      localStorage.setItem('token', state.auth.token);
    }

    if (state.auth.user) {
      localStorage.setItem('login', JSON.stringify({ username: state.auth.user.username }));
    }
  }

  return result;
};

export default localStorageMiddleware;
