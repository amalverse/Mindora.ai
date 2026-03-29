import axios from 'axios';

export const aiClient = axios.create({
  baseURL: import.meta.env.VITE_AI_URL || '/ai',
});
