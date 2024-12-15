import { FaLinkedin       } from "react-icons/fa";
import { FaInstagram      } from "react-icons/fa";
import { FaGithub         } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";


function Footer () {
    return(
        <footer className="text-gray-600 body-font mt-32 border-t-4 border-red-500">
            <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10  text-red-600 p-2 border border-red-600 bg-white rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">PUREBUY</span>
                </a>
                <p className="mt-2 text-sm text-gray-500">Guaranteed Quality, Guaranteed Satisfaction.</p>
                </div>
                <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
                <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                    <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CUSTOMER SERVICE</h2>
                    <nav className="list-none mb-10">
                        <li className="mb-1.5">
                            <a className="text-gray-600 hover:text-gray-800">Contact Us</a>
                        </li>
                        <li className="mb-1.5">
                            <a className="text-gray-600 hover:text-gray-800">Help</a>
                        </li>
                        <li className="mb-1.5">
                            <a className="text-gray-600 hover:text-gray-800">Payment Method</a>
                        </li>
                        <li className="mb-1.5">
                            <a className="text-gray-600 hover:text-gray-800">Payment Method</a>
                        </li>
                        <li>
                            <a className="text-gray-600 hover:text-gray-800">Track Sellers Delivery</a>
                        </li>
                        <li className="mb-1.5">
                            <a className="text-gray-600 hover:text-gray-800">Return of Goods & Funds</a>
                        </li>
                    </nav>
                </div>
                <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                    <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">EXPLORE PUREBUY</h2>
                    <nav className="list-none mb-10 ">
                        <li className="mb-1.5">
                            <a className="text-gray-600 hover:text-gray-800">About Us</a>
                        </li>
                        <li className="mb-1.5">
                            <a className="text-gray-600 hover:text-gray-800">Career</a>
                        </li>
                        <li className="mb-1.5">
                            <a className="text-gray-600 hover:text-gray-800">Blog</a>
                        </li>
                        <li className="mb-1.5">
                            <a className="text-gray-600 hover:text-gray-800">Purebuy Affiliate</a>
                        </li>
                    </nav>
                </div>
                <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                    <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">PAYMENT</h2>
                    <nav className="list-none mb-10 hover:text-red-500 gap-4">
                        <li className="mb-1.5">
                            <a className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                                <img src="https://down-id.img.susercontent.com/file/id-11134258-7rasg-m3elfigsva7j31" alt="logo"/>
                            </a> 
                            
                        </li>
                        <li className="mb-1.5">
                            <a className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                                <img src="https://down-id.img.susercontent.com/file/id-11134258-7rasa-m3elfqc3cpsg90" alt="logo"/>
                            </a>
                        </li>
                        <li className="mb-1.5">
                            <a className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                                <img src="https://down-id.img.susercontent.com/file/id-11134258-7rasd-m3elh2ewzwnj27" alt="logo"/>
                            </a>
                        </li>
                        <li className="mb-1.5">
                            <a className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                            <img src="https://down-id.img.susercontent.com/file/id-11134258-7rasi-m3elg6a60mmod7" alt="logo"/>
                            </a>
                        </li>
                    </nav>
                </div>
                <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                    <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">FOLLOW US</h2>
                    <nav className="list-none mb-10 hover:text-red-500">
                    <li className="mb-1.5">
                            <a className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                            <FaLinkedin /> Linkedin
                            </a>
                        </li>
                        <li className="mb-1.5">
                            <a className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                            <FaInstagram /> Instagram
                            </a>
                        </li>
                        <li className="mb-1.5">
                            <a className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                            <FaGithub /> Github
                            </a>
                        </li>
                        <li className="mb-1.5"> 
                            <a className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                            <FaFacebookSquare /> Facebook
                            </a>
                        </li>
                    </nav>

                </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                <p className="text-gray-500 text-sm text-center sm:text-left">© 2020 Tailblocks —
                    <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@knyttneve</a>
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                    <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                    </a>
                    <a className="ml-3 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                    </a>
                    <a className="ml-3 text-gray-500">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                    </a>
                    <a className="ml-3 text-gray-500">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                        <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                        <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                    </a>
                </span>
                </div>
            </div>
        </footer>
    )
}

export {Footer};