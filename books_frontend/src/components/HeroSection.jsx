import { Box, Typography, Container} from '@mui/material'

function HeroSection() {
    return (
        <Box sx={{ bgcolor: '#f0f4f8', py: 6 }}>
          <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                Welcome to the Book Library
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Discover, read and download books across genres.
            </Typography>
          </Container>
        </Box>
      );
}

export default HeroSection