import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from 'next-auth';

interface UserState {
  data: Session['user'] | null;
}

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Session['user']>) {
      state.data = action.payload;
    },
    clearUser(state) {
      state.data = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;