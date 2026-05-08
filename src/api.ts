import axios from 'axios';

// Use VITE_API_URL if defined, otherwise fallback to the current tunnel or localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'https://jvc-slope-sandy-geography.trycloudflare.com';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper for multipart/form-data
export const apiForm = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
