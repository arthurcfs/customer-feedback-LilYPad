import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchFeedback = (rating = null) =>
    api.get('/feedback', { params: rating ? { rating } : {} });

export const submitFeedback = (data) =>
    api.post('/feedback', data);