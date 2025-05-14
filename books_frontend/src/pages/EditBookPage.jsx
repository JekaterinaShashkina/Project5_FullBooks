import { EditBook } from "../components/EditBook"
import { Box } from "@mui/material"
import Header from "../components/Header"
import Footer from "../components/Footer"

function EditBookPage() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header/>
            <Box display="flex" flex="1">
                <EditBook/>
            </Box>
            <Footer/>
        </Box>
    )
}

export default EditBookPage