import { Box, Typography } from '@mui/material';
import taltechLogo from '../../public/image/taltech_logo.png'

const Footer = () => {
    return (
        <Box
          component="footer"
          sx={{
            backgroundColor: '#2c3755',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
            px: 4,
            mt: 'auto',
          }}
        >
          <Box display="flex" alignItems="center">
            <img
              src={taltechLogo}
              alt="TalTech logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            <Typography variant="body2">Virumaa Kolledž</Typography>
          </Box>
    
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            Design by Jekaterina Shashkina
          </Typography>
          <Typography variant="body2">
        © {new Date().getFullYear()} Book Library. All rights reserved.
      </Typography>
        </Box>
      );
};

export default Footer;
