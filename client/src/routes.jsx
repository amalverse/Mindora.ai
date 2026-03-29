import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthSuccess from "./pages/AuthSuccess";
import Dashboard from "./pages/Dashboard";
import Mood from "./pages/Mood";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";

// Inline guard — redirects to /login if not authenticated
function RequireAuth() {
    const { user, isLoading } = useAuthStore();
    if (isLoading) return <div>Loading...</div>;
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Protected routes */}
            <Route element={<RequireAuth />}>
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
