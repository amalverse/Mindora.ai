import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function AuthSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser, setToken } = useAuthStore();

    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');

        if (token) {
            setToken(token);
            if (userStr) {
                try {
                    const user = JSON.parse(decodeURIComponent(userStr));
                    setUser(user);
                } catch (e) {
                    console.error('Error parsing user data:', e);
                }
            }
            // Small delay to ensure state is updated before redirect
            setTimeout(() => {
                navigate('/dashboard');
            }, 100);
        } else {
            // No token, redirect to login
            navigate('/login');
        }
    }, [searchParams, navigate, setUser, setToken]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">Completing authentication...</p>
            </div>
        </div>
    );
}
