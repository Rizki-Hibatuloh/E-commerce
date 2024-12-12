import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

function CartPage() {
    const dispatch = useDispatch();
        
    // Mengambil data produk dari Redux state
    const cartItems = useSelector((state) => state.cart.products);

    const [selectedItems, setSelectedItems] = useState([]);

    // Menghitung total harga
    const totalPrice = cartItems
        .filter((item) => selectedItems.includes(item.id)) // Hanya produk yang dipilih
        .reduce((total, item) => total + item.price * item.quantity, 0);

    // Fungsi untuk menangani perubahan checkbox
    const handleCheckboxChange = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    // Fungsi untuk memilih semua item
    const handleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]); // Batalkan semua pilihan
        } else {
            setSelectedItems(cartItems.map((item) => item.id)); // Pilih semua item
        }
    };

    // Fungsi untuk menghapus item dari keranjang
    const handleDeleteItem = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    // Fungsi untuk mengupdate quantity produk
    const handleQuantityChange = (itemId, action) => {
        const existingProduct = cartItems.find(item => item.id === itemId);
        if (existingProduct) {
            let newQuantity = existingProduct.quantity;
            if (action === 'increment' && newQuantity < 20) {
                newQuantity += 1;
            } else if (action === 'decrement' && newQuantity > 1) {
                newQuantity -= 1;
            }
            dispatch(updateQuantity({ productId: itemId, quantity: newQuantity }));
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className='flex justify-center items-center font-bold text-2xl text-gray-600 mt-20'>
                    No Products Added
                </p>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 ">
                                    <input
                                        className="w-4 h-4 p-4 mx-4"
                                        type="checkbox"
                                        checked={selectedItems.length === cartItems.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="text-left py-2 pr-4">Products</th>
                                <th className="text-left py-2 pr-4">Price</th>
                                <th className="text-left py-2 pr-4">Quantity</th>
                                <th className="text-left py-2 pr-4">Total Price</th>
                                <th className="text-left py-2 pr-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id} className="border-b mx-9 border border-blue-600">
                                    <td className="py-4 text-center mx-10">
                                        <input
                                            className="w-4 h-4 p-4 mx-4"
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    </td>
                                    <td className="py-2 flex items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover mr-4 rounded"
                                        />
                                        <div>
                                            {
                                                (() => {
                                                    const words = item.name.split(' ');
                                                    const firstLine = words.slice(0, 8).join(' ');
                                                    const secondLine = words.slice(8).join(' ');

                                                    return (
                                                        <>
                                                            <p className="text-lg font-semibold">{firstLine}</p>
                                                            {secondLine && <p className="text-lg font-semibold">{secondLine}</p>}
                                                        </>
                                                    );
                                                })()
                                            }
                                        </div>
                                    </td>
                                    <td className="py-2">${item.price.toLocaleString()}</td>
                                    <td className="py-2">
                                        <div className="flex items-center">
                                            <button
                                                className="px-2 py-1 bg-gray-200 rounded"
                                                onClick={() => handleQuantityChange(item.id, 'decrement')}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button
                                                className="px-2 py-1 bg-gray-200 rounded"
                                                onClick={() => handleQuantityChange(item.id, 'increment')}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-2">${(item.price * item.quantity).toLocaleString()}</td>
                                    <td className="py-2">
                                        <button className="text-red-500 hover:underline" onClick={() => handleDeleteItem(item.id)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Total: ${totalPrice.toLocaleString()}</h2>
                        <Link
                            to="/"
                            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
