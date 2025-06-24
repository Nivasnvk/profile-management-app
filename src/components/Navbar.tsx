import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Navbar = () => {
  const profile = useSelector((state: RootState) => state.profile.data);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile Management
          </Typography>
          {profile && (
            <Typography variant="body1">
              {profile.firstName} {profile.lastName}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
