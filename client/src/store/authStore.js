import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      // Register user
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(name, email, password);
          set({ user: response, token: response.token, isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message || 'Registration failed', isLoading: false });
          throw error;
        }
      },

      // Login user
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(email, password);
          set({ user: response, token: response.token, isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message || 'Login failed', isLoading: false });
          throw error;
        }
      },

      // Verify email
      verifyEmail: async (token) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.verifyEmail(token);
          set({ isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message || 'Email verification failed', isLoading: false });
          throw error;
        }
      },

      // Forgot password
      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.forgotPassword(email);
          set({ isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message || 'Failed to send reset email', isLoading: false });
          throw error;
        }
      },

      // Reset password
      resetPassword: async (token, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.resetPassword(token, password, confirmPassword);
          set({ user: response.user, token: response.token, isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message || 'Password reset failed', isLoading: false });
          throw error;
        }
      },

      // Get user profile
      getUserProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.getUserProfile();
          set({ user: response, isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message || 'Failed to fetch profile', isLoading: false });
          throw error;
        }
      },

      // Update user profile
      updateProfile: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.updateProfile(userData);
          set((state) => ({ user: { ...state.user, ...response }, isLoading: false }));
          return response;
        } catch (error) {
          set({ error: error.message || 'Failed to update profile', isLoading: false });
          throw error;
        }
      },

      // Logout
      logout: () => {
        authService.logout();
        set({ user: null, token: null, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
