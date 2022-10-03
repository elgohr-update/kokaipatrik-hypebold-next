import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HYPEBOLD_API
});

export default instance;
