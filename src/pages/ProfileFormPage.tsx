import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateProfileData } from '../redux/ProfileSlice';
import { createProfile, updateProfile } from '../services/profileService';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const ProfileFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const existingProfile = useSelector((state: RootState) => state.profile.data);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (existingProfile) {
      setValue('firstName', existingProfile.firstName);
      setValue('lastName', existingProfile.lastName);
      setValue('email', existingProfile.email);
      setValue('age', existingProfile.age);
    }
  }, [existingProfile, setValue]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      let savedProfile;
      if (existingProfile?.id) {
        const res = await updateProfile(existingProfile.id, data);
        savedProfile = res.data;
      } else {
        const res = await createProfile(data);
        savedProfile = res.data;
      }
      dispatch(updateProfileData(savedProfile));
      localStorage.setItem('profile', JSON.stringify(savedProfile));
      navigate('/profile');
    } catch (err) {
      alert('Something went wrong.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {existingProfile ? 'Edit Profile' : 'Create Profile'}
        </Typography>

        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          {...register('firstName', { required: 'First name is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message as string}
        />

        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          {...register('lastName', { required: 'Last name is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message as string}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' } })}
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />

        <TextField
          label="Age (Optional)"
          type="number"
          fullWidth
          margin="normal"
          {...register('age', { valueAsNumber: true, min: { value: 0, message: 'Age must be positive' } })}
          error={!!errors.age}
          helperText={errors.age?.message as string}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save Profile'}
        </Button>
      </Box>
    </Container>
  );
};

export default ProfileFormPage;
