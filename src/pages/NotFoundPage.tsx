import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you're looking for does not exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Go to Home</Button>
    </Box>
  );
};

export default NotFoundPage;
