import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Category } from '@/types/Products';
import { getCategories } from '@/services/categoryService';

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    return await getCategories();
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Greška pri učitavanju kategorija';
            });
    }
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
