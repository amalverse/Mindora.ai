import apiClient from './apiClient';

export const sendChatMessage = async (message) => {
  try {
    const response = await apiClient.post('/chat', { message });
    return response.data.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};
