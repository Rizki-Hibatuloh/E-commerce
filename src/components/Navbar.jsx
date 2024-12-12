import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';


function Navbar (){
    return(
        <header className="text-white body-font bg-red-600">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-red-600 p-2 bg-white rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl"> E-Commerce </span>
                </a>

                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="/" className="mr-5 hover:text-gray-900">Home</Link>
                    <a className="mr-5 hover:text-gray-900">Shopping</a>
                   
                </nav>
                <Link to="/cart" className=" hover:text-blue-600 text-2xl px-6 font-bold">
                    <MdOutlineShoppingCart />
                </Link>
                <button className="inline-flex items-center bg-white text-red-600  font-bold shadow-md shadow-gray-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                    Login
                   
                </button>
            </div>
        </header>
    )
}

export default Navbar;