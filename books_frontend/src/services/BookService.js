import axios from "axios";
import { API_URL } from "../constants/env";

export const fetchAllBooks = async () => {
    const response = await axios.get(`${API_URL}/books`)
    return response.data.books
}

export const fetchBookById = async (id) => {

    const response = await axios.get(`${API_URL}/books/${id}`)
    return response.data
}

export const deleteBook = async (bookId) => {
    const token = localStorage.getItem('token');
    return await axios.delete(`${API_URL}/books/${bookId}`, {
      headers: {
        Authorization: `${token}`
      }
    });
  };

export const updateBook = async (bookId, formData) => {
const token = localStorage.getItem('token');
return await axios.put(`${API_URL}/books/${bookId}`, formData, {
    headers: {
    Authorization: `${token}`,
    'Content-Type': 'multipart/form-data'
    }
});
};