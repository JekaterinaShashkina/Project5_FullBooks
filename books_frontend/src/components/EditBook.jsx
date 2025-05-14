import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById } from "../services/BookService";
import { fetchCategories } from "../services/CategoryService";
import { fetchAuthors } from "../services/authorService";
import { Box, Paper, TextField, Typography, Button, FormControl, InputLabel, Select,
    MenuItem, Checkbox, ListItemText } from "@mui/material";
import { updateBook } from "../services/BookService";

export const EditBook = ()=> {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [_, setBookData] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [category, setCategory] = useState('');
    const [selectedAuthorIds, setSelectedAuthorIds] = useState([]);
    const [coverFile, setCoverFile] = useState(null);

    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() =>{
        const loadBook = async () => {
            try {
                const [book, catList, authList] = await Promise.all([
                    fetchBookById(id),
                    fetchCategories(),
                    fetchAuthors()
                  ]);
                  setBookData(book);
                  setTitle(book.title);
                  setDescription(book.description);
                  setPublicationYear(book.publicationYear);
                  setCategory(book.category?.categoryId || book.category_id);
                  setSelectedAuthorIds(book.authors.map((a) => a.authorId));
                  setCategories(catList);
                  setAuthors(authList);                
            } catch (error) {
                console.error('Book loading error:', error);
            }
        }
        loadBook()
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description);
        formData.append('publicationYear', publicationYear);
        formData.append('category', category);
        if (coverFile) {
          formData.append('cover_url', coverFile);
        }
        selectedAuthorIds.forEach((id) => formData.append('authors', id));
        try {
            await updateBook(id, formData);
            alert('Book is updated');
            navigate(`/`);
          } catch (error) {
            console.error('Updating error:', error);
            alert('Book is not updated');
          }
    
    }
    return (
        <Box display="flex" justifyContent="center" mt={4}>
        <Paper sx={{ padding: 4, width: 800 }}>
            <Typography variant="h6" gutterBottom>Change Book</Typography>
            <form onSubmit={handleUpdate}>
                <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required margin="normal"/>
                <TextField fullWidth label="Description" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" />
                <Box sx={{display: 'flex', gap: 2}}>
            <TextField label="Year" type="number" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} sx={{ flex: 1 }} required />
            <FormControl fullWidth>
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
                authors.filter((a) => selected.includes(a.authorId))
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
            Upload new cover
            <input type="file" hidden onChange={(e) => setCoverFile(e.target.files[0])} />
          </Button>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Save changes
          </Button>
            </form>
        </Paper>
        </Box>
    )
}
