import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2e3b55' }}>
      <Toolbar sx={{ justifyContent: 'space-between', display:'flex'}}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <img src='../../public/image/icon-book.png' height='34px' width='34px'/> Book Library
        </Typography>

        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px'}}>
        {user?.role === 'admin' && (
          <Button color="inherit" component={Link} to="/add">
            Add Book
          </Button>
        )}
          {user ? (
            <>
            <Typography component="span" mr={2}>
              User: {user.username}
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
              Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                SignUp
              </Button>
            </>

          )
          }

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
