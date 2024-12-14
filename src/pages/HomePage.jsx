import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from "../redux/productSlice";
import Cards from "../components/Cards";

function HomePage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products); // Access the products array
   

    useEffect(() => {
        dispatch(fetchProducts()); // Dispatch action to fetch products
    }, [dispatch]);

    // Ensure products is an array and not undefined or null
    return (
        <section className='container px-auto py-12 px-5'>
            <div className='flex justify-center items-center p-3 mb-5'>
                <h2 className='text-2xl font-bold mb-6 bg-red-700 rounded-lg text-center w-60 text-white px-4 p-4 m-4 '>Shopping</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map(product => (
                        <Cards key={product.id} product={product} />
                    ))
                ) : (
                    <div>Loading...</div> // Loading state when products are being fetched
                )}
            </div>
        </section>
    );
}

export default HomePage;
