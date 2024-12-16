import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../redux/cartSlice";
import PopupMessage from "../components/PopupMessage";
import { FaSpinner } from "react-icons/fa";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Untuk mendapatkan URL terakhir

  const { products, loading, error } = useSelector((state) => state.product);
  const token = useSelector((state) => state.auth.token);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  // Untuk popup checkout
  const [isCheckoutPopupVisible, setCheckoutPopupVisible] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  if (loading)
    return (
      <div className="flex justify-center items-center p-3 mt-20">
        <FaSpinner className="animate-spin w-10 h-10" />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center p-3">Error: {error}</div>
    );

  const product = products.find((item) => item.id === parseInt(id));
  if (!product)
    return (
      <div className="flex justify-center items-center p-3">Product Not Found</div>
    );

  const handleAddToCart = () => {
    if (!token) {
      // Jika user belum login, redirect ke login dan simpan URL saat ini
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!size) {
      setPopupMessage("Silakan pilih ukuran produk!");
      setPopupType("error");
      setPopupVisible(true);
      return;
    }

    const productToAdd = {
      id: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      quantity,
      size,
    };

    dispatch(addToCart(productToAdd));
    setPopupMessage("Item berhasil ditambahkan ke keranjang!");
    setPopupType("success");
    setPopupVisible(true);
  };

  const handleCheckout = () => {
    if (!token) {
      // Jika user belum login, redirect ke login dan simpan URL saat ini
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    // Tampilkan popup checkout
    setCheckoutMessage("Sedang memproses checkout...");
    setPopupType("success");
    setCheckoutPopupVisible(true);

    // Delay 2 detik sebelum menuju halaman checkout
    setTimeout(() => {
      navigate("/");
    }, 2000); 
  };

  const handleQuantityChange = (action) => {
    if (action === "increment" && quantity < 20) {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <PopupMessage
          message={popupMessage}
          type={popupType}
          isVisible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        />

        <PopupMessage
          message={checkoutMessage}
          type={popupType}
          isVisible={isCheckoutPopupVisible}
          onClose={() => setCheckoutPopupVisible(false)}
        />

        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full max-w-sm h-auto object-cover object-center rounded"
            src={product.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>
            <p className="leading-relaxed">{product.description}</p>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option value=""> - </option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="flex items-center gap-4 ml-5">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-xl font-bold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <div className="ml-auto flex">
                <button
                  onClick={handleAddToCart}
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="ml-4 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
