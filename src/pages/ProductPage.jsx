import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../redux/cartSlice";
import PopupMessage from "../components/PopupMessage";
import { FaSpinner } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Import ikon bintang

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Untuk mendapatkan URL terakhir

  const { products, loading, error } = useSelector((state) => state.product);
  const token = useSelector((state) => state.auth.token);

  const [quantity, setQuantity] = useState(1);
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

    const productToAdd = {
      id: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      quantity
    };

    dispatch(addToCart(productToAdd));
    setPopupMessage("Item successfully added to cart!");
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
    setCheckoutMessage("Processing checkout...");
    setPopupType("success");
    setCheckoutPopupVisible(true);

    // Delay 2 detik sebelum menuju halaman checkout
    setTimeout(() => {
      navigate("/"); // Menyelesaikan checkout dan redirect
    }, 2000);
  };

  const handleQuantityChange = (action) => {
    if (action === "increment" && quantity < 20) {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Fungsi untuk menampilkan bintang rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Bintang penuh
    const hasHalfStar = rating % 1 >= 0.5; // Cek apakah ada bintang setengah

    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />); // Bintang penuh
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />); // Bintang setengah
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />); // Bintang kosong
      }
    }
    return stars;
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
         
            <div className="flex items-start mb-4 font-semibold">
              <div className="mr-2 text-base py-1 underline underline-offset-4">
                {product.rating.rate}
              </div>
              |
              <div className="flex justify-between mx-2 py-2">
                {renderStars(product.rating.rate)}
              </div>
              |
              <div className="ml-2 py-1 text-gray-600 text-sm underline underline-offset-4">
                 {product.rating.count} reviews
              </div> 
            </div>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>
            <p className="leading-relaxed">{product.description}</p>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex mr-6 items-center">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span> 
              </div>
              <div className="flex items-center gap-4 ml-8">
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
              <div className="ml-auto flex">
                <button
                  onClick={handleAddToCart}
                  className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-400 rounded"
                >
                  <MdOutlineShoppingCart className="w-6 h-6"/>
                </button>
                <button
                  onClick={handleCheckout}
                  className="ml-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-400  rounded"
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
