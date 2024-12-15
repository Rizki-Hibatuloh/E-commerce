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

  // Simpan informasi login, termasuk token jika ada
  if (state.login) {
    localStorage.setItem('login', JSON.stringify(state.login));

    // Simpan token secara khusus di localStorage
    if (state.login.token) {
      localStorage.setItem('token', state.login.token);
    }
  }

  return result;
};

export default localStorageMiddleware;
