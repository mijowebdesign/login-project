import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/Users';
import { login as loginApi } from '@/services/authService';
import type { AxiosError } from 'axios';


const initialState: User = {
    id: '',
    name: "",
    email: '',
    role: "user",
    // isPending: false,

};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action:PayloadAction<{user: string, email: string, token: string}>) {
            state.name = action.payload.user;
         
        },
        clearUser(state) {
            state.name = "";
          
            
        }}
})


export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;