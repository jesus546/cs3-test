import { configureStore } from "@reduxjs/toolkit";
import { darkSlice } from "./dark/darkSlice";
import todoApi from "./todo/todoApi";
import { todoSlice } from "./todo/todoSlice";

export const store = configureStore({
    reducer: {
        [darkSlice.name]: darkSlice.reducer,
        [todoSlice.name]: todoSlice.reducer,
        [todoApi.reducerPath]: todoApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        todoApi.middleware
    ),
})