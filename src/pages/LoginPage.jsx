import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom'; 
import { login, selectLoading, selectError, selectToken } from '../redux/authSlice';
import { toast } from 'react-toastify';


function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Selectors
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const token = useSelector(selectToken);

    // Local state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            toast.warn('Username and password are required!', {
                position: 'top-right',
                autoClose: 2000,
            });
            return;
        }

        dispatch(login({ username, password }));
    };

    useEffect(() => {
        if (error) {
            toast.error('Invalid username or password!', {
                position: 'top-right',
                autoClose: 2000,
            });
        } else if (token) {
            toast.success('Login successful! Redirecting...', {
                position: 'top-right',
                autoClose: 2000,
            });

            // Redirect to the intended page or home after login
            const redirectPath = location.state?.from || '/';
            setTimeout(() => navigate(redirectPath), 2000);
        }
    }, [error, token, navigate, location.state]);

    return (
        <section className="bg-white w-screen h-screen flex justify-center items-center">
           
            <div className="items-center text-9xl font-bold text-red-600 p-5 mr-10">
                <span>PUREBUY</span>
            </div>
            <main className="bg-gray-200 p-10 rounded-2xl shadow-2xl shadow-black w-[450px] border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-500">Welcome</h2>
                    <p className="text-gray-500 mt-2">Sign in to continue</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-500 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-500 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-3 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-blue-600'}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/register" className="text-red-500 hover:underline">
                        Dont have an account? Register here.
                    </Link>
                </div>
            </main>
        </section>
    );
}

export default LoginPage;
