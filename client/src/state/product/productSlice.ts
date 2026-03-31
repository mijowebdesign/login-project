import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/Products';
import { getProducts, getProductById, updateProduct as updateProductApi, deleteProduct as deleteProductApi } from '@/services/productService';

interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    return await getProducts();
});

export const fetchProductById = createAsyncThunk('product/fetchProductById', async (id: string) => {
    return await getProductById(id);
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, data }: { id: string; data: Partial<Product> }) => {
    const updatedProduct = await updateProductApi(id, data);
    return updatedProduct;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: string) => {
    await deleteProductApi(id);
    return id;
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedProduct(state, action: PayloadAction<Product | null>) {
            state.selectedProduct = action.payload;
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Greška pri učitavanju proizvoda';
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Greška pri učitavanju detalja proizvoda';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                if (state.selectedProduct && state.selectedProduct._id === action.payload._id) {
                    state.selectedProduct = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.error.message || 'Greška pri ažuriranju proizvoda';
            });
    }
});

export const { setSelectedProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
