import { Register } from "../components/Register"
import {Box } from '@mui/material'
import Header from "../components/Header" 
import Footer from "../components/Footer"

function RegisterPage() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box sx={{ width: '100%' }}>
            <Header/>
            </Box>
            <Box display="flex" flex="1">
                <Register/>
            </Box>
            <Footer/>
        </Box>
    )
}

export default RegisterPage