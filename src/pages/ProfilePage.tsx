import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  updateProfileData,clearProfile } from '../redux/ProfileSlice';


import { Container, Typography, Box, Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.data);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
  const stored = localStorage.getItem('profile');
  if (stored) {
    dispatch(updateProfileData(JSON.parse(stored)));
   }
  }, [dispatch]);


  const handleDelete = () => {
    dispatch(clearProfile());
    setOpen(false);
    navigate('/profile-form');
  };

  if (!profile) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No profile data found.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate('/profile-form')}
          >
            Create Profile
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Profile Details
        </Typography>
        <Typography><strong>First Name:</strong> {profile.firstName}</Typography>
        <Typography><strong>Last Name:</strong> {profile.lastName}</Typography>
        <Typography><strong>Email:</strong> {profile.email}</Typography>
        {profile.age !== undefined && (
          <Typography><strong>Age:</strong> {profile.age}</Typography>
        )}

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" color="primary" onClick={() => navigate('/profile-form')}>
            Edit Profile
          </Button>
          <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
            Delete Profile
          </Button>
        </Stack>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your profile? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ProfilePage;
