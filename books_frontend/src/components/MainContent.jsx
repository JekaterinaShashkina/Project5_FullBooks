import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import BookListSection from './BookListSection';

function MainContent() {
    return (
        <Box sx={{flex: 1, p: 3}}>
            <HeroSection/>
            <BookListSection/>
        </Box>
    )
}

export default MainContent;