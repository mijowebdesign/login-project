import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@/state/user/userSlice";
import productReducer from "@/state/product/productSlice";
import categoryReducer from "@/state/category/categorySlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        category: categoryReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;