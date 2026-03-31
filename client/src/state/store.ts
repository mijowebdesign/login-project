import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@/state/user/userSlice";
import productReducer from "@/state/product/productSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;