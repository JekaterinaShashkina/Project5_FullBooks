import axios from 'axios';
import {API_URL} from '../constants/env';

export const fetchAuthors = async () => {
  const response = await axios.get(`${API_URL}/authors`);
  return response.data;
};