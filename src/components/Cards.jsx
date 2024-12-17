import PropTypes from 'prop-types';
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Import ikon bintang dari react-icons

function Cards({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state.auth.token);

  // Fungsi untuk render bintang berdasarkan rating
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
      quantity: 1,
    };

    dispatch(addToCart(productToAdd));
  };

  return (
    <div className="border rounded p-4 bg-white transform transition-transform duration-300 hover:scale-105">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
      <div className="h-12 p-2">
        <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>
      </div>
      <div className='mt-3 p-1'>
      <div className="flex mt-2">
          {renderStars(product.rating.rate)} 
        </div>
      <div className="flex  my-4">
        <p className="text-gray-500 font-semibold">${product.price}</p>
      </div>
      </div>

      <div className="flex justify-between">
        <Link
          to={`/product/${product.id}`}
          className="p-2 px-4 mx-2 bg-red-700 hover:bg-gray-400 text-white font-bold rounded"
        >
          <IoEyeSharp />
        </Link>
        <button
          className="p-2 px-4 mx-2 bg-red-700 hover:bg-gray-400 text-white font-bold rounded"
          onClick={handleAddToCart}
        >
          <MdOutlineShoppingCart />
        </button>
      </div>
    </div>
  );
}

Cards.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Cards;
