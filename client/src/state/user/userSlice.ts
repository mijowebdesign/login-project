import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/Users';
import { getUsers, deleteUser as deleteUserApi, updateUser as updateUserApi } from '@/services/userService';

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null

};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    return await getUsers();
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id: string) => {
    await deleteUserApi(id);
    return id;
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, data }: { id: string; data: Partial<User> }) => {
    const updatedUser = await updateUserApi(id, data);
    return updatedUser;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action:PayloadAction<{}>) {
            state.users = action.payload as User[];
        },
        clearUsers(state) {
            state.users = [];   
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Greška pri učitavanju korisnika';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(u => u._id !== action.payload && u.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.error.message || 'Greška pri brisanju korisnika';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(u => (u._id === action.payload._id || u.id === action.payload.id));
                if (index !== -1) {
                    console.log('Updating user in state:', action.payload);
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message || 'Greška pri ažuriranju korisnika';
            });
    }
});

export const { setUsers, clearUsers } = userSlice.actions;
export default userSlice.reducer;