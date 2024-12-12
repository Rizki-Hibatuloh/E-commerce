import PropTypes from 'prop-types';
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

function Cards({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
    };

    console.log('Menambahkan produk ke keranjang:', productToAdd);
    dispatch(addToCart(productToAdd));
  };

  return (
    <div className="border rounded p-4 bg-white transform transition-transform duration-300 hover:scale-105">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
      <div className="h-12 p-2">
        <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>
      </div>
      <div className="flex justify-center items-center my-4">
        <p className="text-gray-500">${product.price}</p>
      </div>
      <div className="flex justify-between">
        <Link
          to={`/product/${product.id}`}
          className="p-2 mx-2 bg-red-700 hover:bg-red-500 text-white font-bold rounded"
        >
          See More
        </Link>
        <button
          className="p-2 px-4 mx-2 bg-red-700 hover:bg-red-500 text-white font-bold rounded"
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
