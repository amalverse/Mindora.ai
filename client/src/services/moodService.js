import { apiClient } from './apiClient';

export const moodService = {
  // Get all moods for user
  getMoods: async () => {
    try {
      const response = await apiClient.get('/moods');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create a new mood
  createMood: async (moodData) => {
    try {
      const response = await apiClient.post('/moods', moodData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single mood
  getMood: async (id) => {
    try {
      const response = await apiClient.get(`/moods/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update mood
  updateMood: async (id, moodData) => {
    try {
      const response = await apiClient.put(`/moods/${id}`, moodData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete mood
  deleteMood: async (id) => {
    try {
      const response = await apiClient.delete(`/moods/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
