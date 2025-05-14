import AddBook from "../components/AddBook"
import { Box } from "@mui/material"
import Header from "../components/Header"
import Footer from "../components/Footer"

function AddBookPage() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header/>
            <Box display="flex" flex="1">
                <AddBook/>
            </Box>
            <Footer/>
        </Box>
    )
}

export default AddBookPage