import { useEffect, useState } from "react"
import { fetchAllBooks } from "../services/BookService"
import { Grid, Typography } from "@mui/material"
import BookCard from "./BookCard"

function NewBookSection() {
    const [recentBook, setRecentBook] = useState([])
    useEffect(() => {
        const getRecent = async () => {
            const allBooks = await fetchAllBooks()
            console.log('allBooks: ', allBooks);

            const oneWeekAgo = new Date()
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
            console.log('oneWeekAgo: ', oneWeekAgo);            
            const recent = allBooks
            .filter(book => new Date(book.lastUpdate) >= oneWeekAgo)
            .sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate))
            setRecentBook(recent)


        }
        getRecent()
    }, [])
    console.log('recent: ', recentBook)

    return (
        <>
            <Typography variant="h5" mt={4} mb={2}>
                New of This Week
            </Typography>
            <Grid container spacing={2}>
            {recentBook.map((book) => (
            <Grid item key={book.bookId} xs={12} sm={6} md={4} lg={3}>
              <BookCard book={book}/>
            </Grid>
          ))}
            </Grid>
        </>
    )
}   

export default NewBookSection