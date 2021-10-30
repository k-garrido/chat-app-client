import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../images/logo.jpeg'


const NavBar = () => {
  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} className='logo' width='100px' alt = ''></img>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DeveloPlace
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
