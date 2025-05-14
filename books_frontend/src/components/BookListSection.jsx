import React, {useState, useEffect} from "react"
import {Box, Typography, Grid, TextField} from '@mui/material'
import BookCard from "./BookCard"
import Sidebar from '../components/Sidebar';
import NewBookSection from './NewBookSection';
import { fetchAllBooks } from "../services/BookService"
import { filterBooks } from "../services/filterBooks"

function BookListSection() {
    const [books, setBooks] = useState()
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const filteredBooks = filterBooks(books, searchTerm, selectedCategory)
    console.log(filteredBooks);
    
    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchAllBooks()
                setBooks(data)
            } catch (error) {
                console.error('Error with fetching books', error);
            } finally {
                setLoading(false)
            }


        }
        loadBooks()
    }, [])
    if (loading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <Box mt={4} >
        <TextField
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter book name, author or category..."
            sx={{ width: '60%', border: 'solid 1px', borderRadius: '8px' }}
        />
        <Typography variant="h5" gutterBottom sx={{mt: '16px', mb: '32px'}}>
          Book List
        </Typography>

        <Box sx={{ display: 'flex', mt: 4 }}>

          <Sidebar selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
          <Box mt={6}>
            {filteredBooks.length > 0 ? (
              <Grid container spacing={3}         
                    display="flex"
                    justifyContent="center"
                    flexWrap="wrap"
                    gap={2}>
              {filteredBooks.map((book) => (
                <Grid item key={book.bookId} xs={12} sm={6} md={4} lg={3}>
                  <BookCard book={book}/>
                </Grid>
              ))}
              </Grid>
                ) : (
                  <Typography variant="body2" mt={2} sx={{color: 'red', fontSize: '18px'}}> Not found books with entered data</Typography>
                )}
              <NewBookSection />
          </Box>
        </Box>


      </Box>
    )
}

export default BookListSection