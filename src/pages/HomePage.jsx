import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from "../redux/productSlice";
import Cards from "../components/Cards";
import { FaSpinner } from "react-icons/fa";
import { Hero } from '../components/Hero';

function HomePage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products); // Access the products array
   

    useEffect(() => {
        dispatch(fetchProducts()); // Dispatch action to fetch products
    }, [dispatch]);

    return (
        <>
        <section id='hero' className="text-gray-600 body-font">
            <Hero />
        </section>

        <section id='shopping' className='container px-auto py-12 px-5'>
            <div className='flex justify-center items-center p-3 mt-8'>
                <h2 className='text-2xl font-bold bg-red-700 rounded-lg text-center w-60 text-white px-4 p-4 m-4 '>Shopping</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map(product => (
                        <Cards key={product.id} product={product} />
                    ))
                ) : (
                    <div className='flex justify-center items-center p-3 mt-20'>
                        <FaSpinner className="animate-spin"/>
                    </div> // Loading state when products are being fetched
                )}
            </div>
        </section>
        </>
    );
}

export default HomePage;
