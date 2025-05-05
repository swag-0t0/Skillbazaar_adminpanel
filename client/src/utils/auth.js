import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true
});

export const checkAuth = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data.isValid;
  } catch (err) {
    return false;
  }
};