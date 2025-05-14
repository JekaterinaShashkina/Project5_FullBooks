import BookDetail from "../components/BookDetail"
import { Box } from "@mui/material"
import Header from "../components/Header"
import Footer from "../components/Footer"

function BookDetailPage() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header/>
            <Box display="flex" flex="1">
                <BookDetail/>
            </Box>
            <Footer/>
        </Box>
    )
}

export default BookDetailPage