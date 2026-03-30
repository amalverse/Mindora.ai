import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

/**
 * AuthSuccess Component
 * Handles the redirect from OAuth (Google/GitHub)
 * Extracts the token and user data from the URL query parameters
 */
export default function AuthSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser, setToken } = useAuthStore();
    const hasProcessed = useRef(false);

    useEffect(() => {
        // Prevent multiple processing due to React double-mount in Strict Mode
        if (hasProcessed.current) return;
        
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');

        console.log('AuthSuccess: Processing token and user data');

        if (token) {
            hasProcessed.current = true;
            
            // 1. Set the token first
            setToken(token);
            
            // 2. Safely parse and set the user
            if (userStr) {
                try {
                    // Try direct parsing (useSearchParams decodes once)
                    const user = JSON.parse(userStr);
                    console.log('AuthSuccess: User parsed successfully');
                    setUser(user);
                } catch {
                    console.warn('AuthSuccess: Initial JSON parse failed, trying decodeURIComponent');
                    try {
                        // Sometimes the URL can be double-encoded depending on the browser/server config
                        const decodedUserStr = decodeURIComponent(userStr);
                        const user = JSON.parse(decodedUserStr);
                        setUser(user);
                        console.log('AuthSuccess: User parsed with extra decoding');
                    } catch (e2) {
                        console.error('AuthSuccess: Failed to parse user data:', e2);
                    }
                }
            }
            
            // 3. Navigate away immediately to clear sensitive data from the URL
            // Using a short timeout to ensure state update completes
            setTimeout(() => {
                navigate('/dashboard', { replace: true });
            }, 100);
        } else {
            console.error('AuthSuccess: No token found in URL');
            navigate('/login', { replace: true });
        }
    }, [searchParams, navigate, setUser, setToken]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-8">
                    <div className="absolute inset-0 border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Authenticating</h2>
                <p className="text-slate-600 dark:text-slate-400">Please wait while we set up your session...</p>
            </div>
        </div>
    );
}
