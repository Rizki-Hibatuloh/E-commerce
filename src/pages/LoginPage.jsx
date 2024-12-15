import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { login, selectLoading, selectError, selectToken } from '../redux/authSlice'; // Import login dari authSlice

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selectors
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const token = useSelector(selectToken);

    // Local state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setMessage('Username dan password harus diisi');
            return;
        }
        setMessage('');
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        if (error) {
            setMessage('Username atau password salah.');
        } else if (token) {
            setMessage('Login berhasil!');
            setTimeout(() => navigate('/'), 1000); // Delay 1 detik
        }
    }, [error, token, navigate]);
    

    return (
        <section className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 w-screen h-screen flex justify-center items-center">
            <main className="bg-white p-10 rounded-2xl shadow-2xl w-[450px] border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to continue</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-3 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    {message && <p className={`mt-4 text-center ${error ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
                </form>

                <div className="mt-4 text-center">
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Dont have an account? Register here.
                    </Link>
                </div>
            </main>
        </section>
    );
}

export default LoginPage;
