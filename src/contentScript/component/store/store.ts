import { configureStore } from '@reduxjs/toolkit';
import subtitleReducer from './subtitleSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        subtitle: subtitleReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>; // type of state when using useSelector
export type StoreDispatch = typeof store.dispatch; // type of dispatch function when using useDispatch
