import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser, setUser } from "../redux/authSlice";
import { setCart } from "../redux/cartSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";


function Navbar() {
    const dispatch = useDispatch();
    const cartItemCount = useSelector((state) => state.cart.cartItemCount);
    const user = useSelector(selectUser);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Sinkronisasi Redux Cart dari localStorage saat refresh
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            dispatch(setCart(storedCart));
        }
    }, [dispatch]);

    // Sinkronisasi Redux User dari localStorage saat refresh
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("login"));
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedUser.username && storedToken) {
            if (!user) {
                dispatch(setUser({ user: storedUser, token: storedToken }));
            }
        }
    }, [dispatch, user]);

    // Fungsi Logout
    const handleLogout = () => {
        dispatch(logout());
        toast.success("You have successfully logged out!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    // Fungsi untuk toggle dropdown user
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Fungsi scroll ke bagian tertentu pada halaman
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="text-white body-font bg-red-600 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
                {/* Logo */}
                <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10 text-red -600 p-2 bg-white text-red-600 rounded-full"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">PUREBUY</span>
                </Link>

                {/* Navigation Links */}
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="/" onClick={() => scrollToSection("hero")} className="mr-5 hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/" onClick={() => scrollToSection("shopping")} className="mr-5 hover:text-gray-300">
                        Shopping
                    </Link>
                </nav>

                {/* Cart Icon */}
                <div className="relative mx-3 px-5">
                    <Link
                        to="/cart"
                        className="hover:text-white text-lg px-4"
                    >
                        <MdOutlineShoppingCart size={24} />
                    </Link>
                    {user && cartItemCount > 0 && (
                        <span className="absolute top-2.5 right-2.5 bg-white text-red-600 rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </div>

                {/* User Dropdown or Login Button */}
                {user ? (
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="inline-flex items-center bg-white text-red-600 font-bold shadow-md shadow-gray-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
                        >
                            {user.username}
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-gray-50 rounded shadow-md w-48">
                                <div className="px-4 py-2 text-gray-800 font-semibold">
                                    {user.username}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-red-600 font-semibold hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="inline-flex items-center bg-white text-red-600 font-bold shadow-md shadow-gray-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}

export { Navbar };
