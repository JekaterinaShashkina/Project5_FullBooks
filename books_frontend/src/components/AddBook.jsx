import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Typography, Paper, FormControl, InputLabel, Select,Checkbox, ListItemText } from '@mui/material';
import axios from 'axios';
import {API_URL} from '../constants/env';
import { fetchCategories } from '../services/CategoryService';
import { fetchAuthors } from '../services/authorService';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [publicationYear, setPublicationYear] = useState('')
    const [category, setCategory] = useState('')
    const [authors, setAuthors] = useState([])
    const [coverFile, setCoverFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedAuthorIds, setSelectedAuthorIds] = useState([]);

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const data = await fetchCategories()
                setCategories(data)
                console.log(data);
                
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        }
        getAllCategories()
    }, [])
    useEffect(() => {
        const loadAuthors = async () => {
          try {
            const data = await fetchAuthors();
            setAuthors(data);
            console.log(data);
            
          } catch (error) {
            console.error('Failed to fetch authors', error);
          }
        };
    
        loadAuthors();
      }, []);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('publicationYear', publicationYear)
        formData.append('category', category)
        if (coverFile) formData.append('cover_url', coverFile);

        selectedAuthorIds.forEach((id) => {
            formData.append('authors', id);
          });
          for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
          }
        console.log(formData.data);
          
        try {
            await axios.post(`${API_URL}/books`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`
                },
            });
            setMessage('Book added successfully');
            setTitle('');
            setDescription('');
            setPublicationYear('');
            setCategory('');
            setCoverFile(null);
            navigate(`/`);
        } catch (err) {
            setMessage('Failed to add book');
            console.error(message, err);
        }        
    }
    return (
        <Box display="flex" justifyContent="center" mt={4} >
            <Paper sx={{ padding: 4, width: 800 }}>
                <Typography variant='h6' gutterBottom>
                    Add New Book
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required margin="normal"/>
                    <TextField fullWidth label="Description" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" />
                    <Box sx={{display: 'flex', justifyContent: 'space-around', gap: '20px'}}>
                    <TextField sx={{width: '50%'}}
                    fullWidth label="Publication Year" 
                    type="number" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} margin="normal" required                         
                    />

                    <FormControl sx={{width: '50%'}} margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    {categories.map((cat) => (
                        <MenuItem key={cat.categoryId} value={cat.categoryId}>{cat.name}</MenuItem>
                    ))}
                    </Select>
                    </FormControl>
                    </Box>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="author-label">Authors</InputLabel>
                        <Select
                            labelId="author-label"
                            multiple
                            value={selectedAuthorIds}
                            onChange={(e) => setSelectedAuthorIds(e.target.value)}
                            renderValue={(selected) =>
                            authors
                                .filter((a) => selected.includes(a.authorId))
                                .map((a) => `${a.firstName} ${a.lastName}`)
                                .join(', ')
                            }
                        >
                            {authors.map((author) => (
                            <MenuItem key={author.authorId} value={author.authorId}>
                                <Checkbox checked={selectedAuthorIds.includes(author.authorId)} />
                                <ListItemText primary={`${author.firstName} ${author.lastName}`} />
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                        Upload Cover
                        <input type="file" hidden onChange={(e) => setCoverFile(e.target.files[0])} />
                    </Button>
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, backgroundColor: '#2c3755' }}>
                            Add Book
                    </Button>
                </form>
            </Paper>
        </Box>
    )
}

export default AddBook