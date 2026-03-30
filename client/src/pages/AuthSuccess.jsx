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
            // Use setToken and setUser from authStore
            setToken(token);
            
            if (userStr) {
                try {
                    // searchParams.get already decodes the URI component once.
                    // We parse directly, but handle edge cases.
                    const user = JSON.parse(userStr);
                    setUser(user);
                } catch (e) {
                    console.error('Error parsing user data:', e);
                    // Fallback to decodeURIComponent just in case it was double encoded by some browsers
                    try {
                        const user = JSON.parse(decodeURIComponent(userStr));
                        setUser(user);
                    } catch (e2) {
                        console.error('Second attempt parsing user data failed:', e2);
                    }
                }
            }
            
            // Navigate to dashboard after state is set
            // Zustand's persist is synchronous by default, but navigate after a tick to be safe
            navigate('/dashboard', { replace: true });
        } else {
            // No token, redirect to login
            navigate('/login', { replace: true });
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
