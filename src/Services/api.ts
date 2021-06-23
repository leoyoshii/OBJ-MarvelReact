import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public/',
  params: {
    apikey: process.env.REACT_APP_MARVEL_API_KEY,
  },
});

export default api;
