import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function Navbar() {
    const cartItemCount = useSelector((state) => state.cart.cartItemCount);

    return (
        <header className="text-white body-font bg-red-600 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          
                <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-red-600 p-2 bg-white rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">E-Commerce</span>
                </Link>

                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="/" className="mr-5 hover:text-gray-300">Home</Link>
                    <Link to="/shopping" className="mr-5 hover:text-gray-300">Shopping</Link>
                </nav>

                <div className="relative mx-3 px-5">
                    <Link to="/cart" className="hover:text-white text-lg px-4">
                        <MdOutlineShoppingCart size={24} />
                    </Link>
                    {cartItemCount > 0 && (
                        <span className="absolute top-2.5 right-2.5 bg-white text-red-600 rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </div>

                <Link to="/login">
                    <button className="inline-flex items-center bg-white text-red-600 font-bold shadow-md shadow-gray-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                        Login
                    </button>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
