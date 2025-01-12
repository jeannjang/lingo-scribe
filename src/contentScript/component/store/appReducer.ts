import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions';

const initialState: {
    isWindowOnPlayerPage: boolean;
} = {
    isWindowOnPlayerPage: false,
};

const appReducer = createReducer(initialState, (builder) => {
    builder.addCase(actions.isWindowOnPlayerPageSet, (state, action) => {
        state.isWindowOnPlayerPage = action.payload.isWindowOnPlayerPage;
    });
});

export default appReducer;
