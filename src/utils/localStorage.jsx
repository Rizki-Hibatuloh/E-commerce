const localStorageMiddleware = (storeAPI) => next => (action) => {
    const result = next(action);
  
    // Mendapatkan state terbaru setelah aksi diproses
    const state = storeAPI.getState();
  
    // Pastikan data yang akan disimpan valid
    if (state.cart && state.cart.products) {
      localStorage.setItem('cart', JSON.stringify(state.cart.products));
    }
    if (state.product && state.product.products) {
      localStorage.setItem('products', JSON.stringify(state.product.products));
    }
    if (state.login) {
      localStorage.setItem('login', JSON.stringify(state.login));
    }
  
    return result;
  };
  
  export default localStorageMiddleware;
  