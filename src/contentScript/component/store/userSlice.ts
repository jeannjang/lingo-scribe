import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserPreferences } from '../../../types/userPreferences';
import {
    GetUserPreferencesRequest,
    GetUserPreferencesResponse,
    SetUserPreferences,
} from '../../../types/messages';
import { AsyncRequestStatus } from '../../../types/status';

interface UserSliceState {
    preferences: UserPreferences | undefined;
    status: AsyncRequestStatus;
}

const initialState: UserSliceState = {
    preferences: undefined,
    status: 'idle',
};

export const fetchUserPreferences = createAsyncThunk(
    'USER_PREFERENCES/FETCH',
    async () => {
        return await chrome.runtime.sendMessage<
            GetUserPreferencesRequest,
            GetUserPreferencesResponse
        >({
            type: 'USER_PREFERENCES/GET',
        });
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    // This is for actions that don't require async logic
    reducers: {
        setUserPreferences: (state, action: { payload: UserPreferences }) => {
            state.preferences = action.payload;

            // one-way notification to service worker
            chrome.runtime.sendMessage<SetUserPreferences, void>({
                type: 'USER_PREFERENCES/SET',
                payload: { userPreferences: action.payload },
            });
        },
    },
    // This is for thunk actions that require async logic
    extraReducers: (builder) => {
        builder

            .addCase(fetchUserPreferences.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserPreferences.fulfilled, (state, action) => {
                state.status = 'success';
                state.preferences = action.payload;
            })
            .addCase(fetchUserPreferences.rejected, (state) => {
                state.status = 'fail';
            });
    },
});

export default userSlice.reducer;
