import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    isWindowOnPlayerPage: boolean;
} = {
    isWindowOnPlayerPage: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsWindowOnPlayerPage: (
            state,
            action: PayloadAction<{ isWindowOnPlayerPage: boolean }>
        ) => {
            state.isWindowOnPlayerPage = action.payload.isWindowOnPlayerPage;
        },
    },
});

export const { setIsWindowOnPlayerPage } = appSlice.actions;

export default appSlice.reducer;
