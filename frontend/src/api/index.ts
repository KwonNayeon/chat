import axios from 'axios';
import { ChatResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const chatApi = {
  sendMessage: async (message: string): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>('/api/chat', { message });
    return response.data;
  },

  search: async (query: string) => {
    const response = await api.get('/api/search', { params: { q: query } });
    return response.data;
  }
};

export default api;
