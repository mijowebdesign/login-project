import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {UserState, LoginRequest} from '@/types/Login';
import { login as loginApi } from '@/services/authService';
import type { AxiosError } from 'axios';


const initialState: UserState = {
    name: null,
    email: null,
    token: null,
    isPending: null,
    message: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action:PayloadAction<{user: string, email: string, token: string}>) {
            state.name = action.payload.user;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        clearUser(state) {
            state.name = null;
            state.email = null;
            state.token = null;
            state.isPending = null;
            state.message = null;
        }},
        extraReducers: (builder) => {
            builder
            .addCase(login.pending, (state) => {
                state.isPending = true;
                    state.message = '';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isPending = false;
                state.name = action.payload?.name || '';
                state.email = action.payload?.email || '';
                state.token = action.payload?.token || '';
                localStorage.setItem('user', JSON.stringify({
                    name: state.name,
                    email: state.email,
                    token: state.token,
                }));
            })
            .addCase(login.rejected, (state, action) => {
                state.isPending = false;
                state.message = action.payload as string || 'Unknown error';
            })
        }
});

export const login = createAsyncThunk(
    'user/login',
    async (credentials: LoginRequest, thunkAPI) => {
        try {
            const response = await loginApi(credentials);
            return response?.user || null;
        } catch (error:unknown) {
            const err = error as AxiosError<{ message?: string }>;
            const message = err.response?.data?.message || 'Unknown error';
            return thunkAPI.rejectWithValue(message);
          
        }
    }
);

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;