import { useState, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import Spinner from "../components/Spinner";

export default function Profile() {
    const { user, updateProfile, isLoading, error, clearError } = useAuthStore();
    const [form, setForm] = useState({
        name: user?.name || "",
        username: user?.username || "",
        email: user?.email || "",
        password: "",
        confirmPassword: ""
    });
    const [profileImage, setProfileImage] = useState(user?.profileImage || "");
    const [successMsg, setSuccessMsg] = useState("");
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (error) clearError();
        setSuccessMsg("");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("Image must be smaller than 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                if (error) clearError();
                setSuccessMsg("");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password && form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const updateData = {
            name: form.name,
            username: form.username,
            email: form.email,
        };

        if (profileImage !== user.profileImage) {
            updateData.profileImage = profileImage;
        }

        if (form.password) {
            updateData.password = form.password;
        }

        try {
            await updateProfile(updateData);
            setSuccessMsg("Profile updated successfully!");
            setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
        } catch (err) {
            console.error("Profile update error:", err);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen pt-32 pb-16 px-6 relative flex justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            {/* Background elements */}
            <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-indigo-300/30 dark:bg-indigo-900/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-purple-200/30 dark:bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-2xl relative z-10 space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white mb-2">
                        Your Profile
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Manage your account details and preferences.
                    </p>
                </div>

                <div className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-2xl text-sm font-medium">
                                {typeof error === 'string' ? error : error.message || 'An error occurred'}
                            </div>
                        )}
                        {successMsg && (
                            <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-2xl text-sm font-medium">
                                {successMsg}
                            </div>
                        )}

                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="relative group">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-4xl font-bold text-slate-400 dark:text-slate-500 transition-transform group-hover:scale-105">
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        (form.name || form.username || "U").charAt(0).toUpperCase()
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 p-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">JPG, GIF or PNG. 5MB max.</p>
                        </div>

                        {/* Form Fields Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                                    placeholder="johndoe123"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Change Password</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                                        placeholder="Leave blank to keep same"
                                    />
                                    {form.password && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                            Must be at least 6 characters
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50"
                                        placeholder="Repeat new password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
                            >
                                {isLoading ? <Spinner /> : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
