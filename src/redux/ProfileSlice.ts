// src/redux/ProfileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
}

interface ProfileState {
  data: Profile | null;
}

const initialState: ProfileState = {
  data: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileData: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
    },
    clearProfile: (state) => {
      state.data = null;
    },
  },
});

export const { updateProfileData, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
