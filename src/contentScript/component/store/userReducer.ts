import { createReducer } from '@reduxjs/toolkit';
import { UserPreferences } from '@/src/types/userPreferences';
import { SetUserPreferences } from '@/src/types/messages';
import { AsyncRequestStatus } from '@/src/types/status';
import {
    fetchUserPreferencesFailed,
    fetchUserPreferencesInitialised,
    fetchUserPreferencesSucceeded,
    userPreferencesSet,
} from '@/src/contentScript/component/actions/userActions';

interface UserSliceState {
    preferences: UserPreferences | undefined;
    status: AsyncRequestStatus;
}

const initialState: UserSliceState = {
    preferences: undefined,
    status: 'idle',
};

const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(fetchUserPreferencesInitialised, (state) => {
        state.status = 'loading';
    });
    builder.addCase(fetchUserPreferencesSucceeded, (state, action) => {
        state.status = 'success';
        state.preferences = action.payload;
    });
    builder.addCase(fetchUserPreferencesFailed, (state) => {
        state.status = 'fail';
    });
    builder.addCase(userPreferencesSet, (state, action) => {
        state.preferences = action.payload;

        // one-way notification to service worker
        chrome.runtime.sendMessage<SetUserPreferences, void>({
            type: 'USER_PREFERENCES/SET',
            payload: { userPreferences: action.payload },
        });
    });
});

export default userReducer;
