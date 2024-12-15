import hero from '../assets/hero.jpg'

function Hero () {

    const scrollToShopping = () => {
        const shoppingSection = document.getElementById('shopping');
        if (shoppingSection) {
            shoppingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    Discover the Best Deals<br className="hidden lg:inline-block"/>for Your Everyday Needs
                </h1>
                <p className="mb-8 leading-relaxed">
                    From trendy fashion to cutting-edge gadgets, we bring you top-quality products at unbeatable prices. Shop the latest collections and enjoy fast, reliable delivery straight to your door. Transform your shopping experience with convenience and style.
                </p>
                <div className="flex justify-center">
                    
                    <button className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-400 rounded text-lg"
                    onClick={scrollToShopping}>
                    Shop Now
                    </button>
                    <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-red-500 hover:text-white rounded text-lg">
                    Learn More
                    </button>
                </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img className="object-cover object-center rounded" alt="hero" src={hero}/>
                </div>
            </div>
    )
}

export { Hero };