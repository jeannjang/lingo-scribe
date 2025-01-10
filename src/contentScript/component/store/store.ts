import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import subtitleReducer from './subtitleSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        subtitle: subtitleReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>; // type of state when using useSelector
export type StoreDispatch = typeof store.dispatch; // type of dispatch function when using useDispatch
