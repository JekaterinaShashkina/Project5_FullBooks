import { Box } from '@mui/material';
import MainContent from '../components/MainContent';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HomePage(){
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box sx={{ width: '100%' }}>
            <Header/>
            </Box>
            <Box display="flex" flex="1">
                <MainContent/>
            </Box>
            <Footer/>
        </Box>
    )
}

export default HomePage