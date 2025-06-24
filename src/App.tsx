import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { updateProfileData } from './redux/ProfileSlice';

import ProfileFormPage from './pages/ProfileFormPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

import { AppBar, Toolbar, Typography, Container } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.data);

  useEffect(() => {
    const stored = localStorage.getItem('profile');
    if (stored) {
      dispatch(updateProfileData(JSON.parse(stored)));
    }
  }, [dispatch]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Profile Management
          </Typography>
          {profile && (
            <Typography variant="subtitle1">
              {profile.firstName} {profile.lastName}
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile-form" element={<ProfileFormPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;