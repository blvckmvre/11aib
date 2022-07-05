import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { threadAPI } from "./reducers/threadService";
import modalSlice from "./reducers/modalSlice";

const rootReducer = combineReducers({
    [threadAPI.reducerPath]: threadAPI.reducer,
    modalSlice
})

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(threadAPI.middleware)
    },
})

export type RootState = ReturnType<typeof rootReducer>;
export type StoreType = ReturnType<typeof setupStore>;
export type DispatchType = StoreType['dispatch'];