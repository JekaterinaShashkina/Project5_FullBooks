import { Login } from "../components/Login"
import {Box } from '@mui/material'
import Header from "../components/Header" 
import Footer from "../components/Footer"

function LoginPage() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box sx={{ width: '100%' }}>
            <Header/>
            </Box>
            <Box display="flex" flex="1">
                <Login/>
            </Box>
            <Footer/>
        </Box>
    )
}

export default LoginPage