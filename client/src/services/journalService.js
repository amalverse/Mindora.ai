import { apiClient } from './apiClient';

export const journalService = {
  // Get all journals for user
  getJournals: async () => {
    try {
      const response = await apiClient.get('/journals');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create a new journal
  createJournal: async (journalData) => {
    try {
      const response = await apiClient.post('/journals', journalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get single journal
  getJournal: async (id) => {
    try {
      const response = await apiClient.get(`/journals/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update journal
  updateJournal: async (id, journalData) => {
    try {
      const response = await apiClient.put(`/journals/${id}`, journalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete journal
  deleteJournal: async (id) => {
    try {
      const response = await apiClient.delete(`/journals/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
