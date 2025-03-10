import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

interface UserState{
    user : {
        referral_code: string;
        phone_number: any;
        email: string,
        full_name: string,
        role: string
    }
}

const initialState: UserState = {
    user: {
        phone_number: '',
        referral_code: '',
        email: '',
        full_name: '',
        role: ''
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.users.user

export default userSlice.reducer;